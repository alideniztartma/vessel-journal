document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATIONS (Complete dynamic support) ---
    const i18n = {
        en: {
            app_title: "Vessel.",
            home_empty: "Your story begins here...",
            settings_title: "Preferences",
            settings_lang: "Language",
            settings_theme: "Dark Theme",
            settings_pin: "App Lock (PIN)",
                          settings_backup: "Backup & Restore",
                          settings_clear: "Clear All Data",
                          stats_moods: "Mood Overview",
                          stats_calendar: "Calendar",
                          otd_title: "On This Day",
                          pin_enter: "Enter PIN",
                          pin_create: "Create PIN",
                          btn_cancel: "Cancel",
                          btn_save: "Save",
                          btn_update: "Update",
                          btn_export: "Export Data (JSON)",
                          btn_import: "Import Data",
                          modal_new: "New Entry",
                          modal_edit: "Edit Entry",
                          ph_title: "Title of the day...",
                          ph_content: "Write your thoughts...",
                          ph_tags: "Tags (comma separated)...",
                          ph_search: "Search memories...",
                          confirm_delete: "Are you sure you want to delete this memory?",
                          confirm_clear: "This will delete ALL your entries. Are you sure?",
                          confirm_import: "Merge new data with existing entries?",
                          alert_exported: "Backup downloaded!",
                          alert_imported: "Data imported successfully!",
                          alert_invalid: "Invalid file format.",
                          prompts: ["What made you smile today?", "What is a lesson you learned recently?", "Describe a moment of peace."],
                          moods: { happy: "Happy", calm: "Calm", sad: "Sad", excited: "Excited" }
        },
        tr: {
            app_title: "Vessel.",
            home_empty: "Hikayen burada başlıyor...",
            settings_title: "Tercihler",
            settings_lang: "Dil",
            settings_theme: "Karanlık Mod",
            settings_pin: "Uygulama Kilidi (PIN)",
                          settings_backup: "Yedekleme",
                          settings_clear: "Tüm Verileri Sil",
                          stats_moods: "Ruh Hali Özeti",
                          stats_calendar: "Takvim",
                          otd_title: "Tarihte Bugün",
                          pin_enter: "PIN Girin",
                          pin_create: "PIN Oluştur",
                          btn_cancel: "İptal",
                          btn_save: "Kaydet",
                          btn_update: "Güncelle",
                          btn_export: "Veriyi İndir (JSON)",
                          btn_import: "Veri Yükle",
                          modal_new: "Yeni Anı",
                          modal_edit: "Anıyı Düzenle",
                          ph_title: "Günün başlığı...",
                          ph_content: "Düşüncelerini yaz...",
                          ph_tags: "Etiketler (virgülle ayır)...",
                          ph_search: "Anılarda ara...",
                          confirm_delete: "Bu anıyı silmek istediğine emin misin?",
                          confirm_clear: "TÜM anıların silinecek. Emin misin?",
                          confirm_import: "Veriler birleştirilsin mi?",
                          alert_exported: "Yedek indirildi!",
                          alert_imported: "Veri yüklendi!",
                          alert_invalid: "Geçersiz dosya.",
                          prompts: ["Bugün seni ne gülümsetti?", "Son zamanlarda öğrendiğin bir ders?", "Huzurlu bir anı tarif et."],
                          moods: { happy: "Mutlu", calm: "Sakin", sad: "Üzgün", excited: "Heyecanlı" }
        },
        es: {
            app_title: "Vessel.",
            home_empty: "Tu historia comienza aquí...",
            settings_title: "Preferencias",
            settings_lang: "Idioma",
            settings_theme: "Modo Oscuro",
            settings_pin: "Bloqueo de App (PIN)",
                          settings_backup: "Respaldo",
                          settings_clear: "Borrar Todo",
                          stats_moods: "Resumen de Ánimo",
                          stats_calendar: "Calendario",
                          otd_title: "Un Día Como Hoy",
                          pin_enter: "Ingresar PIN",
                          pin_create: "Crear PIN",
                          btn_cancel: "Cancelar",
                          btn_save: "Guardar",
                          btn_update: "Actualizar",
                          btn_export: "Exportar Datos",
                          btn_import: "Importar Datos",
                          modal_new: "Nueva Entrada",
                          modal_edit: "Editar Entrada",
                          ph_title: "Título del día...",
                          ph_content: "Escribe tus pensamientos...",
                          ph_tags: "Etiquetas...",
                          ph_search: "Buscar recuerdos...",
                          confirm_delete: "¿Borrar este recuerdo?",
                          confirm_clear: "Esto borrará TODO. ¿Seguro?",
                          confirm_import: "¿Fusionar datos?",
                          alert_exported: "¡Respaldo descargado!",
                          alert_imported: "¡Datos importados!",
                          alert_invalid: "Archivo inválido.",
                          prompts: ["¿Qué te hizo sonreír hoy?", "¿Qué lección aprendiste?", "Describe un momento de paz."],
                          moods: { happy: "Feliz", calm: "Calmado", sad: "Triste", excited: "Emocionado" }
        }
    };

    // --- STATE MANAGEMENT ---
    let entries = JSON.parse(localStorage.getItem('vessel_entries')) || [];
    let settings = JSON.parse(localStorage.getItem('vessel_settings')) || { theme: 'light', lang: 'en', pinEnabled: false, pinCode: null };

    let editingId = null;
    let currentCalendarDate = new Date();
    let pinBuffer = "";

    // --- DOM ELEMENTS ---
    const app = {
        navBtns: document.querySelectorAll('.nav-btn[data-target]'),
                          views: document.querySelectorAll('.view'),

                          // Modal
                          addBtn: document.getElementById('add-entry-btn'),
                          modal: document.getElementById('editor-modal'),
                          closeModalBtn: document.getElementById('close-modal'),
                          saveBtn: document.getElementById('save-entry'),
                          modalTitle: document.getElementById('modal-title'),
                          promptBtn: document.getElementById('prompt-btn'),

                          // Inputs
                          inputTitle: document.getElementById('entry-title'),
                          inputContent: document.getElementById('entry-content'),
                          inputTags: document.getElementById('entry-tags'),
                          searchInput: document.getElementById('search-input'),
                          dateDisplay: document.getElementById('current-date'),

                          // Settings
                          langSelect: document.getElementById('lang-select'),
                          themeSwitch: document.getElementById('theme-switch'),
                          pinSwitch: document.getElementById('pin-switch'),
                          clearDataBtn: document.getElementById('clear-data-btn'),
                          exportBtn: document.getElementById('export-btn'),
                          importBtn: document.getElementById('import-btn'),
                          importFile: document.getElementById('import-file'),

                          // UI
                          entryList: document.getElementById('entry-list'),
                          emptyState: document.getElementById('empty-state'),
                          streakBadge: document.getElementById('streak-badge'),
                          streakCount: document.getElementById('streak-count'),
                          otdContainer: document.getElementById('on-this-day-container'),

                          // Stats
                          moodPie: document.getElementById('mood-pie-chart'),
                          moodLegend: document.getElementById('mood-legend'),
                          calGrid: document.getElementById('calendar-grid'),
                          calMonthYear: document.getElementById('calendar-month-year'),
                          prevMonthBtn: document.getElementById('prev-month'),
                          nextMonthBtn: document.getElementById('next-month'),

                          // PIN
                          pinOverlay: document.getElementById('pin-lock-overlay'),
                          pinDots: document.getElementById('pin-dots').querySelectorAll('span'),
                          pinKeypad: document.getElementById('pin-keypad')
    };

    // --- INITIALIZATION ---
    function init() {
        if (settings.pinEnabled && sessionStorage.getItem('vessel_unlocked') !== 'true') {
            app.pinOverlay.classList.remove('hidden');
        } else {
            app.pinOverlay.classList.add('hidden');
        }

        applyTheme(settings.theme);
        applyLanguage(settings.lang);

        app.langSelect.value = settings.lang;
        app.themeSwitch.checked = (settings.theme === 'dark');
        app.pinSwitch.checked = settings.pinEnabled;

        renderEntries();
        renderStreak();
        renderOnThisDay();
        setupEventListeners();

        // Initialize Calendar and Stats
        renderCalendar();
        renderMoodChart();
    }

    // --- PIN SYSTEM ---
    function handlePinInput(key) {
        if (key === 'backspace') {
            pinBuffer = pinBuffer.slice(0, -1);
        } else if (pinBuffer.length < 4) {
            pinBuffer += key;
        }
        updatePinDots();
        if (pinBuffer.length === 4) verifyPin();
    }

    function updatePinDots() {
        app.pinDots.forEach((dot, index) => {
            if (index < pinBuffer.length) dot.classList.add('filled');
            else dot.classList.remove('filled');
        });
    }

    function verifyPin() {
        if (app.pinOverlay.dataset.mode === 'create') {
            settings.pinCode = pinBuffer;
            settings.pinEnabled = true;
            saveSettings();
            app.pinOverlay.classList.add('hidden');
            alert("PIN Created!");
            pinBuffer = "";
            updatePinDots();
            return;
        }

        if (pinBuffer === settings.pinCode) {
            sessionStorage.setItem('vessel_unlocked', 'true');
            app.pinOverlay.classList.add('hidden');
            pinBuffer = "";
            updatePinDots();
        } else {
            alert("Wrong PIN");
            pinBuffer = "";
            updatePinDots();
        }
    }

    function togglePinSetting(enabled) {
        if (enabled) {
            app.pinOverlay.classList.remove('hidden');
            app.pinOverlay.dataset.mode = 'create';
            document.querySelector('#pin-lock-overlay h2').textContent = i18n[settings.lang].pin_create;
        } else {
            settings.pinEnabled = false;
            settings.pinCode = null;
            saveSettings();
        }
    }

    // --- LANGUAGE & THEME ---
    function applyLanguage(lang) {
        settings.lang = lang;
        saveSettings();
        const texts = i18n[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(texts[key]) el.textContent = texts[key];
        });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if(texts[key]) el.placeholder = texts[key];
            });
                updateDateDisplay();
                renderCalendar();
                renderMoodChart(); // Re-render charts to update labels
    }

    function updateDateDisplay() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        app.dateDisplay.textContent = new Date().toLocaleDateString(settings.lang === 'en' ? 'en-US' : settings.lang, options);
    }

    function applyTheme(theme) {
        settings.theme = theme;
        saveSettings();
        document.body.classList.toggle('dark-theme', theme === 'dark');
    }

    function saveSettings() {
        localStorage.setItem('vessel_settings', JSON.stringify(settings));
    }

    // --- ROUTING ---
    function switchView(targetId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if(activeBtn) activeBtn.classList.add('active');

        app.views.forEach(view => {
            view.classList.remove('active');
            if(view.id === `view-${targetId}`) view.classList.add('active');
        });

        // Specific refreshes
        if(targetId === 'stats') renderMoodChart();
        if(targetId === 'calendar') renderCalendar();
    }

    // --- CORE LOGIC (CRUD) ---
    function openModal(entry = null) {
        updateDateDisplay();
        app.modal.classList.add('active');
        if (entry) {
            editingId = entry.id;
            app.inputTitle.value = entry.title;
            app.inputContent.value = entry.content;
            app.inputTags.value = entry.tags ? entry.tags.join(', ') : '';
            document.querySelector(`input[name="mood"][value="${entry.mood}"]`).checked = true;
            app.modalTitle.textContent = i18n[settings.lang].modal_edit;
            app.saveBtn.textContent = i18n[settings.lang].btn_update;
        } else {
            editingId = null;
            resetForm();
            app.modalTitle.textContent = i18n[settings.lang].modal_new;
            app.saveBtn.textContent = i18n[settings.lang].btn_save;
        }
    }

    function saveEntry() {
        const title = app.inputTitle.value.trim();
        const content = app.inputContent.value.trim();
        const tags = app.inputTags.value.trim().split(',').map(t => t.trim()).filter(t => t.length > 0);
        const mood = document.querySelector('input[name="mood"]:checked').value;

        if (!title && !content) return;

        if (editingId) {
            const index = entries.findIndex(e => e.id === editingId);
            if (index !== -1) {
                entries[index].title = title;
                entries[index].content = content;
                entries[index].mood = mood;
                entries[index].tags = tags;
            }
        } else {
            const newEntry = {
                id: Date.now(),
                          title: title || "Untitled",
                          content: content,
                          mood: mood,
                          tags: tags,
                          date: new Date().toISOString()
            };
            entries.unshift(newEntry);
        }

        updateStorage();
        renderEntries();
        renderStreak();
        app.modal.classList.remove('active');
    }

    function deleteEntry(id) {
        if(confirm(i18n[settings.lang].confirm_delete)) {
            entries = entries.filter(entry => entry.id !== Number(id));
            updateStorage();
            renderEntries();
            renderStreak();
        }
    }

    function updateStorage() {
        localStorage.setItem('vessel_entries', JSON.stringify(entries));
    }

    function resetForm() {
        app.inputTitle.value = '';
        app.inputContent.value = '';
        app.inputTags.value = '';
        document.getElementById('mood-1').checked = true;
    }

    // --- STATS: MOOD CHART (Localized) ---
    function renderMoodChart() {
        const counts = { happy: 0, calm: 0, sad: 0, excited: 0 };
        entries.forEach(e => counts[e.mood] ? counts[e.mood]++ : counts[e.mood]=1);

        const total = entries.length;
        if(total === 0) {
            app.moodPie.style.background = '#eee';
            app.moodLegend.innerHTML = '';
            return;
        }

        const colors = { happy: '#FFD166', calm: '#606C38', sad: '#118AB2', excited: '#EF476F' };

        let currentDeg = 0;
        let gradientStr = [];
        let legendHtml = '';

        // Get translated mood names
        const moodNames = i18n[settings.lang].moods;

        for (const [mood, count] of Object.entries(counts)) {
            if (count > 0) {
                const deg = (count / total) * 360;
                gradientStr.push(`${colors[mood]} ${currentDeg}deg ${currentDeg + deg}deg`);
                currentDeg += deg;

                // Use localized name here
                legendHtml += `
                <div class="legend-item">
                <div class="legend-color" style="background: ${colors[mood]}"></div>
                <span>${moodNames[mood]} (${Math.round((count/total)*100)}%)</span>
                </div>
                `;
            }
        }

        app.moodPie.style.background = `conic-gradient(${gradientStr.join(', ')})`;
        app.moodLegend.innerHTML = legendHtml;
    }

    function renderCalendar() {
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        const monthName = new Date(year, month).toLocaleString(settings.lang === 'en' ? 'en-US' : settings.lang, { month: 'long', year: 'numeric' });
        app.calMonthYear.textContent = monthName;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        app.calGrid.innerHTML = '';
        for(let i=0; i<firstDay; i++) app.calGrid.innerHTML += `<div></div>`;

        for(let day=1; day<=daysInMonth; day++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const dayEntries = entries.filter(e => e.date.startsWith(dateStr));
            let classes = 'cal-day';
            if (dayEntries.length > 0) classes += ` active mood-${dayEntries[0].mood}`;
            app.calGrid.innerHTML += `<div class="${classes}">${day}</div>`;
        }
    }

    function renderStreak() {
        if (entries.length === 0) {
            app.streakBadge.classList.add('hidden');
            return;
        }
        const sorted = [...entries].sort((a,b) => new Date(b.date) - new Date(a.date));
        const today = new Date().toDateString();
        let streak = 0;
        let checkDate = new Date();

        const hasPostedToday = sorted.some(e => new Date(e.date).toDateString() === today);
        if (!hasPostedToday) checkDate.setDate(checkDate.getDate() - 1);

        for (let i = 0; i < 365; i++) {
            const targetStr = checkDate.toDateString();
            const found = sorted.some(e => new Date(e.date).toDateString() === targetStr);
            if (found) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
            else break;
        }

        if (streak > 0) {
            app.streakBadge.classList.remove('hidden');
            app.streakCount.textContent = streak;
        } else app.streakBadge.classList.add('hidden');
    }

    // --- ON THIS DAY ---
    function renderOnThisDay() {
        const today = new Date();
        const match = entries.find(e => {
            const d = new Date(e.date);
            return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() !== today.getFullYear();
        });

        if (match) {
            const yearsAgo = today.getFullYear() - new Date(match.date).getFullYear();
            app.otdContainer.innerHTML = `
            <div class="otd-card journal-card" data-id="${match.id}">
            <div class="otd-header">
            <i class="ri-time-line"></i>
            <span>${i18n[settings.lang].otd_title} (${yearsAgo}y)</span>
            </div>
            <h3 class="card-title">${escapeHtml(match.title)}</h3>
            <p class="otd-preview">"${escapeHtml(match.content.substring(0, 60))}..."</p>
            </div>
            `;
        } else app.otdContainer.innerHTML = '';
    }

    // --- SEARCH & HELPERS ---
    function handleSearch(e) {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#entry-list .journal-card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const content = card.querySelector('.card-preview').textContent.toLowerCase();
            const tags = card.querySelector('.card-tags') ? card.querySelector('.card-tags').textContent.toLowerCase() : '';
            card.style.display = (title.includes(term) || content.includes(term) || tags.includes(term)) ? 'block' : 'none';
        });
    }

    function renderEntries() {
        app.entryList.innerHTML = '';
        if (entries.length === 0) app.emptyState.classList.remove('hidden');
        else {
            app.emptyState.classList.add('hidden');
            entries.forEach(entry => app.entryList.appendChild(createCardElement(entry)));
        }
    }

    function createCardElement(entry) {
        const dateObj = new Date(entry.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString(settings.lang === 'en' ? 'en-US' : settings.lang, { month: 'short' });
        const moodIcons = { 'happy': 'ri-emotion-happy-line', 'calm': 'ri-emotion-normal-line', 'sad': 'ri-emotion-sad-line', 'excited': 'ri-emotion-line' };

        const article = document.createElement('article');
        article.className = 'journal-card';
        article.dataset.id = entry.id;

        let tagsHtml = '';
        if (entry.tags && entry.tags.length > 0) {
            tagsHtml = `<div class="card-tags">${entry.tags.map(tag => `<span class="tag-badge">#${escapeHtml(tag)}</span>`).join('')}</div>`;
        }

        article.innerHTML = `
        <div class="card-header">
        <span class="card-date"><span class="day">${day}</span><span class="month">${month}</span></span>
        <div class="card-actions">
        <div class="card-mood"><i class="${moodIcons[entry.mood]}"></i></div>
        <button class="delete-btn"><i class="ri-delete-bin-line"></i></button>
        </div>
        </div>
        <div class="card-body">
        <h3 class="card-title">${escapeHtml(entry.title)}</h3>
        <p class="card-preview">${escapeHtml(entry.content)}</p>
        ${tagsHtml}
        </div>
        `;
        return article;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function exportData() {
        const dataStr = JSON.stringify(entries, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `vessel_backup_${new Date().toISOString().slice(0,10)}.json`);
        linkElement.click();
        alert(i18n[settings.lang].alert_exported);
    }

    function handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (confirm(i18n[settings.lang].confirm_import)) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (Array.isArray(imported)) {
                        const existingIds = new Set(entries.map(en => en.id));
                        const newEntries = imported.filter(en => !existingIds.has(en.id));
                        entries = [...newEntries, ...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
                        updateStorage();
                        renderEntries();
                        renderStreak();
                        renderCalendar();
                        renderMoodChart();
                        alert(i18n[settings.lang].alert_imported);
                    }
                } catch (error) { alert(i18n[settings.lang].alert_invalid); }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        app.navBtns.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.target)));
        app.addBtn.addEventListener('click', () => openModal());
        app.closeModalBtn.addEventListener('click', () => app.modal.classList.remove('active'));
        app.saveBtn.addEventListener('click', saveEntry);
        app.promptBtn.addEventListener('click', () => {
            const p = i18n[settings.lang].prompts;
            app.inputTitle.value = p[Math.floor(Math.random() * p.length)];
        });

        app.searchInput.addEventListener('input', handleSearch);
        app.langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
        app.themeSwitch.addEventListener('change', (e) => applyTheme(e.target.checked ? 'dark' : 'light'));

        app.pinSwitch.addEventListener('change', (e) => togglePinSetting(e.target.checked));
        app.pinKeypad.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && !btn.classList.contains('empty')) {
                const key = btn.classList.contains('backspace') ? 'backspace' : btn.innerText;
                handlePinInput(key);
            }
        });

        app.prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
        app.nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.journal-card');
            if(card) {
                if(e.target.closest('.delete-btn')) {
                    e.stopPropagation();
                    deleteEntry(card.dataset.id);
                } else {
                    const entry = entries.find(en => en.id === Number(card.dataset.id));
                    if(entry) openModal(entry);
                }
            }
        });

        app.clearDataBtn.addEventListener('click', () => {
            if(confirm(i18n[settings.lang].confirm_clear)) {
                entries = [];
                updateStorage();
                renderEntries();
                renderMoodChart();
                renderStreak();
            }
        });
        app.exportBtn.addEventListener('click', exportData);
        app.importBtn.addEventListener('click', () => app.importFile.click());
        app.importFile.addEventListener('change', handleFileImport);
    }

    init();
});
