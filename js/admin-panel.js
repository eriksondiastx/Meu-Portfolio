// CODEX: Script reorganizado para evitar duplicaÃ§Ãµes e centralizar o CRUD do dashboard
(function () {
    const STORAGE_KEYS = {
        personalInfo: 'personalInfo',
        tecnologias: 'tecnologias',
        cursos: 'cursos',
        experiencias: 'experiencias',
        projetos: 'projetos',
        design: 'design',
        atividades: 'atividades'
    };

    // CODEX: Defaults mÃ­nimos para manter o painel coerente quando o localStorage estiver vazio
    const DEFAULTS = {
        personalInfo: {
            nome: 'Erikson InÃ¡cio Dias Teixeira',
            titulo: 'Desenvolvedor Front-End',
            descricao: 'Apaixonado por tecnologia e por computadores desde os 13 anos de idade.',
            profileImage: 'imagem/default/perfil-default.jpg', // CODEX: imagem do perfil (Profile2)
            facebook: 'https://www.facebook.com/erikson.teixeira.73/',
            instagram: 'https://www.instagram.com/eriksonteixeira/',
            linkedin: 'https://www.linkedin.com/in/erikson-teixeira-b912b3145',
            email: 'eriksondiastx@gmail.com',
            telefone: '+244 949 100 325',
            whatsapp: '244949100325',
            localizacao: 'Luanda, Angola',
            cvLink: 'cv/1Âº Curricuculum  Vitae Erikson 05_25_IT.pdf',
            titulosRotativos: 'Desenvolvedor Front-End, Professor, Criador de conteÃºdo, Designer GrÃ¡fico'
        },
        tecnologias: [],
        cursos: [],
        experiencias: [],
        projetos: [],
        design: [],
        atividades: []
    };

    const state = {
        editing: {
            tech: null,
            course: null,
            experience: null,
            project: null,
            design: null,
            activity: null
        },
        courseFileCache: null,
        courseFileNameCache: ''
    };

    function safeParse(value, fallback) {
        if (!value) return JSON.parse(JSON.stringify(fallback));
        try {
            return JSON.parse(value);
        } catch (error) {
            return JSON.parse(JSON.stringify(fallback));
        }
    }

    function getStored(key, fallback) {
        return safeParse(localStorage.getItem(key), fallback);
    }

    function setStored(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // CODEX: Upload real de ficheiros para o servidor local
    async function uploadFileToServer(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Falha ao enviar ficheiro.');
        }
        return response.json();
    }

    async function uploadFilesToServer(files) {
        const uploads = [];
        for (const file of files) {
            // eslint-disable-next-line no-await-in-loop
            const result = await uploadFileToServer(file);
            uploads.push(result.url);
        }
        return uploads;
    }

    // CODEX: RemoÃ§Ã£o de ficheiros enviados
    function isUploadUrl(url) {
        return typeof url === 'string' && url.startsWith('/imagem/uploads/');
    }

    async function deleteFileFromServer(url) {
        if (!isUploadUrl(url)) return;
        try {
            await fetch('/api/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
        } catch (error) {
            // Ignorar erro para nÃ£o bloquear a exclusÃ£o no painel
        }
    }

    async function deleteManyFromServer(urls) {
        const items = (urls || []).filter(isUploadUrl);
        for (const url of items) {
            // eslint-disable-next-line no-await-in-loop
            await deleteFileFromServer(url);
        }
    }

    // CODEX: Envio de auditoria para o servidor
    async function auditLog(action, entity, payload) {
        try {
            await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, entity, payload })
            });
        } catch (error) {
            // Ignorar erro para nÃ£o bloquear aÃ§Ãµes do painel
        }
    }

    // CODEX: i18n dinÃ¢mico - gerar chave no servidor
    async function saveI18nText(text) {
        if (!text || !text.trim()) return null;
        try {
            const lang = localStorage.getItem('lang') === 'en' ? 'en' : 'pt';
            const response = await fetch('/api/i18n/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lang,
                    text: text.trim(),
                    autoTranslate: lang === 'pt'
                })
            });
            if (!response.ok) throw new Error('Falha ao salvar i18n.');
            const data = await response.json();
            return data.key || null;
        } catch (err) {
            console.warn("API de traduÃ§Ã£o indisponÃ­vel (Live Server). Salvando apenas o texto localmente:", text);
            return null; // Omit key and keep text raw.
        }
    }

    function wrapI18n(text, key) {
        if (!key) return text;
        return { text, i18nKey: key };
    }

    function unwrapI18n(value) {
        if (value && typeof value === 'object' && value.text) return value.text;
        return value || '';
    }

    function resolveI18nTextArray(items) {
        if (!Array.isArray(items)) return items;
        return items.map(item => unwrapI18n(item));
    }

    // CODEX: MigraÃ§Ã£o automÃ¡tica de textos existentes para i18n
    async function migrateI18nText(text, fixedKey) {
        if (!text || !text.trim()) return null;
        const response = await fetch('/api/i18n/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lang: 'pt',
                text: text.trim(),
                autoTranslate: true,
                forceKey: fixedKey || undefined
            })
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.key || null;
    }

    async function migrateArrayTexts(items, keyPrefix) {
        if (!Array.isArray(items)) return items;
        const results = [];
        for (let i = 0; i < items.length; i += 1) {
            const value = items[i];
            if (value && typeof value === 'object' && value.i18nKey) {
                results.push(value);
            } else {
                const key = keyPrefix ? `${keyPrefix}_${i + 1}` : undefined;
                // eslint-disable-next-line no-await-in-loop
                const i18nKey = await migrateI18nText(String(value || ''), key);
                results.push(wrapI18n(String(value || ''), i18nKey));
            }
        }
        return results;
    }

    async function migrateI18nStore() {
        const migrated = { personalInfo: false, cursos: false, experiencias: false, projetos: false, design: false };

        const personalInfo = getStored(STORAGE_KEYS.personalInfo, DEFAULTS.personalInfo);
        if (personalInfo) {
            if (!(personalInfo.titulo && personalInfo.titulo.i18nKey)) {
                const key = await migrateI18nText(unwrapI18n(personalInfo.titulo), 'profile_title');
                personalInfo.titulo = wrapI18n(unwrapI18n(personalInfo.titulo), key);
                migrated.personalInfo = true;
            }
            if (!(personalInfo.descricao && personalInfo.descricao.i18nKey)) {
                const key = await migrateI18nText(unwrapI18n(personalInfo.descricao), 'profile_description');
                personalInfo.descricao = wrapI18n(unwrapI18n(personalInfo.descricao), key);
                migrated.personalInfo = true;
            }
            setStored(STORAGE_KEYS.personalInfo, personalInfo);
        }

        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        if (Array.isArray(cursos)) {
            for (let i = 0; i < cursos.length; i += 1) {
                const curso = cursos[i];
                if (!(curso.name && curso.name.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(curso.name), `course_name_${i + 1}`);
                    curso.name = wrapI18n(unwrapI18n(curso.name), key);
                    migrated.cursos = true;
                }
                if (!(curso.description && curso.description.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(curso.description), `course_desc_${i + 1}`);
                    curso.description = wrapI18n(unwrapI18n(curso.description), key);
                    migrated.cursos = true;
                }
            }
            setStored(STORAGE_KEYS.cursos, cursos);
        }

        const experiencias = getStored(STORAGE_KEYS.experiencias, DEFAULTS.experiencias);
        if (Array.isArray(experiencias)) {
            for (let i = 0; i < experiencias.length; i += 1) {
                const exp = experiencias[i];
                if (!(exp.cargo && exp.cargo.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(exp.cargo), `exp_title_${i + 1}`);
                    exp.cargo = wrapI18n(unwrapI18n(exp.cargo), key);
                    migrated.experiencias = true;
                }
                if (exp.responsabilidades) {
                    exp.responsabilidades = await migrateArrayTexts(exp.responsabilidades, `exp_${i + 1}_r`);
                    migrated.experiencias = true;
                }
            }
            setStored(STORAGE_KEYS.experiencias, experiencias);
        }

        const projetos = getStored(STORAGE_KEYS.projetos, DEFAULTS.projetos);
        if (Array.isArray(projetos)) {
            for (let i = 0; i < projetos.length; i += 1) {
                const proj = projetos[i];
                if (!(proj.nome && proj.nome.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(proj.nome), `project_title_${i + 1}`);
                    proj.nome = wrapI18n(unwrapI18n(proj.nome), key);
                    migrated.projetos = true;
                }
                if (!(proj.descricao && proj.descricao.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(proj.descricao), `project_desc_${i + 1}`);
                    proj.descricao = wrapI18n(unwrapI18n(proj.descricao), key);
                    migrated.projetos = true;
                }
                if (!(proj.status && proj.status.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(proj.status), `project_status_${i + 1}`);
                    proj.status = wrapI18n(unwrapI18n(proj.status), key);
                    migrated.projetos = true;
                }
            }
            setStored(STORAGE_KEYS.projetos, projetos);
        }

        const design = getStored(STORAGE_KEYS.design, DEFAULTS.design);
        if (Array.isArray(design)) {
            for (let i = 0; i < design.length; i += 1) {
                const item = design[i];
                if (!(item.tipo && item.tipo.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(item.tipo), `design_type_${i + 1}`);
                    item.tipo = wrapI18n(unwrapI18n(item.tipo), key);
                    migrated.design = true;
                }
                if (!(item.descricao && item.descricao.i18nKey)) {
                    const key = await migrateI18nText(unwrapI18n(item.descricao), `design_desc_${i + 1}`);
                    item.descricao = wrapI18n(unwrapI18n(item.descricao), key);
                    migrated.design = true;
                }
                if (item.tags) {
                    item.tags = await migrateArrayTexts(item.tags, `design_${i + 1}_tag`);
                    migrated.design = true;
                }
            }
            setStored(STORAGE_KEYS.design, design);
        }

        if (migrated.personalInfo || migrated.cursos || migrated.experiencias || migrated.projetos || migrated.design) {
            await auditLog('edit', 'i18n_migration', migrated);
        }

        return migrated;
    }

    function showModal(id) {
        const modalEl = document.getElementById(id);
        if (!modalEl) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }

    function hideModal(id) {
        const modalEl = document.getElementById(id);
        if (!modalEl) return;
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    function initNavigation() {
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.section-content').forEach(section => {
                    section.classList.remove('active');
                });

                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    document.getElementById(sectionId).classList.add('active');
                }
            });
        });
    }

    function initLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (!logoutBtn) return;
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }

        // CODEX: FormulÃ¡rio de informaÃ§Ãµes pessoais
    function loadPersonalInfo() {
        const personalInfo = getStored(STORAGE_KEYS.personalInfo, DEFAULTS.personalInfo);

        const fields = [
            'nome', 'titulo', 'descricao', 'facebook', 'instagram', 'linkedin',
            'email', 'telefone', 'whatsapp', 'localizacao', 'cvLink', 'titulosRotativos',
            'profileImage'
        ];

        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) input.value = unwrapI18n(personalInfo[field]);
        });
    }

    function initPersonalInfoForm() {
        const form = document.getElementById('sobreForm');
        if (!form) return;
        const removeProfileBtn = document.getElementById('removeProfileImageBtn');
        const profileInput = document.getElementById('profileImage');
        const profileUpload = document.getElementById('profileImageUpload');

        if (removeProfileBtn) {
            removeProfileBtn.addEventListener('click', function () {
                if (profileInput) profileInput.value = 'imagem/default/perfil-default.jpg';
                if (profileUpload) profileUpload.value = '';
                form.dataset.profileRemove = '1'; // CODEX: marca remoÃ§Ã£o para o submit
            });
        }

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const previous = getStored(STORAGE_KEYS.personalInfo, DEFAULTS.personalInfo);
            const personalInfo = {};
            const fields = [
                'nome', 'titulo', 'descricao', 'facebook', 'instagram', 'linkedin',
                'email', 'telefone', 'whatsapp', 'localizacao', 'cvLink', 'titulosRotativos',
                'profileImage'
            ];
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input) personalInfo[field] = input.value.trim();
            });

            const profileFileInput = document.getElementById('profileImageUpload');
            const profileFile = profileFileInput && profileFileInput.files.length
                ? profileFileInput.files[0]
                : null;
            if (profileFile) {
                try {
                    const upload = await uploadFileToServer(profileFile);
                    if (previous && previous.profileImage && isUploadUrl(previous.profileImage)) {
                        await deleteFileFromServer(previous.profileImage);
                    }
                    personalInfo.profileImage = upload.url;
                } catch (error) {
                    alert('Erro ao enviar a imagem de perfil.');
                    return;
                }
            }
            // CODEX: fallback para imagem padrÃ£o quando vazio
            if (!personalInfo.profileImage) {
                if (previous && previous.profileImage && isUploadUrl(previous.profileImage)) {
                    await deleteFileFromServer(previous.profileImage);
                }
                personalInfo.profileImage = 'imagem/default/perfil-default.jpg';
            }
            // CODEX: remoÃ§Ã£o explÃ­cita via botÃ£o
            if (form.dataset.profileRemove === '1') {
                if (previous && previous.profileImage && isUploadUrl(previous.profileImage)) {
                    await deleteFileFromServer(previous.profileImage);
                }
                personalInfo.profileImage = 'imagem/default/perfil-default.jpg';
                delete form.dataset.profileRemove;
            }

            try {
                const tituloKey = await saveI18nText(personalInfo.titulo);
                const descricaoKey = await saveI18nText(personalInfo.descricao);
                personalInfo.titulo = wrapI18n(personalInfo.titulo, tituloKey);
                personalInfo.descricao = wrapI18n(personalInfo.descricao, descricaoKey);
            } catch (error) {
                alert('Erro ao salvar traduÃ§Ã£o. Tente novamente.');
                return;
            }
            setStored(STORAGE_KEYS.personalInfo, personalInfo);
            auditLog('edit', 'perfil', personalInfo);
            alert('InformaÃ§Ãµes salvas com sucesso!');
            if (profileFileInput) profileFileInput.value = ''; // CODEX: limpa o upload
        });
    }

    // CODEX: Tecnologias
    function renderTechnologiesList() {
        const list = document.getElementById('tecnologiasList');
        if (!list) return;

        const tecnologias = getStored(STORAGE_KEYS.tecnologias, DEFAULTS.tecnologias);
        list.innerHTML = '';

        if (tecnologias.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhuma tecnologia adicionada.</p>';
            return;
        }

        tecnologias.forEach((tech, index) => {
            const techItem = document.createElement('div');
            techItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
            techItem.innerHTML = `
                <div>
                    <h6 class="mb-0">${tech.name}</h6>
                    <small class="text-muted">${tech.category} - ${tech.level}% - ${tech.description || ''}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="edit-tech" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-tech" data-index="${index}">Excluir</button>
                </div>
            `;
            list.appendChild(techItem);
        });

        list.querySelectorAll('[data-action="edit-tech"]').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = Number(this.getAttribute('data-index'));
                editTechnology(index);
            });
        });

        list.querySelectorAll('[data-action="delete-tech"]').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = Number(this.getAttribute('data-index'));
                deleteTechnology(index);
            });
        });
    }

    function initTechForm() {
        const saveBtn = document.getElementById('saveTechBtn');
        if (!saveBtn) return;
        saveBtn.addEventListener('click', saveTechnology);
    }

    function saveTechnology() {
        const name = document.getElementById('techName').value.trim();
        const category = document.getElementById('techCategory').value;
        const level = document.getElementById('techLevel').value.trim();
        const description = document.getElementById('techDescription').value.trim();

        if (!name || !category || !level) {
            alert('Preencha todos os campos obrigatÃ³rios.');
            return;
        }

        const tecnologias = getStored(STORAGE_KEYS.tecnologias, DEFAULTS.tecnologias);

        const action = state.editing.tech !== null ? 'edit' : 'add';
        if (state.editing.tech !== null) {
            tecnologias[state.editing.tech] = { name, category, level, description };
        } else {
            tecnologias.push({ name, category, level, description });
        }

        setStored(STORAGE_KEYS.tecnologias, tecnologias);
        auditLog(action, 'tecnologia', { name, category, level, description });
        state.editing.tech = null;
        document.getElementById('addTechForm').reset();
        hideModal('addTechModal');
        renderTechnologiesList();
    }

    function editTechnology(index) {
        const tecnologias = getStored(STORAGE_KEYS.tecnologias, DEFAULTS.tecnologias);
        const tech = tecnologias[index];
        if (!tech) return;

        state.editing.tech = index;
        document.getElementById('techName').value = tech.name || '';
        document.getElementById('techCategory').value = tech.category || 'frontend';
        document.getElementById('techLevel').value = tech.level || '';
        document.getElementById('techDescription').value = tech.description || '';
        showModal('addTechModal');
    }

    function deleteTechnology(index) {
        if (!confirm('Tem certeza que deseja excluir esta tecnologia?')) return;
        const tecnologias = getStored(STORAGE_KEYS.tecnologias, DEFAULTS.tecnologias);
        const tech = tecnologias[index];
        tecnologias.splice(index, 1);
        setStored(STORAGE_KEYS.tecnologias, tecnologias);
        auditLog('delete', 'tecnologia', tech || {});
        renderTechnologiesList();
    }

    // CODEX: Cursos (com suporte a certificado em link ou ficheiro)
    function initCourseForm() {
        const saveBtn = document.getElementById('saveCourseBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveCourse);

        document.querySelectorAll('input[name="certificateType"]').forEach(radio => {
            radio.addEventListener('change', toggleCertificateFields);
        });

        const fileInput = document.getElementById('courseCertificateFile');
        if (fileInput) {
            fileInput.addEventListener('change', previewCourseFile);
        }
    }

    function toggleCertificateFields() {
        const linkField = document.getElementById('linkField');
        const fileField = document.getElementById('fileField');
        const type = document.querySelector('input[name="certificateType"]:checked').value;

        if (type === 'link') {
            linkField.style.display = 'block';
            fileField.style.display = 'none';
        } else {
            linkField.style.display = 'none';
            fileField.style.display = 'block';
        }
    }

    function previewCourseFile(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('filePreview');
        if (!preview) return;
        preview.innerHTML = '';

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('O ficheiro Ã© muito grande. MÃ¡ximo: 5MB.');
            e.target.value = '';
            return;
        }

        const validTypes = [
            'application/pdf',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!validTypes.includes(file.type)) {
            alert('Tipo de ficheiro nÃ£o suportado. Use PDF, JPG, PNG ou DOC.');
            e.target.value = '';
            return;
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                preview.innerHTML = `
                    <div class="border p-2 rounded">
                        <img src="${event.target.result}" class="img-thumbnail" style="max-height: 150px;">
                        <div class="mt-1">
                            <small class="text-muted">${file.name} (${(file.size / 1024).toFixed(2)} KB)</small>
                        </div>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `
                <div class="border p-2 rounded">
                    <i class="bi bi-file-earmark-text display-4 text-primary"></i>
                    <div class="mt-1">
                        <small class="text-muted">${file.name} (${(file.size / 1024).toFixed(2)} KB)</small>
                    </div>
                </div>
            `;
        }
    }

    async function saveCourse() {
        const name = document.getElementById('courseName').value.trim();
        const description = document.getElementById('courseDescription').value.trim();
        const year = document.getElementById('courseYear').value.trim();
        const institution = document.getElementById('courseInstitution').value.trim();
        const certificateType = document.querySelector('input[name="certificateType"]:checked').value;

        if (!name || !description) {
            alert('Preencha nome e descriÃ§Ã£o.');
            return;
        }

        let certificate = '';
        let certificateName = '';

        if (certificateType === 'link') {
            certificate = document.getElementById('courseCertificateLink').value.trim();
        } else {
            const fileInput = document.getElementById('courseCertificateFile');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                try {
                    const upload = await uploadFileToServer(file);
                    certificate = upload.url;
                    certificateName = upload.name || file.name;
                } catch (error) {
                    alert('Erro ao processar o ficheiro.');
                    return;
                }
            } else if (state.courseFileCache) {
                certificate = state.courseFileCache;
                certificateName = state.courseFileNameCache || '';
            } else {
                alert('Selecione um ficheiro de certificado.');
                return;
            }
        }

        let nameKey = null;
        let descriptionKey = null;
        try {
            nameKey = await saveI18nText(name);
            descriptionKey = await saveI18nText(description);
        } catch (error) {
            alert('Erro ao salvar traduÃ§Ã£o do curso.');
            return;
        }

        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        const curso = {
            name: wrapI18n(name, nameKey),
            description: wrapI18n(description, descriptionKey),
            year,
            institution,
            certificate,
            certificateType,
            certificateName
        };

        const action = state.editing.course !== null ? 'edit' : 'add';
        if (state.editing.course !== null) {
            cursos[state.editing.course] = curso;
        } else {
            cursos.push(curso);
        }

        setStored(STORAGE_KEYS.cursos, cursos);
        auditLog(action, 'curso', {
            name,
            year,
            institution,
            certificateType,
            certificate
        });
        state.editing.course = null;
        state.courseFileCache = null;
        state.courseFileNameCache = '';
        resetCourseForm();
        hideModal('addCourseModal');
        renderCoursesList();
    }

    function resetCourseForm() {
        document.getElementById('addCourseForm').reset();
        document.getElementById('linkField').style.display = 'block';
        document.getElementById('fileField').style.display = 'none';
        document.getElementById('certificateLink').checked = true;
        const preview = document.getElementById('filePreview');
        if (preview) preview.innerHTML = '';
    }

    function renderCoursesList() {
        const list = document.getElementById('cursosList');
        if (!list) return;

        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        list.innerHTML = '';

        if (cursos.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhum curso adicionado.</p>';
            return;
        }

        cursos.forEach((curso, index) => {
            const certificateIcon = curso.certificateType === 'file' ? 'bi bi-file-earmark' : 'bi bi-link-45deg';
            const certificateText = curso.certificateType === 'file' ? 'Ficheiro local' : 'Link externo';

            const cursoItem = document.createElement('div');
            const courseName = unwrapI18n(curso.name);
            const courseDesc = unwrapI18n(curso.description);
            cursoItem.className = 'd-flex justify-content-between align-items-center p-3 border-bottom';
            cursoItem.innerHTML = `
                <div class="flex-grow-1">
                    <h6 class="mb-1">${courseName}</h6>
                    <small class="text-muted d-block">${courseDesc.substring(0, 100)}${courseDesc.length > 100 ? '...' : ''}</small>
                    <div class="mt-1">
                        <small class="text-muted">
                            <i class="bi bi-calendar"></i> ${curso.year || '-'} 
                            ${curso.institution ? `â€¢ <i class="bi bi-building"></i> ${curso.institution}` : ''}
                            â€¢ <i class="${certificateIcon}"></i> ${certificateText}
                        </small>
                    </div>
                </div>
                <div class="ms-3">
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="view-course" data-index="${index}" title="Ver detalhes">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary me-1" data-action="edit-course" data-index="${index}" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-course" data-index="${index}" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            list.appendChild(cursoItem);
        });

        list.querySelectorAll('[data-action="view-course"]').forEach(btn => {
            btn.addEventListener('click', function () {
                viewCourse(Number(this.getAttribute('data-index')));
            });
        });
        list.querySelectorAll('[data-action="edit-course"]').forEach(btn => {
            btn.addEventListener('click', function () {
                editCourse(Number(this.getAttribute('data-index')));
            });
        });
        list.querySelectorAll('[data-action="delete-course"]').forEach(btn => {
            btn.addEventListener('click', function () {
                deleteCourse(Number(this.getAttribute('data-index')));
            });
        });
    }

    function viewCourse(index) {
        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        const curso = cursos[index];
        if (!curso) return;

        let certificateContent = '';
        if (curso.certificateType === 'link') {
            certificateContent = `<a href="${curso.certificate}" target="_blank" class="btn btn-sm btn-outline-primary">Abrir Certificado</a>`;
        } else {
            certificateContent = `
                <a href="${curso.certificate}" target="_blank" class="btn btn-sm btn-outline-primary download-file" data-index="${index}">
                    <i class="bi bi-download"></i> Download do Certificado
                </a>
            `;
        }

        const modalHTML = `
            <div class="modal fade" id="viewCourseModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${curso.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <p><strong>DescriÃ§Ã£o:</strong></p>
                                    <p>${curso.description}</p>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <p><strong>Ano:</strong> ${curso.year || '-'}</p>
                                        </div>
                                        ${curso.institution ? `
                                        <div class="col-md-6">
                                            <p><strong>InstituiÃ§Ã£o:</strong> ${curso.institution}</p>
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <i class="bi bi-award display-4 text-warning"></i>
                                            <h6 class="mt-2">Certificado</h6>
                                            ${certificateContent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary edit-course-from-view" data-index="${index}">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const existingModal = document.getElementById('viewCourseModal');
        if (existingModal) existingModal.remove();
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        showModal('viewCourseModal');

        // CODEX: Link de download jÃ¡ aponta para o ficheiro

        const editFromView = document.querySelector('.edit-course-from-view');
        if (editFromView) {
            editFromView.addEventListener('click', function () {
                hideModal('viewCourseModal');
                editCourse(Number(this.getAttribute('data-index')));
            });
        }
    }

    function editCourse(index) {
        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        const curso = cursos[index];
        if (!curso) return;

        state.editing.course = index;
        state.courseFileCache = curso.certificate || null;
        state.courseFileNameCache = curso.certificateName || '';

        document.getElementById('courseName').value = unwrapI18n(curso.name);
        document.getElementById('courseDescription').value = unwrapI18n(curso.description);
        document.getElementById('courseYear').value = curso.year || '';
        document.getElementById('courseInstitution').value = curso.institution || '';

        if (curso.certificateType === 'file') {
            document.getElementById('certificateFile').checked = true;
            toggleCertificateFields();
            const preview = document.getElementById('filePreview');
            if (preview && state.courseFileNameCache) {
                preview.innerHTML = `
                    <div class="border p-2 rounded">
                        <i class="bi bi-file-earmark-text display-4 text-primary"></i>
                        <div class="mt-1">
                            <small class="text-muted">${state.courseFileNameCache}</small>
                        </div>
                    </div>
                `;
            }
        } else {
            document.getElementById('certificateLink').checked = true;
            toggleCertificateFields();
            document.getElementById('courseCertificateLink').value = curso.certificate || '';
        }

        showModal('addCourseModal');
    }

    async function deleteCourse(index) {
        if (!confirm('Tem certeza que deseja excluir este curso?')) return;
        const cursos = getStored(STORAGE_KEYS.cursos, DEFAULTS.cursos);
        const curso = cursos[index];
        if (curso && curso.certificateType === 'file') {
            await deleteFileFromServer(curso.certificate);
        }
        cursos.splice(index, 1);
        setStored(STORAGE_KEYS.cursos, cursos);
        auditLog('delete', 'curso', curso || {});
        renderCoursesList();
    }

    // CODEX: ExperiÃªncias
    // CODEX: Ordena experiÃªncias por perÃ­odo (mais recente no topo)
    function sortExperiencesByPeriodo(items) {
        if (!Array.isArray(items)) return [];
        const parsePeriodo = (periodo) => {
            const text = (periodo || '').toString();
            const numbers = text.match(/\d{4}/g) || [];
            const start = numbers.length > 0 ? Number(numbers[0]) : 0;
            const end = numbers.length > 1 ? Number(numbers[1]) : start;
            const isCurrent = /presente|present|atual/i.test(text);
            return { start, end: isCurrent ? 9999 : end, isCurrent };
        };
        return items.slice().sort((a, b) => {
            const pa = parsePeriodo(a.periodo);
            const pb = parsePeriodo(b.periodo);
            if (pa.end !== pb.end) return pb.end - pa.end;
            if (pa.start !== pb.start) return pb.start - pa.start;
            if (pa.isCurrent !== pb.isCurrent) return pa.isCurrent ? -1 : 1;
            return 0;
        });
    }

    function initExperienceForm() {
        const saveBtn = document.getElementById('saveExperienceBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveExperience);
    }

    function renderExperiencesList() {
        const list = document.getElementById('experienciasList');
        if (!list) return;
        const stored = getStored(STORAGE_KEYS.experiencias, DEFAULTS.experiencias);
        const experiencias = sortExperiencesByPeriodo(stored);
        // CODEX: garante ordenaÃ§Ã£o por data no armazenamento
        setStored(STORAGE_KEYS.experiencias, experiencias);
        list.innerHTML = '';

        if (experiencias.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhuma experiÃªncia adicionada.</p>';
            return;
        }

        experiencias.forEach((exp, index) => {
            const expItem = document.createElement('div');
            expItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
            const cargoText = unwrapI18n(exp.cargo);
            expItem.innerHTML = `
                <div>
                    <h6 class="mb-0">${cargoText} - ${exp.empresa}</h6>
                    <small class="text-muted">${exp.periodo} â€¢ ${exp.localizacao}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="edit-experience" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-experience" data-index="${index}">Excluir</button>
                </div>
            `;
            list.appendChild(expItem);
        });

        list.querySelectorAll('[data-action="edit-experience"]').forEach(btn => {
            btn.addEventListener('click', function () {
                editExperience(Number(this.getAttribute('data-index')));
            });
        });
        list.querySelectorAll('[data-action="delete-experience"]').forEach(btn => {
            btn.addEventListener('click', function () {
                deleteExperience(Number(this.getAttribute('data-index')));
            });
        });
    }

    async function saveExperience() {
        const periodo = document.getElementById('experiencePeriod').value.trim();
        const cargo = document.getElementById('experiencePosition').value.trim();
        const empresa = document.getElementById('experienceCompany').value.trim();
        const localizacao = document.getElementById('experienceLocation').value.trim();
        const logoTexto = document.getElementById('experienceLogo').value.trim();
        const responsabilidades = document.getElementById('experienceResponsibilities').value
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);
        const imagensTexto = document.getElementById('experienceImages').value
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);
        const legendasTexto = (document.getElementById('experienceLegends')?.value || "")
            .split('\n')
            .map(item => item.trim());

        if (!periodo || !cargo || !empresa || !localizacao || responsabilidades.length === 0) {
            alert('Preencha os campos obrigatÃ³rios da experiÃªncia.');
            return;
        }

        let cargoKey = null;
        let responsabilidadesWrapped = [];
        try {
            cargoKey = await saveI18nText(cargo);
            const respKeys = await Promise.all(
                responsabilidades.map(item => saveI18nText(item))
            );
            responsabilidadesWrapped = responsabilidades.map((item, idx) => wrapI18n(item, respKeys[idx]));
        } catch (error) {
            alert('Erro ao salvar traduÃ§Ã£o da experiÃªncia.');
            return;
        }

        const experiencias = getStored(STORAGE_KEYS.experiencias, DEFAULTS.experiencias);
        const exp = {
            periodo,
            cargo: wrapI18n(cargo, cargoKey),
            empresa,
            localizacao,
            responsabilidades: responsabilidadesWrapped,
            logo: logoTexto,
            imagens: imagensTexto,
            legendas: legendasTexto
        };

        const fileInput = document.getElementById('experienceImagesUpload');
        const files = fileInput ? Array.from(fileInput.files || []) : [];
        const logoInput = document.getElementById('experienceLogoUpload');
        const logoFile = logoInput && logoInput.files.length ? logoInput.files[0] : null;

        const finalizeSave = (uploadedUrls = [], logoUrl = null) => {
            exp.imagens = [...imagensTexto, ...uploadedUrls];
            exp.logo = logoUrl || exp.logo;

            const action = state.editing.experience !== null ? 'edit' : 'add';
            if (state.editing.experience !== null) {
                experiencias[state.editing.experience] = exp;
            } else {
                experiencias.push(exp);
            }

            // CODEX: ordenar por data antes de salvar
            const ordered = sortExperiencesByPeriodo(experiencias);
            setStored(STORAGE_KEYS.experiencias, ordered);
            auditLog(action, 'experiencia', {
                cargo,
                empresa,
                periodo,
                localizacao,
                imagens: exp.imagens,
                legendas: exp.legendas,
                logo: exp.logo
            });
            state.editing.experience = null;
            document.getElementById('addExperienceForm').reset();
            if (fileInput) fileInput.value = '';
            if (logoInput) logoInput.value = '';
            const legendsInput = document.getElementById('experienceLegends');
            if (legendsInput) legendsInput.value = '';
            hideModal('addExperienceModal');
            renderExperiencesList();
        };

        try {
            let uploadedImages = [];
            if (files.length > 0) {
                uploadedImages = await uploadFilesToServer(files);
            }
            let uploadedLogo = null;
            if (logoFile) {
                const upload = await uploadFileToServer(logoFile);
                uploadedLogo = upload.url;
            }
            finalizeSave(uploadedImages, uploadedLogo);
        } catch (error) {
            alert('Erro ao enviar imagens da experiÃªncia.');
        }
    }

    function editExperience(index) {
        const experiencias = getStored(STORAGE_KEYS.experiencias, DEFAULTS.experiencias);
        const exp = experiencias[index];
        if (!exp) return;

        state.editing.experience = index;
        document.getElementById('experiencePeriod').value = exp.periodo || '';
        document.getElementById('experiencePosition').value = unwrapI18n(exp.cargo);
        document.getElementById('experienceCompany').value = exp.empresa || '';
        document.getElementById('experienceLocation').value = exp.localizacao || '';
        document.getElementById('experienceLogo').value = exp.logo || '';
        document.getElementById('experienceResponsibilities').value = (resolveI18nTextArray(exp.responsabilidades) || []).join('\n');
        document.getElementById('experienceImages').value = (exp.imagens || []).join('\n');
        
        const legendsInput = document.getElementById('experienceLegends');
        if (legendsInput) legendsInput.value = (exp.legendas || []).join('\n');
        
        const fileInput = document.getElementById('experienceImagesUpload');
        if (fileInput) fileInput.value = '';
        const logoInput = document.getElementById('experienceLogoUpload');
        if (logoInput) logoInput.value = '';
        showModal('addExperienceModal');
    }

    async function deleteExperience(index) {
        if (!confirm('Tem certeza que deseja excluir esta experiÃªncia?')) return;
        const experiencias = getStored(STORAGE_KEYS.experiencias, DEFAULTS.experiencias);
        const exp = experiencias[index];
        if (exp && exp.imagens && exp.imagens.length) {
            await deleteManyFromServer(exp.imagens);
        }
        if (exp && exp.logo) {
            await deleteFileFromServer(exp.logo);
        }
        experiencias.splice(index, 1);
        setStored(STORAGE_KEYS.experiencias, experiencias);
        auditLog('delete', 'experiencia', exp || {});
        renderExperiencesList();
    }

    // CODEX: Projetos
    function initProjectForm() {
        const saveBtn = document.getElementById('saveProjectBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveProject);
    }

    function renderProjectsList() {
        const list = document.getElementById('projetosList');
        if (!list) return;
        const projetos = getStored(STORAGE_KEYS.projetos, DEFAULTS.projetos);
        list.innerHTML = '';

        if (projetos.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhum projeto adicionado.</p>';
            return;
        }

        projetos.forEach((proj, index) => {
            const projItem = document.createElement('div');
            const projName = unwrapI18n(proj.nome);
            const projStatus = unwrapI18n(proj.status);
            projItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
            projItem.innerHTML = `
                <div>
                    <h6 class="mb-0">${projName}</h6>
                    <small class="text-muted">${projStatus || ''}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="edit-project" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-project" data-index="${index}">Excluir</button>
                </div>
            `;
            list.appendChild(projItem);
        });

        list.querySelectorAll('[data-action="edit-project"]').forEach(btn => {
            btn.addEventListener('click', function () {
                editProject(Number(this.getAttribute('data-index')));
            });
        });
        list.querySelectorAll('[data-action="delete-project"]').forEach(btn => {
            btn.addEventListener('click', function () {
                deleteProject(Number(this.getAttribute('data-index')));
            });
        });
    }

    async function saveProject() {
        const nome = document.getElementById('projectName').value.trim();
        const descricao = document.getElementById('projectDescription').value.trim();
        const imagemTexto = document.getElementById('projectImage').value.trim();
        const link = document.getElementById('projectLink').value.trim();
        const status = document.getElementById('projectStatus').value.trim();

        if (!nome || !descricao || (!imagemTexto && !document.getElementById('projectImageUpload').files.length) || !status) {
            alert('Preencha os campos obrigatÃ³rios do projeto.');
            return;
        }

        let nomeKey = null;
        let descricaoKey = null;
        let statusKey = null;
        try {
            nomeKey = await saveI18nText(nome);
            descricaoKey = await saveI18nText(descricao);
            statusKey = await saveI18nText(status);
        } catch (error) {
            alert('Erro ao salvar traduÃ§Ã£o do projeto.');
            return;
        }

        const projetos = getStored(STORAGE_KEYS.projetos, DEFAULTS.projetos);
        const proj = {
            nome: wrapI18n(nome, nomeKey),
            descricao: wrapI18n(descricao, descricaoKey),
            imagem: imagemTexto,
            link: link || '#',
            status: wrapI18n(status, statusKey)
        };

        const fileInput = document.getElementById('projectImageUpload');
        const file = fileInput && fileInput.files.length ? fileInput.files[0] : null;

        const finalizeSave = (finalImage) => {
            proj.imagem = finalImage || proj.imagem;
        const action = state.editing.project !== null ? 'edit' : 'add';
        if (state.editing.project !== null) {
            projetos[state.editing.project] = proj;
        } else {
            projetos.push(proj);
        }

        setStored(STORAGE_KEYS.projetos, projetos);
        auditLog(action, 'projeto', {
            nome,
            status,
            imagem: proj.imagem,
            link: proj.link
        });
        state.editing.project = null;
        document.getElementById('addProjectForm').reset();
        hideModal('addProjectModal');
        renderProjectsList();
    };

        if (file) {
            try {
                const upload = await uploadFileToServer(file);
                finalizeSave(upload.url);
            } catch (error) {
                alert('Erro ao enviar a imagem do projeto.');
            }
        } else {
            finalizeSave(proj.imagem);
        }
    }

    function editProject(index) {
        const projetos = getStored(STORAGE_KEYS.projetos, DEFAULTS.projetos);
        const proj = projetos[index];
        if (!proj) return;

        state.editing.project = index;
        document.getElementById('projectName').value = unwrapI18n(proj.nome);
        document.getElementById('projectDescription').value = unwrapI18n(proj.descricao);
        document.getElementById('projectImage').value = proj.imagem || '';
        document.getElementById('projectLink').value = proj.link || '';
        document.getElementById('projectStatus').value = unwrapI18n(proj.status);
        const fileInput = document.getElementById('projectImageUpload');
        if (fileInput) fileInput.value = '';
        showModal('addProjectModal');
    }

    async function deleteProject(index) {
        if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
        const projetos = getStored(STORAGE_KEYS.projetos, DEFAULTS.projetos);
        const proj = projetos[index];
        if (proj && proj.imagem) {
            await deleteFileFromServer(proj.imagem);
        }
        projetos.splice(index, 1);
        setStored(STORAGE_KEYS.projetos, projetos);
        auditLog('delete', 'projeto', proj || {});
        renderProjectsList();
    }

    // CODEX: Projetos de design
    function initDesignForm() {
        const saveBtn = document.getElementById('saveDesignBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveDesign);
    }

    function renderDesignList() {
        const list = document.getElementById('designList');
        if (!list) return;
        const design = getStored(STORAGE_KEYS.design, DEFAULTS.design);
        list.innerHTML = '';

        if (design.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhum projeto de design adicionado.</p>';
            return;
        }

        design.forEach((item, index) => {
            const desItem = document.createElement('div');
            const designName = unwrapI18n(item.nome);
            const designType = unwrapI18n(item.tipo);
            desItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
            desItem.innerHTML = `
                <div>
                    <h6 class="mb-0">${designName}</h6>
                    <small class="text-muted">${designType} â€¢ ${item.ano}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="edit-design" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-design" data-index="${index}">Excluir</button>
                </div>
            `;
            list.appendChild(desItem);
        });

        list.querySelectorAll('[data-action="edit-design"]').forEach(btn => {
            btn.addEventListener('click', function () {
                editDesign(Number(this.getAttribute('data-index')));
            });
        });
        list.querySelectorAll('[data-action="delete-design"]').forEach(btn => {
            btn.addEventListener('click', function () {
                deleteDesign(Number(this.getAttribute('data-index')));
            });
        });
    }

    async function saveDesign() {
        const nome = document.getElementById('designName').value.trim();
        const tipo = document.getElementById('designType').value.trim();
        const descricao = document.getElementById('designDescription').value.trim();
        const ano = document.getElementById('designYear').value.trim();
        const tags = document.getElementById('designTags').value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        const imagensTexto = document.getElementById('designImages').value
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);

        if (!nome || !tipo || !descricao || !ano) {
            alert('Preencha os campos obrigatÃ³rios do projeto de design.');
            return;
        }

        let tipoKey = null;
        let descricaoKey = null;
        let tagsWrapped = [];
        try {
            tipoKey = await saveI18nText(tipo);
            descricaoKey = await saveI18nText(descricao);
            const tagKeys = await Promise.all(tags.map(tag => saveI18nText(tag)));
            tagsWrapped = tags.map((tag, idx) => wrapI18n(tag, tagKeys[idx]));
        } catch (error) {
            alert('Erro ao salvar traduÃ§Ã£o do design.');
            return;
        }

        const design = getStored(STORAGE_KEYS.design, DEFAULTS.design);
        const item = {
            nome,
            tipo: wrapI18n(tipo, tipoKey),
            descricao: wrapI18n(descricao, descricaoKey),
            ano,
            tags: tagsWrapped,
            imagens: imagensTexto
        };

        const fileInput = document.getElementById('designImagesUpload');
        const files = fileInput ? Array.from(fileInput.files || []) : [];

        const finalizeSave = (uploadedUrls = []) => {
            item.imagens = [...imagensTexto, ...uploadedUrls];

        const action = state.editing.design !== null ? 'edit' : 'add';
        if (state.editing.design !== null) {
            design[state.editing.design] = item;
        } else {
            design.push(item);
        }

        setStored(STORAGE_KEYS.design, design);
        auditLog(action, 'design', {
            nome,
            tipo,
            ano,
            imagens: item.imagens
        });
        state.editing.design = null;
        document.getElementById('addDesignForm').reset();
        if (fileInput) fileInput.value = '';
            hideModal('addDesignModal');
            renderDesignList();
        };

        if (files.length > 0) {
            uploadFilesToServer(files)
                .then(finalizeSave)
                .catch(() => alert('Erro ao enviar imagens do projeto de design.'));
        } else {
            finalizeSave([]);
        }
    }

    function editDesign(index) {
        const design = getStored(STORAGE_KEYS.design, DEFAULTS.design);
        const item = design[index];
        if (!item) return;

        state.editing.design = index;
        document.getElementById('designName').value = item.nome || '';
        document.getElementById('designType').value = unwrapI18n(item.tipo);
        document.getElementById('designDescription').value = unwrapI18n(item.descricao);
        document.getElementById('designYear').value = item.ano || '';
        document.getElementById('designTags').value = (resolveI18nTextArray(item.tags) || []).join(', ');
        document.getElementById('designImages').value = (item.imagens || []).join('\n');
        const fileInput = document.getElementById('designImagesUpload');
        if (fileInput) fileInput.value = '';
        showModal('addDesignModal');
    }

    async function deleteDesign(index) {
        if (!confirm('Tem certeza que deseja excluir este projeto de design?')) return;
        const design = getStored(STORAGE_KEYS.design, DEFAULTS.design);
        const item = design[index];
        if (item && item.imagens && item.imagens.length) {
            await deleteManyFromServer(item.imagens);
        }
        design.splice(index, 1);
        setStored(STORAGE_KEYS.design, design);
        auditLog('delete', 'design', item || {});
        renderDesignList();
    }

    // CODEX: Atividades
    function initActivityForm() {
        const saveBtn = document.getElementById('saveActivityBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveActivity);
    }

    async function saveActivity() {
        const date = document.getElementById('activityDate').value.trim();
        const title = document.getElementById('activityTitle').value.trim();
        const description = document.getElementById('activityDescription').value.trim();
        const fileInput = document.getElementById('activityImageUpload');

        if (!date || !title || !description) {
            alert('Preencha os campos obrigatÃ³rios.');
            return;
        }

        let image = '';
        if (fileInput && fileInput.files.length > 0) {
            try {
                const upload = await uploadFileToServer(fileInput.files[0]);
                image = upload.url;
            } catch (error) {
                alert('Erro ao enviar imagem da atividade.');
                return;
            }
        } else if (state.editing.activity !== null) {
            const atividades = getStored(STORAGE_KEYS.atividades, DEFAULTS.atividades);
            image = atividades[state.editing.activity]?.image || '';
        }

        let titleKey = null;
        let descKey = null;
        try {
            titleKey = await saveI18nText(title);
            descKey = await saveI18nText(description);
        } catch (error) {
            alert('Erro ao salvar traduÃ§Ã£o da atividade.');
            return;
        }

        const atividades = getStored(STORAGE_KEYS.atividades, DEFAULTS.atividades);
        const action = state.editing.activity !== null ? 'edit' : 'add';
        const activity = {
            date,
            title: wrapI18n(title, titleKey),
            description: wrapI18n(description, descKey),
            image
        };

        if (state.editing.activity !== null) {
            atividades[state.editing.activity] = activity;
        } else {
            atividades.push(activity);
        }

        setStored(STORAGE_KEYS.atividades, atividades);
        auditLog(action, 'atividade', { title, date });
        
        state.editing.activity = null;
        document.getElementById('addActivityForm').reset();
        hideModal('addActivityModal');
        if (fileInput) fileInput.value = '';
        renderActivitiesList();
    }

    function renderActivitiesList() {
        const list = document.getElementById('atividadesList');
        if (!list) return;

        const atividades = getStored(STORAGE_KEYS.atividades, DEFAULTS.atividades);
        list.innerHTML = '';

        if (atividades.length === 0) {
            list.innerHTML = '<p class="text-muted text-center">Nenhuma atividade adicionada.</p>';
            return;
        }

        atividades.forEach((act, index) => {
            const activityItem = document.createElement('div');
            const titler = unwrapI18n(act.title);
            activityItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
            activityItem.innerHTML = `
                <div>
                    <h6 class="mb-0">${titler}</h6>
                    <small class="text-muted">${act.date}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1" data-action="edit-act" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" data-action="delete-act" data-index="${index}">Excluir</button>
                </div>
            `;
            list.appendChild(activityItem);
        });

        list.querySelectorAll('[data-action="edit-act"]').forEach(btn => {
            btn.addEventListener('click', function () {
                editActivity(Number(this.getAttribute('data-index')));
            });
        });

        list.querySelectorAll('[data-action="delete-act"]').forEach(btn => {
            btn.addEventListener('click', function () {
                deleteActivity(Number(this.getAttribute('data-index')));
            });
        });
    }

    function editActivity(index) {
        const atividades = getStored(STORAGE_KEYS.atividades, DEFAULTS.atividades);
        const act = atividades[index];
        if (!act) return;

        state.editing.activity = index;
        document.getElementById('activityDate').value = act.date || '';
        document.getElementById('activityTitle').value = unwrapI18n(act.title);
        document.getElementById('activityDescription').value = unwrapI18n(act.description);
        
        const fileInput = document.getElementById('activityImageUpload');
        if (fileInput) fileInput.value = '';
        
        showModal('addActivityModal');
    }

    async function deleteActivity(index) {
        if (!confirm('Tem certeza que deseja excluir esta atividade?')) return;
        const atividades = getStored(STORAGE_KEYS.atividades, DEFAULTS.atividades);
        const act = atividades[index];
        
        if (act && act.image && isUploadUrl(act.image)) {
            await deleteFileFromServer(act.image);
        }

        atividades.splice(index, 1);
        setStored(STORAGE_KEYS.atividades, atividades);
        auditLog('delete', 'atividade', act || {});
        renderActivitiesList();
    }

    function loadAllData() {
        loadPersonalInfo();
        renderTechnologiesList();
        renderCoursesList();
        renderExperiencesList();
        renderProjectsList();
        renderDesignList();
        renderActivitiesList();
        renderAuditHistory();
    }

    // CODEX: HistÃ³rico de auditoria
    async function renderAuditHistory() {
        const list = document.getElementById('auditList');
        if (!list) return;
        const limit = Number(document.getElementById('auditLimit')?.value || 100);
        const activeFilters = Array.from(document.querySelectorAll('.audit-filter:checked'))
            .map(input => input.value);
        saveAuditPreferences(activeFilters, limit);
        list.innerHTML = '<div class="text-muted">Carregando...</div>';
        try {
            const response = await fetch(`/api/audit/history?limit=${limit}`);
            if (!response.ok) throw new Error('Falha ao carregar histÃ³rico.');
            const data = await response.json();
            let items = data.items || [];
            if (activeFilters.length > 0) {
                items = items.filter(item => activeFilters.includes(item.action));
            } else {
                items = [];
            }

            if (items.length === 0) {
                list.innerHTML = '<div class="text-muted">Sem registros ainda.</div>';
                return;
            }

            list.innerHTML = '';
            items.slice().reverse().forEach(item => {
                const actionClass = getAuditActionClass(item.action);
                const entry = document.createElement('div');
                entry.className = `list-group-item ${actionClass}`;
                entry.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <strong>${item.action}</strong>
                        <small class="text-muted">${item.ts}</small>
                    </div>
                    <div><span class="badge bg-secondary">${item.entity}</span></div>
                    <pre class="mt-2 mb-0" style="white-space: pre-wrap;">${JSON.stringify(item.payload || {}, null, 2)}</pre>
                `;
                list.appendChild(entry);
            });
        } catch (error) {
            list.innerHTML = '<div class="text-danger">Erro ao carregar histÃ³rico.</div>';
        }
    }

    // CODEX: PreferÃªncias de auditoria no localStorage
    function saveAuditPreferences(filters, limit) {
        const data = {
            filters: Array.isArray(filters) ? filters : [],
            limit: Number(limit) || 100
        };
        localStorage.setItem('auditPreferences', JSON.stringify(data));
    }

    function loadAuditPreferences() {
        try {
            const raw = localStorage.getItem('auditPreferences');
            if (!raw) return;
            const data = JSON.parse(raw);
            if (Array.isArray(data.filters)) {
                document.querySelectorAll('.audit-filter').forEach(filter => {
                    filter.checked = data.filters.includes(filter.value);
                });
            }
            if (data.limit) {
                const limitSelect = document.getElementById('auditLimit');
                if (limitSelect) limitSelect.value = String(data.limit);
            }
        } catch (error) {
            // Ignorar erro de leitura
        }
    }

    // CODEX: Estilos por tipo de aÃ§Ã£o
    function getAuditActionClass(action) {
        switch (action) {
            case 'add':
                return 'audit-action-add';
            case 'edit':
                return 'audit-action-edit';
            case 'delete':
                return 'audit-action-delete';
            case 'upload':
                return 'audit-action-upload';
            default:
                return '';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        // CODEX: Garantir dados sincronizados ANTES de qualquer ediÃ§Ã£o no painel
        if (window.initDatabase) window.initDatabase();

        initNavigation();
        initLogout();
        initPersonalInfoForm();
        initTechForm();
        initCourseForm();
        initExperienceForm();
        initProjectForm();
        initDesignForm();
        initActivityForm();
        loadAuditPreferences();
        loadAllData();

        const migrationBtn = document.getElementById('runI18nMigration');
        if (migrationBtn) {
            migrationBtn.addEventListener('click', async () => {
                const status = document.getElementById('migrationStatus');
                if (status) status.textContent = 'Executando migraÃ§Ã£o...';
                migrationBtn.disabled = true;
                const result = await migrateI18nStore();
                if (status) status.textContent = `MigraÃ§Ã£o concluÃ­da: ${JSON.stringify(result)}`;
                migrationBtn.disabled = false;
                loadAllData();
            });
        }

        const refreshBtn = document.getElementById('refreshAuditBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', renderAuditHistory);
        }
        const limitSelect = document.getElementById('auditLimit');
        if (limitSelect) {
            limitSelect.addEventListener('change', renderAuditHistory);
        }
        document.querySelectorAll('.audit-filter').forEach(filter => {
            filter.addEventListener('change', renderAuditHistory);
        });
    });
})();

// =============================================================================
// CODEX: Sincronizacao GitHub - publica js/reusable-sync-logic.js e js/data.js
// O GitHub Token deve ser guardado APENAS no localStorage do admin (nunca hardcoded)
// =============================================================================
async function syncToGitHub() {
    const token = localStorage.getItem('github_token');
    const repo = localStorage.getItem('github_repo');

    if (!token || !repo) {
        alert('Configure o GitHub Token e o Repositório no painel antes de sincronizar.\n\nVá a: Configurações → Sincronização GitHub');
        return;
    }

    const lastUpdated = Date.now();
    const snapshot = window.PortfolioSync && typeof window.PortfolioSync.readStoredSnapshot === 'function'
        ? window.PortfolioSync.readStoredSnapshot()
        : {
            profile: JSON.parse(localStorage.getItem('personalInfo') || 'null'),
            tecnologias: JSON.parse(localStorage.getItem('tecnologias') || 'null'),
            cursos: JSON.parse(localStorage.getItem('cursos') || 'null'),
            experiencias: JSON.parse(localStorage.getItem('experiencias') || 'null'),
            projetos: JSON.parse(localStorage.getItem('projetos') || 'null'),
            design: JSON.parse(localStorage.getItem('design') || 'null'),
            atividades: JSON.parse(localStorage.getItem('atividades') || 'null')
        };

    const defaultData = {
        profile: snapshot.profile,
        tecnologias: snapshot.tecnologias,
        cursos: snapshot.cursos,
        experiencias: snapshot.experiencias,
        projetos: snapshot.projetos,
        design: snapshot.design,
        atividades: snapshot.atividades,
        lastUpdated
    };

    const filesToSync = [];

    const dataJsContent = window.PortfolioSync && typeof window.PortfolioSync.buildDataJsContent === 'function'
        ? window.PortfolioSync.buildDataJsContent(defaultData)
        : `// js/data.js
// CODEX: Single Source of Truth - snapshot gerado pelo painel admin

const defaultData = ${JSON.stringify(defaultData, null, 2)};

window.defaultData = defaultData;
window.initDatabase = function () {
  if (!window.PortfolioSync || typeof window.PortfolioSync.initDatabase !== 'function') return false;
  return window.PortfolioSync.initDatabase(defaultData);
};
window.initDatabase();
`;

    filesToSync.push({
        path: 'js/reusable-sync-logic.js',
        message: `sync: actualizar reusable-sync-logic.js [${new Date(lastUpdated).toISOString()}]`,
        content: null
    });
    filesToSync.push({
        path: 'js/data.js',
        message: `sync: actualizar data.js [${new Date(lastUpdated).toISOString()}]`,
        content: dataJsContent
    });

    try {
        const reusableResponse = await fetch('/js/reusable-sync-logic.js', { cache: 'no-store' });
        if (!reusableResponse.ok) {
            throw new Error('Não foi possível ler js/reusable-sync-logic.js.');
        }
        filesToSync[0].content = await reusableResponse.text();

        for (const file of filesToSync) {
            const shaResponse = await fetch(
                `https://api.github.com/repos/${repo}/contents/${file.path}`,
                { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
            );
            const shaData = shaResponse.ok ? await shaResponse.json() : {};
            const sha = shaData.sha || undefined;

            const body = {
                message: file.message,
                content: btoa(unescape(encodeURIComponent(file.content)))
            };
            if (sha) body.sha = sha;

            const uploadResponse = await fetch(
                `https://api.github.com/repos/${repo}/contents/${file.path}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (!uploadResponse.ok) {
                const err = await uploadResponse.json();
                throw new Error(err.message || `Erro ao sincronizar ${file.path}.`);
            }
        }

        localStorage.setItem('portfolio_last_updated', lastUpdated.toString());
        alert(`✅ Sincronização concluída com sucesso!\nTimestamp: ${new Date(lastUpdated).toLocaleString()}`);
    } catch (error) {
        console.error('[syncToGitHub] Erro:', error);
        alert(`❌ Erro ao sincronizar: ${error.message}`);
    }
}

// Expor globalmente
window.syncToGitHub = syncToGitHub;

