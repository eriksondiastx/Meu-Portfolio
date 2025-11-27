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