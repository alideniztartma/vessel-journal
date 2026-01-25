document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATIONS (Complete dynamic support) ---
    const i18n = {
        en: {
            app_title: "Vessel.",
            home_empty: "Your story begins here...",
            settings_title: "Preferences",
            settings_lang: "Language",
            settings_theme: "Theme",
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
            ph_photos: "Add Photos",
            prompts: ["What made you smile today?", "What is a lesson you learned recently?", "Describe a moment of peace."],
            moods: { happy: "Happy", calm: "Calm", sad: "Sad", excited: "Excited" },
            themes: { ocean: "Ocean (Default)", default: "Forest (Green)", sunset: "Sunset (Orange)", lavender: "Lavender (Purple)", dark: "Dark Mode" },

            lbl_time_capsule: "Time Capsule",
            lbl_lock_until: "Lock until:",
            msg_locked: "Locked until",
            msg_locked_desc: "This memory is sealed in a time capsule."
        },
        tr: {
            app_title: "Vessel.",
            home_empty: "Hikayen burada başlıyor...",
            settings_title: "Tercihler",
            settings_lang: "Dil",
            settings_theme: "Tema",
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
            ph_photos: "Fotoğraf Ekle",
            prompts: ["Bugün seni ne gülümsetti?", "Son zamanlarda öğrendiğin bir ders?", "Huzurlu bir anı tarif et."],
            moods: { happy: "Mutlu", calm: "Sakin", sad: "Üzgün", excited: "Heyecanlı" },
            themes: { ocean: "Okyanus (Varsayılan)", default: "Orman (Yeşil)", sunset: "Gün Batımı (Turuncu)", lavender: "Lavanta (Mor)", dark: "Karanlık Mod" },

            lbl_time_capsule: "Zaman Kapsülü",
            lbl_lock_until: "Kilit tarihi:",
            msg_locked: "Kilitli",
            msg_locked_desc: "Bu anı bir zaman kapsülünde saklı."
        },
        es: {
            app_title: "Vessel.",
            home_empty: "Tu historia comienza aquí...",
            settings_title: "Preferencias",
            settings_lang: "Idioma",
            settings_theme: "Tema",
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
            ph_photos: "Añadir Fotos",
            prompts: ["¿Qué te hizo sonreír hoy?", "¿Qué lección aprendiste?", "Describe un momento de paz."],
            moods: { happy: "Feliz", calm: "Calmado", sad: "Triste", excited: "Emocionado" },
            themes: { ocean: "Océano (Por Defecto)", default: "Bosque (Verde)", sunset: "Atardecer (Naranja)", lavender: "Lavanda (Morado)", dark: "Modo Oscuro" },

            lbl_time_capsule: "Cápsula del Tiempo",
            lbl_lock_until: "Bloquear hasta:",
            msg_locked: "Bloqueado hasta",
            msg_locked_desc: "Este recuerdo está sellado."
        }
    };

    // --- STATE MANAGEMENT ---
    let entries = JSON.parse(localStorage.getItem('vessel_entries')) || [];
    let settings = JSON.parse(localStorage.getItem('vessel_settings')) || { theme: 'ocean', darkMode: false, lang: 'en', pinEnabled: false, pinCode: null };

    let editingId = null;
    let currentCalendarDate = new Date();
    let pinBuffer = "";
    let showFavoritesOnly = false;
    let currentPhotos = [];

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
        tagSuggestions: document.getElementById('tag-suggestions'),
        imageInput: document.getElementById('image-input'),
        addPhotoBtn: document.getElementById('add-photo-btn'),
        imagePreviewContainer: document.getElementById('image-preview-container'),
        searchInput: document.getElementById('search-input'),
        filterFavBtn: document.getElementById('filter-fav-btn'),
        dateDisplay: document.getElementById('current-date'),
        wordCount: document.getElementById('word-count'),

        // Settings
        langSelect: document.getElementById('lang-select'),
        themeSelect: document.getElementById('theme-select'),
        themeSwitch: document.getElementById('theme-switch'),
        pinSwitch: document.getElementById('pin-switch'),

        clearDataBtn: document.getElementById('clear-data-btn'),
        exportBtn: document.getElementById('export-btn'),
        importBtn: document.getElementById('import-btn'),
        importFile: document.getElementById('import-file'),

        // Habits & Capsule
        // Capsule
        capsuleSwitch: document.getElementById('capsule-switch'),
        capsuleDateContainer: document.getElementById('capsule-date-container'),
        capsuleDate: document.getElementById('capsule-date'),

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
        toggleDarkMode(settings.darkMode);
        applyLanguage(settings.lang);

        app.langSelect.value = settings.lang;
        app.themeSelect.value = settings.theme;
        app.themeSwitch.checked = settings.darkMode;
        app.pinSwitch.checked = settings.pinEnabled;


        renderEntries();
        renderStreak();
        renderOnThisDay();

        setupEventListeners();

        // Initialize Calendar and Stats
        renderCalendar();
        renderMoodChart();

        renderTagSuggestions();
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
            if (texts[key]) el.textContent = texts[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (texts[key]) el.placeholder = texts[key];
        });

        // Update Theme Options
        if (texts.themes) {
            Array.from(app.themeSelect.options).forEach(option => {
                if (texts.themes[option.value]) {
                    option.textContent = texts.themes[option.value];
                }
            });
        }

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

        // Remove old theme attributes
        document.body.removeAttribute('data-theme');

        if (theme !== 'ocean') {
            document.body.setAttribute('data-theme', theme);
        }
    }

    function toggleDarkMode(enabled) {
        settings.darkMode = enabled;
        saveSettings();
        document.body.classList.toggle('dark-theme', enabled);
    }

    function saveSettings() {
        localStorage.setItem('vessel_settings', JSON.stringify(settings));
    }

    // --- ROUTING ---
    function switchView(targetId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        app.views.forEach(view => {
            view.classList.remove('active');
            if (view.id === `view-${targetId}`) view.classList.add('active');
        });

        // Specific refreshes
        if (targetId === 'stats') renderMoodChart();
        if (targetId === 'calendar') renderCalendar();
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
            currentPhotos = entry.photos || [];
            renderImagePreviews();
            renderImagePreviews();
            document.querySelector(`input[name="mood"][value="${entry.mood}"]`).checked = true;



            // Time Capsule
            if (entry.lockDate) {
                app.capsuleSwitch.checked = true;
                app.capsuleDateContainer.classList.remove('hidden');
                app.capsuleDate.value = entry.lockDate.split('T')[0];
            } else {
                app.capsuleSwitch.checked = false;
                app.capsuleDateContainer.classList.add('hidden');
                app.capsuleDate.value = '';
            }

            app.modalTitle.textContent = i18n[settings.lang].modal_edit;
            app.saveBtn.textContent = i18n[settings.lang].btn_update;
        } else {
            editingId = null;
            resetForm();
            resetForm();
            app.modalTitle.textContent = i18n[settings.lang].modal_new;
            app.saveBtn.textContent = i18n[settings.lang].btn_save;
        }
        updateWordCount();
    }

    function saveEntry() {
        const title = app.inputTitle.value.trim();
        const content = app.inputContent.value.trim();
        const tags = app.inputTags.value.trim().split(',').map(t => t.trim()).filter(t => t.length > 0);

        const mood = document.querySelector('input[name="mood"]:checked').value;



        // Time Capsule
        let lockDate = null;
        if (app.capsuleSwitch.checked && app.capsuleDate.value) {
            lockDate = new Date(app.capsuleDate.value).toISOString();
        }

        if (!title && !content) return;

        if (editingId) {
            const index = entries.findIndex(e => e.id === editingId);
            if (index !== -1) {
                entries[index].title = title;
                entries[index].content = content;
                entries[index].mood = mood;
                entries[index].tags = tags;
                entries[index].mood = mood;
                entries[index].tags = tags;
                entries[index].photos = currentPhotos;
                entries[index].photos = currentPhotos;
                entries[index].lockDate = lockDate;
                entries[index].lockDate = lockDate;
                // Preserve existing favorite status if any
                if (entries[index].isFavorite === undefined) entries[index].isFavorite = false;
            }
        } else {
            const newEntry = {
                id: Date.now(),
                title: title || "Untitled",
                content: content,
                mood: mood,
                tags: tags,
                mood: mood,
                tags: tags,
                photos: currentPhotos,
                photos: currentPhotos,
                lockDate: lockDate,
                lockDate: lockDate,
                date: new Date().toISOString(),
                isFavorite: false
            };
            entries.unshift(newEntry);
        }

        updateStorage();
        renderEntries();
        renderStreak();
        renderTagSuggestions();
        app.modal.classList.remove('active');
    }

    function deleteEntry(id) {
        if (confirm(i18n[settings.lang].confirm_delete)) {
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
        currentPhotos = [];
        renderImagePreviews();
        currentPhotos = [];
        renderImagePreviews();
        app.capsuleSwitch.checked = false;
        app.capsuleDateContainer.classList.add('hidden');
        app.capsuleDate.value = '';
        document.getElementById('mood-1').checked = true;
    }

    function toggleFavorite(id) {
        const index = entries.findIndex(e => e.id === Number(id));
        if (index !== -1) {
            entries[index].isFavorite = !entries[index].isFavorite;
            updateStorage();
            renderEntries();
        }
    }

    // --- MARKDOWN & WORD COUNT ---
    function parseMarkdown(text) {
        if (!text) return '';
        let html = escapeHtml(text);

        // Bold (**text**)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic (*text*)
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Lists (- item)
        html = html.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>');
        // Fix nested lists (naive approach: merge adjacent uls)
        html = html.replace(/<\/ul>\s*<ul>/g, '');

        return html;
    }

    function updateWordCount() {
        const text = app.inputContent.value.trim();
        const count = text ? text.split(/\s+/).length : 0;
        app.wordCount.textContent = `${count} words`;
    }

    // --- PHOTO HANDLING ---
    function handleImageSelect(e) {
        const files = Array.from(e.target.files);
        processFiles(files);
    }

    function handleImageDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        app.imageDropZone.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        processFiles(files);
    }

    function processFiles(files) {
        files.forEach(file => {
            compressImage(file, (base64) => {
                currentPhotos.push(base64);
                renderImagePreviews();
            });
        });
    }

    function compressImage(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                if (img.width > MAX_WIDTH) {
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                callback(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
    }

    function renderImagePreviews() {
        app.imagePreviewContainer.innerHTML = '';
        currentPhotos.forEach((photo, index) => {
            const div = document.createElement('div');
            div.className = 'image-preview';
            div.innerHTML = `<img src="${photo}"><button class="remove-btn"><i class="ri-close-line"></i></button>`;
            div.querySelector('.remove-btn').addEventListener('click', () => {
                currentPhotos.splice(index, 1);
                renderImagePreviews();
            });
            app.imagePreviewContainer.appendChild(div);
        });
    }

    // --- STATS: MOOD CHART (Localized) ---
    function renderMoodChart() {
        const counts = { happy: 0, calm: 0, sad: 0, excited: 0 };
        entries.forEach(e => counts[e.mood] ? counts[e.mood]++ : counts[e.mood] = 1);

        const total = entries.length;
        if (total === 0) {
            app.moodPie.style.background = '#eee';
            app.moodLegend.innerHTML = '';
            return;
        }

        const colors = {
            happy: '#FFD166',
            calm: settings.theme === 'ocean' ? '#0077B6' : '#606C38',
            sad: '#118AB2',
            excited: '#EF476F'
        };

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
                <span>${moodNames[mood]} (${Math.round((count / total) * 100)}%)</span>
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
        for (let i = 0; i < firstDay; i++) app.calGrid.innerHTML += `<div></div>`;

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
        const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
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
        renderEntries(term);
    }

    function renderEntries(searchTerm = '') {
        app.entryList.innerHTML = '';

        let filtered = entries;

        if (showFavoritesOnly) {
            filtered = filtered.filter(e => e.isFavorite);
        }

        if (searchTerm) {
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(searchTerm) ||
                e.content.toLowerCase().includes(searchTerm) ||
                (e.tags && e.tags.some(t => t.toLowerCase().includes(searchTerm)))
            );
        }

        if (filtered.length === 0) app.emptyState.classList.remove('hidden');
        else {
            app.emptyState.classList.add('hidden');
            filtered.forEach(entry => app.entryList.appendChild(createCardElement(entry)));
        }
    }

    function createCardElement(entry) {
        const now = new Date();
        const dateObj = new Date(entry.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString(settings.lang === 'en' ? 'en-US' : settings.lang, { month: 'short' });
        const moodIcons = { 'happy': 'ri-emotion-happy-line', 'calm': 'ri-emotion-normal-line', 'sad': 'ri-emotion-sad-line', 'excited': 'ri-emotion-line' };

        // Check Lock Status
        let isLocked = false;
        let lockDateStr = '';
        if (entry.lockDate) {
            const unlockTime = new Date(entry.lockDate);
            if (now < unlockTime) {
                isLocked = true;
                lockDateStr = unlockTime.toLocaleDateString();
            }
        }

        const article = document.createElement('article');
        article.className = `journal-card ${isLocked ? 'locked-entry' : ''}`;
        article.dataset.id = entry.id;

        let tagsHtml = '';
        if (!isLocked && entry.tags && entry.tags.length > 0) {
            tagsHtml = `<div class="card-tags">${entry.tags.map(tag => `<span class="tag-badge">#${escapeHtml(tag)}</span>`).join('')}</div>`;
        }

        let photosHtml = '';
        if (!isLocked && entry.photos && entry.photos.length > 0) {
            photosHtml = `<div class="card-photos">${entry.photos.map(photo => `<img src="${photo}" class="card-photo">`).join('')}</div>`;
        }



        // Content Logic
        let contentHtml = '';
        let titleHtml = escapeHtml(entry.title);

        if (isLocked) {
            titleHtml = "???";
            contentHtml = `
                <div class="locked-content">
                    <i class="ri-lock-2-line"></i>
                    <p>${i18n[settings.lang].msg_locked} ${lockDateStr}</p>
                    <small>${i18n[settings.lang].msg_locked_desc}</small>
                </div>
            `;
        } else {
            contentHtml = `<div class="card-preview">${parseMarkdown(entry.content)}</div>`;
        }

        const favIconClass = entry.isFavorite ? 'ri-star-fill' : 'ri-star-line';
        const favBtnClass = entry.isFavorite ? 'star-btn active' : 'star-btn';

        article.innerHTML = `
        <button class="${favBtnClass}" title="Favorite"><i class="${favIconClass}"></i></button>
        <div class="card-header">
        <span class="card-date"><span class="day">${day}</span><span class="month">${month}</span></span>
        <div class="card-actions">
        <div class="card-mood"><i class="${moodIcons[entry.mood] || 'ri-emotion-line'}"></i></div>
        ${!isLocked ? `<button class="edit-btn"><i class="ri-pencil-line"></i></button>` : ''}
        <button class="delete-btn"><i class="ri-delete-bin-line"></i></button>
        </div>
        </div>
        <div class="card-body">
        <h3 class="card-title">${titleHtml}</h3>
        ${contentHtml}
        ${photosHtml}

        ${tagsHtml}
        </div>
        `;

        // Event Listeners
        if (!isLocked) {
            article.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(entry);
            });
            article.addEventListener('click', () => openModal(entry));
        }

        article.querySelector('.star-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(entry.id);
        });

        article.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteEntry(entry.id);
        });

        return article;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getAllTags() {
        const tags = new Set();
        entries.forEach(entry => {
            if (entry.tags) entry.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }

    function renderTagSuggestions() {
        const tags = getAllTags();
        app.tagSuggestions.innerHTML = tags.map(tag => `<option value="${tag}">`).join('');
    }

    function exportData() {
        const dataStr = JSON.stringify(entries, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `vessel_backup_${new Date().toISOString().slice(0, 10)}.json`);
        linkElement.click();
        alert(i18n[settings.lang].alert_exported);
    }

    function handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (confirm(i18n[settings.lang].confirm_import)) {
            const reader = new FileReader();
            reader.onload = function (e) {
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
        app.filterFavBtn.addEventListener('click', () => {
            showFavoritesOnly = !showFavoritesOnly;
            app.filterFavBtn.classList.toggle('active', showFavoritesOnly);
            renderEntries(app.searchInput.value);
        });

        app.inputContent.addEventListener('input', updateWordCount);

        // Image Listeners
        app.imageInput.addEventListener('change', handleImageSelect);
        app.addPhotoBtn.addEventListener('click', () => app.imageInput.click());

        app.langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
        app.themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
        app.themeSwitch.addEventListener('change', (e) => toggleDarkMode(e.target.checked));

        app.pinSwitch.addEventListener('change', (e) => togglePinSetting(e.target.checked));

        // Capsule Listeners
        app.capsuleSwitch.addEventListener('change', (e) => {
            app.capsuleDateContainer.classList.toggle('hidden', !e.target.checked);
        });
        app.pinKeypad.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && !btn.classList.contains('empty')) {
                const key = btn.classList.contains('backspace') ? 'backspace' : btn.innerText;
                handlePinInput(key);
            }
        });

        app.prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setDate(1); // Avoid month skipping (e.g. Mar 31 -> Feb 28)
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
        app.nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setDate(1);
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.journal-card');
            if (card) {
                if (e.target.closest('.delete-btn')) {
                    e.stopPropagation();
                    deleteEntry(card.dataset.id);
                } else if (e.target.closest('.star-btn')) {
                    e.stopPropagation();
                    toggleFavorite(card.dataset.id);
                } else {
                    const entry = entries.find(en => en.id === Number(card.dataset.id));
                    if (entry) {
                        if (entry.lockDate && new Date() < new Date(entry.lockDate)) return;
                        openModal(entry);
                    }
                }
            }
        });

        app.clearDataBtn.addEventListener('click', () => {
            if (confirm(i18n[settings.lang].confirm_clear)) {
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


