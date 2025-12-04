 // Navegação entre seções
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove classe active de todos os links
                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                // Adiciona classe active ao link clicado
                this.classList.add('active');
                
                // Oculta todas as seções
                document.querySelectorAll('.section-content').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Mostra a seção correspondente
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin-login.html';
        });

        // Carregar dados do localStorage
        function loadData() {
            // Carregar tecnologias
            const tecnologias = JSON.parse(localStorage.getItem('tecnologias')) || [];
            const tecnologiasList = document.getElementById('tecnologiasList');
            tecnologiasList.innerHTML = '';
            
            tecnologias.forEach((tech, index) => {
                const techItem = document.createElement('div');
                techItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
                techItem.innerHTML = `
                    <div>
                        <h6 class="mb-0">${tech.name}</h6>
                        <small class="text-muted">${tech.category} - ${tech.level}% - ${tech.description}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-tech" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger delete-tech" data-index="${index}">Excluir</button>
                    </div>
                `;
                tecnologiasList.appendChild(techItem);
            });

            // Carregar cursos
            const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            const cursosList = document.getElementById('cursosList');
            cursosList.innerHTML = '';
            
            cursos.forEach((curso, index) => {
                const cursoItem = document.createElement('div');
                cursoItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
                cursoItem.innerHTML = `
                    <div>
                        <h6 class="mb-0">${curso.name}</h6>
                        <small class="text-muted">${curso.description}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-course" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger delete-course" data-index="${index}">Excluir</button>
                    </div>
                `;
                cursosList.appendChild(cursoItem);
            });
        }

        // Salvar tecnologia
        document.getElementById('saveTechBtn').addEventListener('click', function() {
            const name = document.getElementById('techName').value;
            const category = document.getElementById('techCategory').value;
            const level = document.getElementById('techLevel').value;
            const description = document.getElementById('techDescription').value;
            
            const tecnologias = JSON.parse(localStorage.getItem('tecnologias')) || [];
            tecnologias.push({ name, category, level, description });
            localStorage.setItem('tecnologias', JSON.stringify(tecnologias));
            
            // Fechar modal e recarregar dados
            bootstrap.Modal.getInstance(document.getElementById('addTechModal')).hide();
            document.getElementById('addTechForm').reset();
            loadData();
        });

        // Salvar curso
        document.getElementById('saveCourseBtn').addEventListener('click', function() {
            const name = document.getElementById('courseName').value;
            const description = document.getElementById('courseDescription').value;
            const certificate = document.getElementById('courseCertificate').value;
            
            const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos.push({ name, description, certificate });
            localStorage.setItem('cursos', JSON.stringify(cursos));
            
            // Fechar modal e recarregar dados
            bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
            document.getElementById('addCourseForm').reset();
            loadData();
        });

        // Salvar informações pessoais
        document.getElementById('sobreForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const personalInfo = {
                nome: document.getElementById('nome').value,
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                facebook: document.getElementById('facebook').value,
                instagram: document.getElementById('instagram').value,
                linkedin: document.getElementById('linkedin').value
            };
            
            localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
            alert('Informações salvas com sucesso!');
        });

        // Carregar informações pessoais ao abrir a página
        document.addEventListener('DOMContentLoaded', function() {
            const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
            if(personalInfo) {
                document.getElementById('nome').value = personalInfo.nome || '';
                document.getElementById('titulo').value = personalInfo.titulo || '';
                document.getElementById('descricao').value = personalInfo.descricao || '';
                document.getElementById('facebook').value = personalInfo.facebook || '';
                document.getElementById('instagram').value = personalInfo.instagram || '';
                document.getElementById('linkedin').value = personalInfo.linkedin || '';
            }
            
            loadData();
        });
        // No admin-panel.html, adicione estas funções:

// Salvar experiência
document.getElementById('saveExperienceBtn').addEventListener('click', function() {
    const periodo = document.getElementById('experiencePeriod').value;
    const cargo = document.getElementById('experiencePosition').value;
    const empresa = document.getElementById('experienceCompany').value;
    const localizacao = document.getElementById('experienceLocation').value;
    const responsabilidades = document.getElementById('experienceResponsibilities').value.split('\n');
    
    const experiencias = JSON.parse(localStorage.getItem('experiencias')) || [];
    experiencias.push({ periodo, cargo, empresa, localizacao, responsabilidades });
    localStorage.setItem('experiencias', JSON.stringify(experiencias));
    
    bootstrap.Modal.getInstance(document.getElementById('addExperienceModal')).hide();
    document.getElementById('addExperienceForm').reset();
    loadData();
});

// Salvar projeto
document.getElementById('saveProjectBtn').addEventListener('click', function() {
    const nome = document.getElementById('projectName').value;
    const descricao = document.getElementById('projectDescription').value;
    const imagem = document.getElementById('projectImage').value;
    const link = document.getElementById('projectLink').value;
    const status = document.getElementById('projectStatus').value;
    
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.push({ nome, descricao, imagem, link, status });
    localStorage.setItem('projetos', JSON.stringify(projetos));
    
    bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
    document.getElementById('addProjectForm').reset();
    loadData();
});

// Salvar projeto de design
document.getElementById('saveDesignBtn').addEventListener('click', function() {
    const nome = document.getElementById('designName').value;
    const tipo = document.getElementById('designType').value;
    const descricao = document.getElementById('designDescription').value;
    const ano = document.getElementById('designYear').value;
    const tags = document.getElementById('designTags').value.split(',');
    
    const design = JSON.parse(localStorage.getItem('design')) || [];
    design.push({ nome, tipo, descricao, ano, tags });
    localStorage.setItem('design', JSON.stringify(design));
    
    bootstrap.Modal.getInstance(document.getElementById('addDesignModal')).hide();
    document.getElementById('addDesignForm').reset();
    loadData();
});

// Atualize a função loadData para incluir as novas seções:
function loadData() {
    // ... código existente ...
    
    // Carregar experiências
    const experiencias = JSON.parse(localStorage.getItem('experiencias')) || [];
    const experienciasList = document.getElementById('experienciasList');
    experienciasList.innerHTML = '';
    
    experiencias.forEach((exp, index) => {
        const expItem = document.createElement('div');
        expItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
        expItem.innerHTML = `
            <div>
                <h6 class="mb-0">${exp.cargo} - ${exp.empresa}</h6>
                <small class="text-muted">${exp.periodo} - ${exp.localizacao}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1 edit-experience" data-index="${index}">Editar</button>
                <button class="btn btn-sm btn-outline-danger delete-experience" data-index="${index}">Excluir</button>
            </div>
        `;
        experienciasList.appendChild(expItem);
    });
    
    // Carregar projetos
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const projetosList = document.getElementById('projetosList');
    projetosList.innerHTML = '';
    
    projetos.forEach((proj, index) => {
        const projItem = document.createElement('div');
        projItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
        projItem.innerHTML = `
            <div>
                <h6 class="mb-0">${proj.nome}</h6>
                <small class="text-muted">${proj.descricao.substring(0, 100)}...</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1 edit-project" data-index="${index}">Editar</button>
                <button class="btn btn-sm btn-outline-danger delete-project" data-index="${index}">Excluir</button>
            </div>
        `;
        projetosList.appendChild(projItem);
    });
    
    // Carregar projetos de design
    const design = JSON.parse(localStorage.getItem('design')) || [];
    const designList = document.getElementById('designList');
    designList.innerHTML = '';
    
    design.forEach((des, index) => {
        const desItem = document.createElement('div');
        desItem.className = 'd-flex justify-content-between align-items-center p-2 border-bottom';
        desItem.innerHTML = `
            <div>
                <h6 class="mb-0">${des.nome}</h6>
                <small class="text-muted">${des.tipo} - ${des.ano}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1 edit-design" data-index="${index}">Editar</button>
                <button class="btn btn-sm btn-outline-danger delete-design" data-index="${index}">Excluir</button>
            </div>
        `;
        designList.appendChild(desItem);
    });
}
// Alternar entre link e upload de ficheiro
document.querySelectorAll('input[name="certificateType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const linkField = document.getElementById('linkField');
        const fileField = document.getElementById('fileField');
        
        if (this.value === 'link') {
            linkField.style.display = 'block';
            fileField.style.display = 'none';
            document.getElementById('courseCertificateFile').value = '';
            document.getElementById('filePreview').innerHTML = '';
        } else {
            linkField.style.display = 'none';
            fileField.style.display = 'block';
            document.getElementById('courseCertificateLink').value = '';
        }
    });
});

// Preview do ficheiro selecionado
document.getElementById('courseCertificateFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('filePreview');
    
    if (file) {
        // Validar tamanho do ficheiro (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
            alert('O ficheiro é muito grande. Por favor, selecione um ficheiro até 5MB.');
            this.value = '';
            preview.innerHTML = '';
            return;
        }
        
        // Validar tipo de ficheiro
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Tipo de ficheiro não suportado. Por favor, selecione PDF, JPG, PNG ou DOC.');
            this.value = '';
            preview.innerHTML = '';
            return;
        }
        
        // Mostrar preview
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <div class="border p-2 rounded">
                        <img src="${e.target.result}" class="img-thumbnail" style="max-height: 150px;">
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
    } else {
        preview.innerHTML = '';
    }
});

// Função para converter ficheiro para Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Salvar curso (modificado para suportar ficheiros)
document.getElementById('saveCourseBtn').addEventListener('click', async function() {
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const year = document.getElementById('courseYear').value;
    const institution = document.getElementById('courseInstitution').value;
    
    const certificateType = document.querySelector('input[name="certificateType"]:checked').value;
    
    let certificate = '';
    let fileData = null;
    
    if (certificateType === 'link') {
        certificate = document.getElementById('courseCertificateLink').value;
    } else {
        const fileInput = document.getElementById('courseCertificateFile');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            try {
                // Converter ficheiro para Base64
                fileData = await fileToBase64(file);
                certificate = file.name; // Guardamos o nome do ficheiro
            } catch (error) {
                console.error('Erro ao processar ficheiro:', error);
                alert('Erro ao processar o ficheiro. Tente novamente.');
                return;
            }
        }
    }
    
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    
    // Criar objeto do curso
    const curso = {
        name,
        description,
        year,
        institution,
        certificate,
        certificateType,
        fileData // Guardamos os dados do ficheiro em Base64
    };
    
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    
    // Fechar modal e recarregar dados
    bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
    document.getElementById('addCourseForm').reset();
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('linkField').style.display = 'block';
    document.getElementById('fileField').style.display = 'none';
    document.getElementById('certificateLink').checked = true;
    
    loadData();
    
    alert('Curso adicionado com sucesso!');
});

// Atualizar a função loadData para mostrar os cursos com ficheiros
function loadData() {
    // ... código existente para outras seções ...
    
    // Carregar cursos
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const cursosList = document.getElementById('cursosList');
    cursosList.innerHTML = '';
    
    if (cursos.length === 0) {
        cursosList.innerHTML = '<p class="text-muted text-center">Nenhum curso adicionado ainda.</p>';
        return;
    }
    
    cursos.forEach((curso, index) => {
        const cursoItem = document.createElement('div');
        cursoItem.className = 'd-flex justify-content-between align-items-center p-3 border-bottom';
        
        // Ícone baseado no tipo de certificado
        let certificateIcon = 'bi bi-link-45deg';
        let certificateText = 'Link externo';
        
        if (curso.certificateType === 'file') {
            certificateIcon = 'bi bi-file-earmark';
            certificateText = 'Ficheiro local';
        }
        
        cursoItem.innerHTML = `
            <div class="flex-grow-1">
                <h6 class="mb-1">${curso.name}</h6>
                <small class="text-muted d-block">${curso.description.substring(0, 100)}${curso.description.length > 100 ? '...' : ''}</small>
                <div class="mt-1">
                    <small class="text-muted">
                        <i class="bi bi-calendar"></i> ${curso.year} 
                        ${curso.institution ? `• <i class="bi bi-building"></i> ${curso.institution}` : ''}
                        • <i class="${certificateIcon}"></i> ${certificateText}
                    </small>
                </div>
            </div>
            <div class="ms-3">
                <button class="btn btn-sm btn-outline-primary me-1 view-course" data-index="${index}" title="Ver detalhes">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary me-1 edit-course" data-index="${index}" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-course" data-index="${index}" title="Excluir">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        cursosList.appendChild(cursoItem);
    });
    
    // Adicionar event listeners para os novos botões
    document.querySelectorAll('.view-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            viewCourse(index);
        });
    });
    
    document.querySelectorAll('.edit-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editCourse(index);
        });
    });
    
    document.querySelectorAll('.delete-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteCourse(index);
        });
    });
}

// Função para visualizar curso
function viewCourse(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    
    let certificateContent = '';
    if (curso.certificateType === 'link') {
        certificateContent = `<a href="${curso.certificate}" target="_blank" class="btn btn-sm btn-outline-primary">Abrir Certificado</a>`;
    } else {
        // Para ficheiros, criamos um link para download
        certificateContent = `
            <button class="btn btn-sm btn-outline-primary download-file" data-index="${index}">
                <i class="bi bi-download"></i> Download do Certificado
            </button>
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
                                <p><strong>Descrição:</strong></p>
                                <p>${curso.description}</p>
                                
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <p><strong>Ano:</strong> ${curso.year}</p>
                                    </div>
                                    ${curso.institution ? `
                                    <div class="col-md-6">
                                        <p><strong>Instituição:</strong> ${curso.institution}</p>
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
    
    // Remover modal anterior se existir
    const existingModal = document.getElementById('viewCourseModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Adicionar novo modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const viewModal = new bootstrap.Modal(document.getElementById('viewCourseModal'));
    viewModal.show();
    
    // Adicionar event listener para o botão de download
    const downloadBtn = document.querySelector('.download-file');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadCertificate(index);
        });
    }
    
    // Adicionar event listener para editar a partir da visualização
    document.querySelector('.edit-course-from-view').addEventListener('click', function() {
        viewModal.hide();
        editCourse(index);
    });
}

// Função para fazer download do certificado
function downloadCertificate(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    
    if (curso.certificateType === 'file' && curso.fileData) {
        // Criar link de download
        const link = document.createElement('a');
        link.href = curso.fileData;
        link.download = curso.certificate;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Função para excluir curso
function deleteCourse(index) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        cursos.splice(index, 1);
        localStorage.setItem('cursos', JSON.stringify(cursos));
        loadData();
        alert('Curso excluído com sucesso!');
    }
}

// Função para editar curso (será implementada posteriormente)
function editCourse(index) {
    alert('Funcionalidade de edição será implementada em breve!');
    // Aqui você pode implementar a lógica para editar um curso existente
}
// Alternar entre link e upload de ficheiro
document.querySelectorAll('input[name="certificateType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const linkField = document.getElementById('linkField');
        const fileField = document.getElementById('fileField');
        
        if (this.value === 'link') {
            linkField.style.display = 'block';
            fileField.style.display = 'none';
            document.getElementById('courseCertificateFile').value = '';
            document.getElementById('filePreview').innerHTML = '';
        } else {
            linkField.style.display = 'none';
            fileField.style.display = 'block';
            document.getElementById('courseCertificateLink').value = '';
        }
    });
});

// Preview do ficheiro selecionado
document.getElementById('courseCertificateFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('filePreview');
    
    if (file) {
        // Validar tamanho do ficheiro (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
            alert('O ficheiro é muito grande. Por favor, selecione um ficheiro até 5MB.');
            this.value = '';
            preview.innerHTML = '';
            return;
        }
        
        // Validar tipo de ficheiro
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Tipo de ficheiro não suportado. Por favor, selecione PDF, JPG, PNG ou DOC.');
            this.value = '';
            preview.innerHTML = '';
            return;
        }
        
        // Mostrar preview
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <div class="border p-2 rounded">
                        <img src="${e.target.result}" class="img-thumbnail" style="max-height: 150px;">
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
    } else {
        preview.innerHTML = '';
    }
});

// Função para converter ficheiro para Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Salvar curso (modificado para suportar ficheiros)
document.getElementById('saveCourseBtn').addEventListener('click', async function() {
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const year = document.getElementById('courseYear').value;
    const institution = document.getElementById('courseInstitution').value;
    
    const certificateType = document.querySelector('input[name="certificateType"]:checked').value;
    
    let certificate = '';
    let fileData = null;
    
    if (certificateType === 'link') {
        certificate = document.getElementById('courseCertificateLink').value;
    } else {
        const fileInput = document.getElementById('courseCertificateFile');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            try {
                // Converter ficheiro para Base64
                fileData = await fileToBase64(file);
                certificate = file.name; // Guardamos o nome do ficheiro
            } catch (error) {
                console.error('Erro ao processar ficheiro:', error);
                alert('Erro ao processar o ficheiro. Tente novamente.');
                return;
            }
        }
    }
    
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    
    // Criar objeto do curso
    const curso = {
        name,
        description,
        year,
        institution,
        certificate,
        certificateType,
        fileData // Guardamos os dados do ficheiro em Base64
    };
    
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    
    // Fechar modal e recarregar dados
    bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
    document.getElementById('addCourseForm').reset();
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('linkField').style.display = 'block';
    document.getElementById('fileField').style.display = 'none';
    document.getElementById('certificateLink').checked = true;
    
    loadData();
    
    alert('Curso adicionado com sucesso!');
});

// Atualizar a função loadData para mostrar os cursos com ficheiros
function loadData() {
    // ... código existente para outras seções ...
    
    // Carregar cursos
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const cursosList = document.getElementById('cursosList');
    cursosList.innerHTML = '';
    
    if (cursos.length === 0) {
        cursosList.innerHTML = '<p class="text-muted text-center">Nenhum curso adicionado ainda.</p>';
        return;
    }
    
    cursos.forEach((curso, index) => {
        const cursoItem = document.createElement('div');
        cursoItem.className = 'd-flex justify-content-between align-items-center p-3 border-bottom';
        
        // Ícone baseado no tipo de certificado
        let certificateIcon = 'bi bi-link-45deg';
        let certificateText = 'Link externo';
        
        if (curso.certificateType === 'file') {
            certificateIcon = 'bi bi-file-earmark';
            certificateText = 'Ficheiro local';
        }
        
        cursoItem.innerHTML = `
            <div class="flex-grow-1">
                <h6 class="mb-1">${curso.name}</h6>
                <small class="text-muted d-block">${curso.description.substring(0, 100)}${curso.description.length > 100 ? '...' : ''}</small>
                <div class="mt-1">
                    <small class="text-muted">
                        <i class="bi bi-calendar"></i> ${curso.year} 
                        ${curso.institution ? `• <i class="bi bi-building"></i> ${curso.institution}` : ''}
                        • <i class="${certificateIcon}"></i> ${certificateText}
                    </small>
                </div>
            </div>
            <div class="ms-3">
                <button class="btn btn-sm btn-outline-primary me-1 view-course" data-index="${index}" title="Ver detalhes">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary me-1 edit-course" data-index="${index}" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-course" data-index="${index}" title="Excluir">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        cursosList.appendChild(cursoItem);
    });
    
    // Adicionar event listeners para os novos botões
    document.querySelectorAll('.view-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            viewCourse(index);
        });
    });
    
    document.querySelectorAll('.edit-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editCourse(index);
        });
    });
    
    document.querySelectorAll('.delete-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteCourse(index);
        });
    });
}

// Função para visualizar curso
function viewCourse(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    
    let certificateContent = '';
    if (curso.certificateType === 'link') {
        certificateContent = `<a href="${curso.certificate}" target="_blank" class="btn btn-sm btn-outline-primary">Abrir Certificado</a>`;
    } else {
        // Para ficheiros, criamos um link para download
        certificateContent = `
            <button class="btn btn-sm btn-outline-primary download-file" data-index="${index}">
                <i class="bi bi-download"></i> Download do Certificado
            </button>
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
                                <p><strong>Descrição:</strong></p>
                                <p>${curso.description}</p>
                                
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <p><strong>Ano:</strong> ${curso.year}</p>
                                    </div>
                                    ${curso.institution ? `
                                    <div class="col-md-6">
                                        <p><strong>Instituição:</strong> ${curso.institution}</p>
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
    
    // Remover modal anterior se existir
    const existingModal = document.getElementById('viewCourseModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Adicionar novo modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const viewModal = new bootstrap.Modal(document.getElementById('viewCourseModal'));
    viewModal.show();
    
    // Adicionar event listener para o botão de download
    const downloadBtn = document.querySelector('.download-file');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadCertificate(index);
        });
    }
    
    // Adicionar event listener para editar a partir da visualização
    document.querySelector('.edit-course-from-view').addEventListener('click', function() {
        viewModal.hide();
        editCourse(index);
    });
}

// Função para fazer download do certificado
function downloadCertificate(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    
    if (curso.certificateType === 'file' && curso.fileData) {
        // Criar link de download
        const link = document.createElement('a');
        link.href = curso.fileData;
        link.download = curso.certificate;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Função para excluir curso
function deleteCourse(index) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        cursos.splice(index, 1);
        localStorage.setItem('cursos', JSON.stringify(cursos));
        loadData();
        alert('Curso excluído com sucesso!');
    }
}

// Função para editar curso (será implementada posteriormente)
function editCourse(index) {
    alert('Funcionalidade de edição será implementada em breve!');
    // Aqui você pode implementar a lógica para editar um curso existente
}