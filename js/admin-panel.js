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