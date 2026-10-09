(() => {
  const el = (id) => document.getElementById(id);
  const ui = {
    profile: el('profileSavedLooks'), list: el('savedLooksList'), note: el('savedLooksNote'),
    add: el('addSavedLookButton'), choose: el('chooseSavedLookButton'), source: el('savedLookSource'),
    saveSource: el('saveSourceAsLookButton'), picker: el('savedLookPicker'), pickerList: el('lookPickerList'),
    pickerNote: el('lookPickerNote'), editor: el('savedLookEditor'), form: el('savedLookForm'),
    name: el('savedLookName'), photos: el('lookEditorPhotos'), count: el('lookPhotoCount'),
    error: el('lookEditorError'), save: el('saveSavedLookButton'), use: el('useSavedLookButton'),
    remove: el('deleteSavedLookButton'), input: el('savedLookPhotoInput'), confirm: el('savedLookConfirm'),
    viewer: el('savedLookPhotoViewer'),
  };
  let items = [];
  let selection = null;
  let available = false;
  let account = '';
  let draft = null;
  let initialDraft = '';
  let busy = false;
  let confirming = null;
  let confirmCancel = null;
  let confirmBusy = false;
  let refreshPromise = null;
  let loadEpoch = 0;
  let sourceRenderKey = '';
  const closingTimers = new Map();
  const draftUrls = new Set();
  const localAdapter = ['localhost', '127.0.0.1'].includes(location.hostname) ? window.KartivioLooksAdapter : null;
  const api = localAdapter || {
    load: () => authorizedFetch('/v1/me/looks'),
    save: (value) => {
      const form = new FormData();
      form.append('title', value.title);
      form.append('revision', String(value.revision || 0));
      form.append('request_id', value.request_id);
      form.append('keep_image_ids', JSON.stringify(value.images.filter(image => !image.file).map(image => image.id)));
      let nextPhoto = 0;
      form.append('image_order', JSON.stringify(value.images.map(image => image.file ? `new:${nextPhoto++}` : image.id)));
      value.images.filter(image => image.file).forEach(image => form.append('photos', image.file));
      return authorizedMultipart(value.id ? `/v1/me/looks/${encodeURIComponent(value.id)}` : '/v1/me/looks', form, {method: value.id ? 'PUT' : 'POST'});
    },
    remove: (id, revision) => authorizedFetch(`/v1/me/looks/${encodeURIComponent(id)}?revision=${revision}`, {method: 'DELETE'}),
    select: (value) => authorizedFetch('/v1/me/looks/selection', {method: 'PUT', body: {selection: value}}),
    generate: (value) => authorizedFetch('/v1/generations/from-look', {method: 'POST', body: value, idempotencyKey: value.client_request_id}),
  };
  const escape = (value) => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const icon = (name) => `<i data-lucide="${name}"></i>`;
  const photoLabel = (count) => `${count} фото`;
  const message = (error) => error?.message || 'Не удалось сохранить изменения. Попробуй ещё раз.';
  const selectedLook = () => items.find(item => item.id === selection?.look_id);
  const selectedPhotos = () => selectedLook()?.images.filter(image => selection.image_ids.includes(image.id)) || [];
  const draftKey = () => JSON.stringify({title: ui.name.value.trim(), images: draft?.images.map(image => image.id) || []});
  const dirty = () => Boolean(draft && draftKey() !== initialDraft);

  function notify(name, properties = {}) {
    trackProductEvent(name, {...properties, screen: state.currentScreen});
  }

  function openDialog(dialog) {
    window.clearTimeout(closingTimers.get(dialog));
    closingTimers.delete(dialog);
    dialog.inert = false;
    if (!dialog.open) dialog.showModal();
    window.requestAnimationFrame(() => {
      if (dialog.open && !closingTimers.has(dialog)) dialog.classList.add('is-visible');
    });
  }

  function closeDialog(dialog) {
    if (!dialog.open) return;
    dialog.classList.remove('is-visible');
    dialog.inert = true;
    window.clearTimeout(closingTimers.get(dialog));
    closingTimers.set(dialog, window.setTimeout(() => {
      dialog.close(); closingTimers.delete(dialog);
      dialog.inert = false;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160));
  }

  function row(item, picker = false) {
    const active = selection?.look_id === item.id;
    return `<button class="saved-look-row${active && picker ? ' is-selected' : ''}" type="button" data-look-id="${escape(item.id)}" ${picker ? `aria-pressed="${active}"` : ''}>
      <span class="saved-look-preview" aria-hidden="true"></span>
      <span class="saved-look-label"><strong title="${escape(item.title)}">${escape(item.title)}</strong><small>${photoLabel(item.images.length)}${active ? ' · выбран' : ''}</small></span>
      ${icon(picker && active ? 'check' : 'chevron-right')}
    </button>`;
  }

  function updatePreview(image, url) {
    if (!image.dataset.previewUrl) image.addEventListener('error', () => {
      const latest = image.dataset.previewUrl;
      if (latest && image.getAttribute('src') !== latest) image.src = latest;
    });
    image.dataset.previewUrl = url;
    // Signed URLs rotate on reload; keep an already loaded preview on screen.
    if (!image.getAttribute('src') || (image.complete && !image.naturalWidth && image.getAttribute('src') !== url)) image.src = url;
  }

  function renderRows(container, picker = false) {
    const ids = new Set(items.map(item => item.id));
    const rows = new Map();
    Array.from(container.children).forEach(child => {
      if (ids.has(child.dataset.lookId)) rows.set(child.dataset.lookId, child);
      else child.remove();
    });
    items.forEach((item, index) => {
      let button = rows.get(item.id);
      if (!button) {
        const template = document.createElement('template');
        template.innerHTML = row(item, picker);
        button = template.content.firstElementChild;
      }
      const active = selection?.look_id === item.id;
      button.classList.toggle('is-selected', active && picker);
      if (picker) button.setAttribute('aria-pressed', String(active));
      const label = button.querySelector('strong');
      if (label.textContent !== item.title) label.textContent = item.title;
      label.title = item.title;
      button.querySelector('small').textContent = `${photoLabel(item.images.length)}${active ? ' · выбран' : ''}`;
      const name = picker && active ? 'check' : 'chevron-right';
      const currentIcon = button.querySelector(':scope > [data-lucide]');
      if (currentIcon.getAttribute('data-lucide') !== name) currentIcon.outerHTML = icon(name);
      const preview = button.querySelector('.saved-look-preview');
      const photos = item.images.slice(0, 3);
      const photoIds = new Set(photos.map(image => image.id));
      const previous = new Map(Array.from(preview.children).map(image => [image.dataset.imageId, image]));
      Array.from(preview.children).forEach(image => {if (!photoIds.has(image.dataset.imageId)) image.remove();});
      photos.forEach((photo, photoIndex) => {
        const image = previous.get(photo.id) || document.createElement('img');
        image.alt = ''; image.dataset.imageId = photo.id;
        updatePreview(image, photo.preview_url);
        if (preview.children[photoIndex] !== image) preview.insertBefore(image, preview.children[photoIndex] || null);
      });
      if (container.children[index] !== button) container.insertBefore(button, container.children[index] || null);
    });
  }

  function render() {
    ui.profile.classList.toggle('is-hidden', !available);
    renderRows(ui.list);
    if (!items.length) ui.list.innerHTML = '<p class="saved-looks-empty">Сохрани фото, чтобы не загружать их каждый раз.</p>';
    ui.add.disabled = items.length >= 5 || busy;
    ui.note.textContent = items.length >= 5 ? 'Сохранено 5 из 5 образов.' : items.length ? `${items.length} из 5 образов · до 3 фото в каждом` : '';
    renderRows(ui.pickerList, true);
    renderStudio();
    if (document.querySelector('i[data-lucide]')) refreshIcons();
  }

  function renderStudio() {
    const photos = selectedPhotos();
    const look = selectedLook();
    ui.choose.classList.toggle('is-hidden', !available || !items.length);
    ui.choose.querySelector('span').textContent = photos.length ? 'Сменить образ' : 'Выбрать образ';
    el('uploadDropzone').classList.toggle('is-hidden', Boolean(photos.length));
    ui.source.classList.toggle('is-hidden', !photos.length);
    ui.saveSource.classList.toggle('is-hidden', !available || Boolean(photos.length) || !sourceImageFiles().length || items.length >= 5);
    ui.saveSource.querySelector('span').textContent = items.length ? 'Сохранить как новый образ' : 'Сохранить фото в образ';
    el('uploadPhotoButton').classList.toggle('is-hidden', !photos.length && !sourceImageFiles().length);
    el('uploadPhotoButton').querySelector('span').textContent = photos.length ? 'Другие фото' : 'Добавить';
    if (!photos.length) {ui.source.innerHTML = ''; sourceRenderKey = ''; return;}
    el('sourceImageMeta').textContent = `${photos.length} из ${look.images.length} фото образа`;
    const nextKey = JSON.stringify([look.id, look.title, photos.map(image => image.id)]);
    if (sourceRenderKey !== nextKey) {
      sourceRenderKey = nextKey;
      ui.source.innerHTML = `<div class="saved-look-source-head"><span>${icon('contact-round')}<strong>${escape(look.title)}</strong></span><button class="look-icon-button" type="button" data-look-clear aria-label="Снять выбор образа" title="Снять выбор образа">${icon('x')}</button></div>
        <div class="saved-look-source-photos">${photos.map(image => `<div class="saved-look-source-photo"><button type="button" class="look-photo-open" data-look-view="${escape(image.id)}" aria-label="Посмотреть фото"><img alt="Фото образа" /></button><button type="button" class="look-icon-button look-photo-exclude" data-look-exclude="${escape(image.id)}" title="Не использовать это фото" aria-label="Не использовать это фото в генерации">${icon('x')}</button></div>`).join('')}</div>`;
      refreshIcons();
    }
    ui.source.querySelectorAll('.look-photo-open img').forEach((image, index) => updatePreview(image, photos[index].preview_url));
  }

  async function reload() {
    const currentEpoch = loadEpoch;
    const payload = await api.load();
    if (currentEpoch !== loadEpoch) return;
    if (!Array.isArray(payload.items) || payload.max_photos !== 3) {available = false; render(); return;}
    items = payload.items;
    available = true;
    if (!sourceImageFiles().length) selection = payload.selection || null;
    if (selection) {
      const look = selectedLook();
      if (!look || look.revision !== selection.revision || !selectedPhotos().length) {
        selection = null;
        await api.select(null);
        setCreateNote('Образ изменился. Выбери фото ещё раз.');
      }
    }
    renderSelectedSourceImage();
    render();
  }

  async function load(userId) {
    if (account === userId && refreshPromise) return refreshPromise;
    const changedAccount = account !== userId;
    if (changedAccount) {reset(); account = userId;}
    const currentEpoch = loadEpoch;
    const pending = reload().catch(error => {
      if (currentEpoch !== loadEpoch) return;
      if (!available) return;
      ui.note.textContent = 'Не удалось обновить образы. Попробуй ещё раз.';
    }).finally(() => {if (refreshPromise === pending) refreshPromise = null;});
    refreshPromise = pending;
    return refreshPromise;
  }

  function reset() {
    loadEpoch += 1;
    account = ''; items = []; selection = null; available = false;
    refreshPromise = null;
    [ui.editor, ui.picker, ui.confirm, ui.viewer].forEach(closeDialog);
    releaseDraft();
    ui.profile.classList.add('is-hidden');
    ui.source.classList.add('is-hidden');
    ui.choose.classList.add('is-hidden');
    ui.saveSource.classList.add('is-hidden');
  }

  async function choose(id) {
    if (busy) return;
    ui.pickerNote.textContent = '';
    busy = true;
    const currentEpoch = loadEpoch;
    try {
      await reload();
      if (currentEpoch !== loadEpoch) return false;
      const look = items.find(item => item.id === id);
      if (!look) throw new Error('Этот образ удалён. Выбери другой.');
      const next = {look_id: id, image_ids: look.images.map(image => image.id), revision: look.revision};
      await api.select(next);
      if (currentEpoch !== loadEpoch) return false;
      clearSelectedSourceImage();
      selection = next;
      closeDialog(ui.picker);
      renderSelectedSourceImage(); render();
      notify('saved_look_selected', {file_count: look.images.length});
      return true;
    } catch (error) {if (currentEpoch === loadEpoch) {ui.pickerNote.textContent = message(error); setCreateNote(message(error), true);} return false;}
    finally {busy = false; render();}
  }

  async function changeSelection(next) {
    if (busy) return false;
    busy = true;
    const currentEpoch = loadEpoch;
    try {
      await api.select(next);
      if (currentEpoch !== loadEpoch) return false;
      selection = next;
      renderSelectedSourceImage(); render();
      notify('saved_look_selection_changed', {file_count: selectedPhotos().length});
      return true;
    } catch (error) {if (currentEpoch === loadEpoch) setCreateNote(message(error), true); return false;}
    finally {busy = false;}
  }

  function releaseDraft() {
    draftUrls.forEach(url => URL.revokeObjectURL(url)); draftUrls.clear();
    draft = null;
  }

  function draftPhoto(file) {
    const url = URL.createObjectURL(file); draftUrls.add(url);
    return {id: crypto.randomUUID(), file, preview_url: url};
  }

  function openEditor(item = null, files = [], origin = 'profile') {
    if (busy || (!item && items.length >= 5)) return;
    releaseDraft();
    draft = {id: item?.id || null, revision: item?.revision || 0, origin, images: item ? item.images.map(image => ({...image})) : files.map(draftPhoto)};
    ui.name.value = item?.title || (items.length ? `Образ ${items.length + 1}` : 'Мой образ');
    initialDraft = draftKey();
    ui.error.textContent = '';
    el('lookEditorTitle').textContent = item ? 'Редактировать образ' : 'Новый образ';
    ui.remove.classList.toggle('is-hidden', !item);
    ui.use.classList.toggle('is-hidden', !item);
    ui.save.textContent = item ? 'Сохранить изменения' : 'Сохранить образ';
    renderDraft(); openDialog(ui.editor);
  }

  function renderDraft() {
    if (!draft) return;
    ui.count.textContent = `${draft.images.length} из 3`;
    ui.photos.innerHTML = draft.images.map((image, index) => `<div class="look-editor-photo"><button class="look-photo-open" type="button" data-draft-view="${index}" aria-label="Посмотреть фото ${index + 1}"><img src="${escape(image.preview_url)}" alt="Фото ${index + 1}" /></button><div class="look-photo-actions"><button type="button" class="look-icon-button" data-draft-replace="${index}" title="Заменить фото" aria-label="Заменить фото ${index + 1}">${icon('replace')}</button><button type="button" class="look-icon-button look-photo-delete" data-draft-remove="${index}" title="Удалить фото" aria-label="Удалить фото ${index + 1}">${icon('trash-2')}</button></div></div>`).join('') + (draft.images.length < 3 ? `<button class="look-photo-add" type="button" data-draft-add>${icon('image-plus')}<span>Добавить фото</span></button>` : '');
    ui.save.disabled = busy || !draft.images.length || !ui.name.value.trim() || (Boolean(draft.id) && !dirty());
    ui.use.disabled = busy;
    ui.remove.disabled = busy;
    ui.name.disabled = busy;
    ui.photos.querySelectorAll('button').forEach(button => {button.disabled = busy;});
    refreshIcons();
  }

  function ask({title, text, label = 'Удалить', danger = true, image, accept, cancel = null}) {
    el('lookConfirmTitle').textContent = title;
    el('lookConfirmText').textContent = text;
    const preview = el('lookConfirmPreview');
    preview.classList.toggle('is-hidden', !image);
    if (image) preview.src = image;
    el('lookConfirmAccept').textContent = label;
    el('lookConfirmAccept').classList.toggle('look-danger', danger);
    el('lookConfirmError').textContent = '';
    confirming = accept; confirmCancel = cancel;
    openDialog(ui.confirm);
    el('lookConfirmCancel').focus();
  }

  function finishEditor() {
    closeDialog(ui.editor);
    const urls = [...draftUrls];
    draftUrls.clear(); draft = null;
    window.setTimeout(() => urls.forEach(url => URL.revokeObjectURL(url)), 180);
  }

  function requestEditorClose() {
    if (busy) return;
    if (!dirty()) {finishEditor(); return;}
    ask({title: 'Сохранить изменения?', text: 'В образе есть несохранённые изменения.', label: 'Сохранить', danger: false,
      accept: async () => {if (!(await saveDraft())) throw new Error(ui.error.textContent || 'Добавь хотя бы одно фото.');},
      cancel: finishEditor});
    el('lookConfirmCancel').textContent = 'Не сохранять';
  }

  async function saveDraft({useAfter = false} = {}) {
    if (busy || !draft?.images.length || !ui.name.value.trim()) return false;
    busy = true; ui.error.textContent = ''; renderDraft(); ui.save.textContent = 'Сохраняю…';
    const currentEpoch = loadEpoch;
    try {
      const origin = draft.origin;
      const updated = Boolean(draft.id);
      const contentKey = draftKey();
      if (draft.request_content !== contentKey) {
        draft.request_id = crypto.randomUUID();
        draft.request_content = contentKey;
      }
      const result = await api.save({...draft, title: ui.name.value.trim()});
      if (currentEpoch !== loadEpoch) return false;
      const shouldSelect = origin === 'studio' || selection?.look_id === result.id || useAfter;
      items = items.some(item => item.id === result.id) ? items.map(item => item.id === result.id ? result : item) : [...items, result];
      // Saving and selecting are separate requests; a selection failure must not create another look on retry.
      draft.id = result.id; draft.revision = result.revision; draft.images = result.images.map(image => ({...image}));
      if (shouldSelect) {
        const ids = origin === 'studio' || useAfter
          ? result.images.map(image => image.id)
          : selection.image_ids.filter(id => result.images.some(image => image.id === id));
        const next = ids.length ? {look_id: result.id, image_ids: ids, revision: result.revision} : null;
        try {await api.select(next);} catch (error) {
          if (currentEpoch !== loadEpoch) return false;
          if (selection?.look_id === result.id) selection = null;
          ui.error.textContent = `Образ сохранён, но выбрать его не удалось. ${message(error)}`;
          initialDraft = draftKey();
          renderSelectedSourceImage(); render();
          return false;
        }
        if (currentEpoch !== loadEpoch) return false;
        clearSelectedSourceImage(); selection = next;
      }
      notify(updated ? 'saved_look_updated' : 'saved_look_created', {file_count: result.images.length, source: origin});
      finishEditor(); renderSelectedSourceImage(); render();
      if (useAfter) switchScreen('studio');
      return true;
    } catch (error) {if (currentEpoch === loadEpoch) ui.error.textContent = message(error); return false;}
    finally {busy = false; ui.save.textContent = draft?.id ? 'Сохранить изменения' : 'Сохранить образ'; renderDraft(); render();}
  }

  function requestDelete() {
    const item = items.find(item => item.id === draft?.id);
    if (!item) return;
    const currentEpoch = loadEpoch;
    ask({title: `Удалить образ «${item.title}»?`, text: item.images.length === 1 ? '1 фото будет удалено.' : `${photoLabel(item.images.length)} будут удалены.`, image: item.images[0]?.preview_url,
      accept: async () => {
        await api.remove(item.id, item.revision);
        if (currentEpoch !== loadEpoch) return;
        items = items.filter(value => value.id !== item.id);
        if (selection?.look_id === item.id) selection = null;
        notify('saved_look_deleted', {file_count: item.images.length});
        finishEditor(); renderSelectedSourceImage(); render();
      }});
  }

  function viewPhoto(url) {el('savedLookFullPhoto').src = url; openDialog(ui.viewer);}

  ui.add.addEventListener('click', () => openEditor());
  ui.list.addEventListener('click', event => {const row = event.target.closest('[data-look-id]'); if (row) openEditor(items.find(item => item.id === row.dataset.lookId));});
  ui.choose.addEventListener('click', () => {
    if (ui.picker.open && !closingTimers.has(ui.picker)) return;
    ui.pickerNote.textContent = ''; openDialog(ui.picker);
    reload().catch(() => {ui.pickerNote.textContent = 'Не удалось обновить образы. Попробуй ещё раз.';});
  });
  ui.pickerList.addEventListener('click', event => {const row = event.target.closest('[data-look-id]'); if (row) choose(row.dataset.lookId);});
  el('lookPickerUpload').addEventListener('click', () => {closeDialog(ui.picker); openSourceImagePicker();});
  ui.saveSource.addEventListener('click', () => openEditor(null, sourceImageFiles(), 'studio'));
  ui.form.addEventListener('submit', event => {event.preventDefault(); saveDraft();});
  ui.name.addEventListener('input', renderDraft);
  ui.remove.addEventListener('click', requestDelete);
  ui.use.addEventListener('click', async () => {
    if (dirty()) {await saveDraft({useAfter: true}); return;}
    const id = draft?.id;
    if (await choose(id)) {finishEditor(); switchScreen('studio');}
  });
  ui.photos.addEventListener('click', event => {
    if (busy || !draft) return;
    const view = event.target.closest('[data-draft-view]');
    if (view) {const image = draft.images[Number(view.dataset.draftView)]; viewPhoto(image.image_url || image.preview_url); return;}
    const remove = event.target.closest('[data-draft-remove]');
    if (remove) {
      const index = Number(remove.dataset.draftRemove);
      if (draft.images.length === 1 && draft.id) {requestDelete(); return;}
      ask({title: 'Удалить фото из образа?', text: draft.id ? 'Удаление применится после сохранения изменений.' : 'Фото будет убрано из нового образа.', image: draft.images[index].preview_url, accept: () => {draft.images.splice(index, 1); renderDraft();}});
      return;
    }
    const replace = event.target.closest('[data-draft-replace]');
    if (replace || event.target.closest('[data-draft-add]')) {
      ui.input.dataset.replace = replace ? replace.dataset.draftReplace : '';
      ui.input.multiple = !replace; ui.input.value = ''; ui.input.click();
    }
  });
  ui.input.addEventListener('change', () => {
    if (!draft || busy) return;
    const files = Array.from(ui.input.files || []);
    if (!files.length) return;
    const replace = ui.input.dataset.replace || '';
    const capacity = replace !== '' ? 1 : 3 - draft.images.length;
    try {
      if (files.length > capacity) throw new Error(`Можно добавить ещё ${capacity} фото.`);
      for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Поддерживаются JPG, PNG и WEBP.');
        if (!file.size || file.size > 10_000_000) throw new Error('Выбери фото размером до 10 MB.');
        if (draft.images.some(image => image.file && fileIdentity(image.file) === fileIdentity(file))) throw new Error('Это фото уже добавлено.');
      }
      const photos = files.map(draftPhoto);
      if (replace !== '') draft.images.splice(Number(replace), 1, ...photos); else draft.images.push(...photos);
      ui.error.textContent = ''; renderDraft();
    } catch (error) {ui.error.textContent = message(error);}
    ui.input.value = '';
  });
  ui.source.addEventListener('click', async event => {
    if (event.target.closest('[data-look-clear]')) {await changeSelection(null); return;}
    const exclude = event.target.closest('[data-look-exclude]');
    if (exclude && selection) {
      const ids = selection.image_ids.filter(id => id !== exclude.dataset.lookExclude);
      await changeSelection(ids.length ? {...selection, image_ids: ids} : null); return;
    }
    const view = event.target.closest('[data-look-view]');
    if (view) {const image = selectedPhotos().find(image => image.id === view.dataset.lookView); if (image) viewPhoto(image.image_url || image.preview_url);}
  });
  document.querySelectorAll('[data-look-close]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.lookClose === 'editor') requestEditorClose();
    else closeDialog(button.dataset.lookClose === 'picker' ? ui.picker : ui.viewer);
  }));
  ui.editor.addEventListener('cancel', event => {
    // Cancelling the native file picker also bubbles a cancel event.
    if (event.target !== ui.editor) return;
    event.preventDefault(); requestEditorClose();
  });
  ui.confirm.addEventListener('cancel', event => {
    if (event.target !== ui.confirm) return;
    event.preventDefault();
    if (!busy && !confirmBusy) closeDialog(ui.confirm);
  });
  ui.confirm.addEventListener('close', () => {
    if (ui.confirm.open) return;
    el('lookConfirmCancel').textContent = 'Отмена'; confirming = null; confirmCancel = null;
  });
  el('lookConfirmCancel').addEventListener('click', () => {const cancel = confirmCancel; closeDialog(ui.confirm); if (cancel) cancel();});
  el('lookConfirmAccept').addEventListener('click', async () => {
    const accept = confirming;
    if (!accept || confirmBusy) return;
    confirmBusy = true;
    el('lookConfirmAccept').disabled = true; el('lookConfirmCancel').disabled = true;
    try {await accept(); closeDialog(ui.confirm);} catch (error) {el('lookConfirmError').textContent = message(error);}
    finally {confirmBusy = false; el('lookConfirmAccept').disabled = false; el('lookConfirmCancel').disabled = false;}
  });
  [ui.picker, ui.viewer].forEach(dialog => dialog.addEventListener('cancel', event => {
    if (event.target !== dialog) return;
    event.preventDefault(); closeDialog(dialog);
  }));
  [ui.picker, ui.viewer].forEach(dialog => dialog.addEventListener('click', event => {if (event.target === dialog) {const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);}}));
  [ui.editor, ui.picker, ui.viewer, ui.confirm].forEach(dialog => dialog.addEventListener('close', () => {
    if (!dialog.open) dialog.classList.remove('is-visible');
  }));

  window.KartivioLooks = {
    load, reset, renderStudio,
    count: () => selectedPhotos().length,
    uploadSelected: async () => selection ? changeSelection(null) : true,
    snapshot: () => selection ? {...selection, image_ids: [...selection.image_ids]} : null,
    generate: (value, savedSelection) => api.generate({...value, ...savedSelection}),
  };
})();
