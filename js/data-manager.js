// js/data-manager.js

// Função para carregar dados do localStorage
function loadPortfolioData() {
    return {
        personalInfo: JSON.parse(localStorage.getItem('personalInfo')) || getDefaultPersonalInfo(),
        tecnologias: JSON.parse(localStorage.getItem('tecnologias')) || getDefaultTechnologies(),
        cursos: JSON.parse(localStorage.getItem('cursos')) || getDefaultCourses(),
        experiencias: JSON.parse(localStorage.getItem('experiencias')) || getDefaultExperiences(),
        projetos: JSON.parse(localStorage.getItem('projetos')) || getDefaultProjects(),
        design: JSON.parse(localStorage.getItem('design')) || getDefaultDesign()
    };
}

// Dados padrão (fallback caso não haja dados no localStorage)
function getDefaultPersonalInfo() {
    return {
        nome: "Erikson Inácio Dias Teixeira",
        titulo: "Desenvolvedor Front-End",
        descricao: "Apaixonado por tecnologia e por computadores desde os 13 anos de idade, a minha jornada começou após ter feito o curso de Informática na Óptica do Usuário, no então renomado Centro de Formação São Domingos, em Luanda. Desde então, já sabia que carreira pretendia seguir.",
        facebook: "https://www.facebook.com/erikson.teixeira.73/",
        instagram: "https://www.instagram.com/eriksonteixeira/",
        linkedin: "https://www.linkedin.com/in/erikson-teixeira-b912b3145"
    };
}

function getDefaultTechnologies() {
    return [
        { name: "HTML5", category: "frontend", level: "80", description: "Avançado" },
        { name: "CSS3", category: "frontend", level: "70", description: "Avançado" },
        { name: "JavaScript", category: "frontend", level: "20", description: "Básico" },
        { name: "Bootstrap", category: "frontend", level: "50", description: "Intermediário" },
        { name: "React JS", category: "frontend", level: "10", description: "Iniciante" },
        { name: "SQL-Server", category: "backend", level: "50", description: "Intermediário" },
        { name: "MySQL", category: "backend", level: "30", description: "Básico" },
        { name: "Git/GitHub", category: "tools", level: "40", description: "Intermediário" },
        { name: "VS Code", category: "tools", level: "80", description: "Avançado" },
        { name: "Figma", category: "tools", level: "30", description: "Básico" },
        { name: "Pacote Office", category: "tools", level: "80", description: "Avançado" },
        { name: "Adobe Photoshop", category: "tools", level: "40", description: "Intermediário" },
        { name: "Adobe Premiere Pro", category: "tools", level: "20", description: "Intermediário" }
    ];
}

function getDefaultCourses() {
    return [
        { 
            name: "Informática para Usuário", 
            description: "O primeiro curso que fiz, aos 13 anos de idade, no Centro de Formação São Domingos. Luanda/Angola.",
            certificate: "#",
            certificateType: "link",
            year: "2006",
            institution: "Centro de Formação São Domingos"
        },
        { 
            name: "Contabilidade Informatizada", 
            description: "Curso feito durante época de pausa escolar, no Istituto Médio de Economia do Kilamba Kiaxi (IMEKK). Luanda/Angola",
            certificate: "certificados/Certificado_Contabilidade Informatizada.pdf",
            certificateType: "link",
            year: "2010",
            institution: "IMEKK"
        },
        { 
            name: "Pedagogia e Didática", 
            description: "Curso feito durante época de pausa escolar, a escola Cheguevara. Luanda/Angola",
            certificate: "certificados/Certificado_Pedagogia e Didática.pdf",
            certificateType: "link",
            year: "2011",
            institution: "Escola Cheguevara"
        },
        { 
            name: "Redes de Computadores", 
            description: "Curso de redes de computadores com foco em configuração e administração de redes locais.",
            certificate: "certificados/Certificado_Redes de Computadores.pdf",
            certificateType: "link",
            year: "2012",
            institution: "Centro de Formação Profissional"
        },
        { 
            name: "Montagem e Reparação de Computadores", 
            description: "Curso prático de hardware cobrindo montagem, manutenção e resolução de problemas em computadores.",
            certificate: "certificados/Certificado Hardware.pdf",
            certificateType: "link",
            year: "2012",
            institution: "Centro de Formação Técnica"
        },
        { 
            name: "Electrônica Analógica", 
            description: "Curso fundamental em análise de circuitos analógicos, comportamento de componentes e princípios de design de sistemas eletrônicos.",
            certificate: "certificados/Certificado_Eletrônica Analógica.pdf",
            certificateType: "link",
            year: "2013",
            institution: "Instituto de Electrónica"
        },
        { 
            name: "Electrônica Digital", 
            description: "Curso avançado cobrindo lógica digital, microprocessadores e design e implementação de sistemas digitais.",
            certificate: "certificados/Certificado_Eletrônica Digital.pdf",
            certificateType: "link",
            year: "2013",
            institution: "Instituto de Electrónica"
        },
        { 
            name: "Iniciação Bancária para Assistente de Clientes", 
            description: "Curso profissional em operações bancárias, atendimento ao cliente e procedimentos de instituições financeiras.",
            certificate: "certificados/Certificado_CIBAC.pdf",
            certificateType: "link",
            year: "2014",
            institution: "Instituto Bancário"
        }
    ];
}
function getDefaultExperiences() {
    return [
        {
            periodo: "2025 - Presente",
            cargo: "Desenvolvedor Front-End Freelancer",
            empresa: "Trabalho Autônomo",
            localizacao: "Luanda, Angola",
            responsabilidades: [
                "Desenvolvimento de websites responsivos usando HTML5, CSS3 e JavaScript",
                "Criação de interfaces modernas com Bootstrap e frameworks CSS",
                "Implementação de designs fornecidos pelos clientes",
                "Otimização de sites para SEO e performance",
                "Manutenção e atualização de websites existentes"
            ],
            imagens: ["imagem/trabalhos/freelancer1.jpg", "imagem/trabalhos/freelancer2.jpg"]
        },
        {
            periodo: "2024 - 2025",
            cargo: "Secretário",
            empresa: "Alexa Gestão de Taxi",
            localizacao: "Kilamba, Luanda, Angola",
            responsabilidades: [
                "Organização de documentos administrativos",
                "Pagamento(recarga) de saldo para os motoristas na plataforma(Yango)",
                "Depósitos bancários",
                "Compra dos materiais para manutenção das viaturas",
                "Marketing da marca para angariação de parceiros",
                "Emitir relatórios de actividades"
            ],
            imagens: ["imagem/trabalhos/freelancer1.jpg", "imagem/trabalhos/freelancer2.jpg"]
        },
        {
            periodo: "2022 - 2024",
            cargo: "Técnico de Suporte em TI",
            empresa: "Egate Cloud",
            localizacao: "São Paulo, Luanda, Angola",
            responsabilidades: [
                "Suporte técnico a usuários finais",
                "Suporte técnico a usuários finais na empresa Sociedade de Desenvolvimento da Barra do Dande(SDB)",
                "Auxílio ao Engº Amandio Zumba na gestão de sistemas da SDB",
                "Implementar e normas de Segurança da Informação na empresa",
                "Instalação e configuração de software",
                "Manutenção preventiva e corretiva de computadores",
                "Configuração de redes locais",
                "Treinamento básico para usuários"
            ],
            imagens: [
                "imagem/trabalhos/Egate1.jpg",
                "imagem/trabalhos/egate2.jpg",
                "imagem/trabalhos/egate3.jpg",
                "imagem/trabalhos/egate4.jpg",
                "imagem/trabalhos/egate6.jpg",
                "imagem/trabalhos/egate7.jpg"
            ]
        },
        {
            periodo: "2020 - 2022",
            cargo: "Professor de Informática",
            empresa: "ATL StAndrews English School",
            localizacao: "Luanda, Angola",
            responsabilidades: [
                "Lecionar a disciplina de Informática para crianças e adolescentes",
                "Lecionar a disciplina de Artes Plásticas",
                "Auxíliar os alunos na resolução das tarefas escolares",
                "Preparação de material didático e avaliações",
                "Acompanhamento do progresso dos alunos",
                "Ensino de pacote Office (Word, Excel, PowerPoint)",
                "Criação de actividades para datas comemorativas",
                "Auxílio ao coordenador na gestão de disciplinas e professores",
                "Suporte técnico das TICs do centro"
            ],
            imagens: [
                "imagem/trabalhos/StAndrews1.jpg",
                "imagem/trabalhos/StAndrews2.jpg",
                "imagem/trabalhos/StAndrews3.jpg",
                "imagem/trabalhos/StAndrews4.jpg",
                "imagem/trabalhos/StAndrews5.jpg",
                "imagem/trabalhos/StAndrews6.jpg"
            ]
        }
    ];
}

function getDefaultProjects() {
    return [
        {
            nome: "Currículum Online",
            descricao: "Um projecto simples do meu currículum, disponibilizado online através do GitHub Pages. <br><span>Concluído</span>",
            imagem: "imagem/portfolio1.jpg",
            link: "#",
            status: "Concluído"
        },
        {
            nome: "Portfólio",
            descricao: "O projecto do meu portfólio, na qual estão tendo acesso.<br>Disponibilizado online através do GitHub Pages. <br><span>Em desenvolvimento...</span>",
            imagem: "imagem/portfolio2.jpg",
            link: "#",
            status: "Em desenvolvimento"
        },
        {
            nome: "Calculadora",
            descricao: "Calculadora web interativa com design moderno e funcionalidade completa. <br><span>Em desenvolvimento...</span>",
            imagem: "imagem/portfolio3.jpg",
            link: "#",
            status: "Em desenvolvimento"
        },
        {
            nome: "LisBeauty",
            descricao: "Este é um projecto que eu fiz para a divulgação do negócio da minha esposa. <br><span>Em desenvolvimento...</span>",
            imagem: "imagem/portfolio4.jpg",
            link: "https://eriksondiastx.github.io/Lisbeauty/",
            status: "Em desenvolvimento"
        },
        {
            nome: "Gestor de Cantinas",
            descricao: "Sistema de gestão para cantinas com controle de inventário e acompanhamento de vendas. <br><span>Em desenvolvimento...</span>",
            imagem: "imagem/portfolio5.jpg",
            link: "#",
            status: "Em desenvolvimento"
        },
        {
            nome: "Web Design",
            descricao: "Coleção de projetos de web design mostrando princípios modernos de UI/UX. <br><span>Em desenvolvimento...</span>",
            imagem: "imagem/portfolio6.jpg",
            link: "#",
            status: "Em desenvolvimento"
        }
    ];
}

function getDefaultDesign() {
    return [
        {
            nome: "TxArt",
            tipo: "Branding & Identidade Visual",
            descricao: "Desenvolvimento completo de identidade visual para página online, incluindo logotipo, cartão de visita e posts.",
            ano: "2019",
            tags: ["Logo Design", "Material Gráfico", "Design"],
            imagens: [
                "imagem/design/txart1.jpg",
                "imagem/design/txart2.png",
                "imagem/design/txart3.jpg",
                "imagem/design/txart4.jpg",
                "imagem/design/txart5.jpg",
                "imagem/design/txart6.jpg",
                "imagem/design/txart7.jpg",
                "imagem/design/txart8.jpg",
                "imagem/design/txart9.jpg",
                "imagem/design/txart10.jpg",
                "imagem/design/txart11.jpg",
                "imagem/design/txart12.jpg",
                "imagem/design/txart13.jpg"
            ]
        },
        {
            nome: "Projeto Estamos Juntos",
            tipo: "Publicidade & Marketing",
            descricao: "Criação de campanha publicitária completa para ONG, incluindo peças para redes sociais, banners e material impresso.",
            ano: "2024",
            tags: ["Social Media", "Banners", "Impressos"],
            imagens: [
                "imagem/design/fusao de ideias1.jpg",
                "imagem/design/fusao de ideias2.jpg",
                "imagem/design/fusao de ideias4.jpg"
            ]
        }       
    ];
}
// Animação das barras de progresso
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-skill');
                
                // Define a largura customizada
                skillBar.style.setProperty('--skill-width', skillLevel + '%');
                
                // Adiciona a classe de animação
                skillBar.classList.add('animate');
                
                // Anima a largura
                setTimeout(() => {
                    skillBar.style.width = skillLevel + '%';
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Função para renderizar o portfólio com dados dinâmicos
// No script do index.html, na função renderPortfolio:
function renderPortfolio() {
    const data = loadPortfolioData();
    
    // Atualizar seção Início
    updateHomeSection(data.personalInfo);
    
    // Atualizar seção Sobre
    updateAboutSection(data.personalInfo);
    
    // Atualizar seção Tecnologias
    updateTechnologiesSection(data.tecnologias);
    
    // Atualizar seção Cursos ← ESTA LINHA DEVE EXISTIR
    updateCoursesSection(data.cursos);
    
    // Atualizar seção Experiências
    updateExperiencesSection(data.experiencias);
    
    // Atualizar seção Projetos
    updateProjectsSection(data.projetos);
    
    // Atualizar seção Design
    updateDesignSection(data.design);
}
// Funções específicas para cada seção
function updateHomeSection(personalInfo) {
    const inicioSection = document.querySelector('.inicio');
    if (inicioSection) {
        const h2 = inicioSection.querySelector('h2');
        if (h2) h2.textContent = personalInfo.nome;
        
        const tituloSpan = inicioSection.querySelector('.sec-text');
        if (tituloSpan) tituloSpan.textContent = personalInfo.titulo;
        
        const descricaoP = inicioSection.querySelector('p');
        if (descricaoP) descricaoP.textContent = personalInfo.descricao;
        
        // Atualizar links de redes sociais
        const socialMedia = inicioSection.querySelector('.social-media');
        if (socialMedia) {
            const facebookLink = socialMedia.querySelector('a[href*="facebook"]');
            if (facebookLink) facebookLink.href = personalInfo.facebook;
            
            const instagramLink = socialMedia.querySelector('a[href*="instagram"]');
            if (instagramLink) instagramLink.href = personalInfo.instagram;
            
            const linkedinLink = socialMedia.querySelector('a[href*="linkedin"]');
            if (linkedinLink) linkedinLink.href = personalInfo.linkedin;
        }
    }
}

function updateAboutSection(personalInfo) {
    const sobreSection = document.querySelector('.sobre');
    if (sobreSection) {
        const sobreContent = sobreSection.querySelector('.sobre-content p');
        if (sobreContent) {
            // Mantém as informações pessoais fixas e atualiza apenas a parte profissional
            const parts = sobreContent.innerHTML.split('<p>Actualmente');
            if (parts.length > 1) {
                sobreContent.innerHTML = parts[0] + 
                    `<p>Actualmente trilhando o caminho como <span>${personalInfo.titulo.toLowerCase()}</span>.</p>` +
                    `<p>Sempre procurando ser melhor do que fui no dia anterior.</p>`;
            }
        }
        
        // Atualizar links de redes sociais na seção sobre
        const socialMedia = sobreSection.querySelector('.social-media');
        if (socialMedia) {
            const facebookLink = socialMedia.querySelector('a[href*="facebook"]');
            if (facebookLink) facebookLink.href = personalInfo.facebook;
            
            const instagramLink = socialMedia.querySelector('a[href*="instagram"]');
            if (instagramLink) instagramLink.href = personalInfo.instagram;
        }
    }
}

function updateTechnologiesSection(tecnologias) {
    const tecnologiasContainer = document.querySelector('.tecnologias-container');
    if (!tecnologiasContainer) return;
    
    // Limpar conteúdo existente
    tecnologiasContainer.innerHTML = '';
    
    // Agrupar tecnologias por categoria
    const categories = {
        frontend: tecnologias.filter(t => t.category === 'frontend'),
        backend: tecnologias.filter(t => t.category === 'backend'),
        tools: tecnologias.filter(t => t.category === 'tools')
    };
    
    // Renderizar cada categoria
    for (const [category, techs] of Object.entries(categories)) {
        if (techs.length === 0) continue;
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'tech-category';
        
        let categoryTitle = '';
        let categoryIcon = '';
        
        switch(category) {
            case 'frontend':
                categoryTitle = 'Front-End';
                categoryIcon = 'bi bi-code-slash';
                break;
            case 'backend':
                categoryTitle = 'Back-End & Databases';
                categoryIcon = 'bi bi-server';
                break;
            case 'tools':
                categoryTitle = 'Ferramentas & Outros';
                categoryIcon = 'bi bi-tools';
                break;
        }
        
        categoryDiv.innerHTML = `
            <h3 class="category-title"><i class="${categoryIcon}"></i> ${categoryTitle}</h3>
            <div class="tech-grid">
                ${techs.map(tech => `
                    <div class="tech-item">
                        <div class="tech-icon">
                            <i class="${getTechIcon(tech.name)}"></i>
                        </div>
                        <div class="tech-info">
                            <h4>${tech.name}</h4>
                            <div class="skill-bar">
                                <div class="skill-progress" data-skill="${tech.level}">
                                    <span class="skill-percentage">${tech.level}%</span>
                                </div>
                            </div>
                            <p>${tech.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        tecnologiasContainer.appendChild(categoryDiv);
    }
    
    // Re-inicializar animação das barras de skill
    setTimeout(animateSkillBars, 100);
}

function getTechIcon(techName) {
    const icons = {
        'HTML5': 'bi bi-filetype-html',
        'CSS3': 'bi bi-filetype-css',
        'JavaScript': 'bi bi-filetype-js',
        'Bootstrap': 'bi bi-bootstrap',
        'React JS': 'bi bi-bootstrap',
        'SQL-Server': 'bi bi-filetype-php',
        'MySQL': 'bi bi-database',
        'Git/GitHub': 'bi bi-git',
        'VS Code': 'bi bi-code-square',
        'Figma': 'bi bi-palette',
        'Pacote Office': 'bi bi-palette',
        'Adobe Photoshop': 'bi bi-palette',
        'Adobe Premiere Pro': 'bi bi-palette'
    };
    
    return icons[techName] || 'bi bi-code-slash';
}

// js/data-manager.js - FUNÇÃO QUE ESTAVA FALTANDO

function updateCoursesSection(cursos) {
    const cursosContainer = document.querySelector('.cursos-container');
    if (!cursosContainer) return;
    
    // Limpar conteúdo existente
    cursosContainer.innerHTML = '';
    
    // Adicionar cada curso
    cursos.forEach((curso, index) => {
        const cursoBox = document.createElement('div');
        cursoBox.className = 'cursos-box col-sm-12';
        
        // Determinar o link do certificado
        let certificateLink = '#';
        let certificateOnclick = '';
        let certificateTarget = '_blank';
        
        if (curso.certificateType === 'link') {
            certificateLink = curso.certificate || '#';
        } else if (curso.certificateType === 'file' && curso.fileData) {
            // Para ficheiros, usamos um link que faz download
            certificateLink = '#';
            certificateOnclick = `downloadCourseCertificate(${index})`;
            certificateTarget = '_self';
        }
        
        // Se não tem certificado, desabilitar o botão
        const hasCertificate = curso.certificate && 
            (curso.certificateType === 'link' ? curso.certificate !== '#' : true);
        
        cursoBox.innerHTML = `
            <i class="bi bi-book-half"></i>
            <h3>${curso.name.replace(/<br>/g, '<br>')}</h3>
            <p>${curso.description}</p>
            ${curso.institution ? `<p><small><i class="bi bi-building"></i> ${curso.institution}</small></p>` : ''}
            ${curso.year ? `<p><small><i class="bi bi-calendar"></i> ${curso.year}</small></p>` : ''}
            ${hasCertificate ? `
                <a href="${certificateLink}" 
                   ${certificateOnclick ? `onclick="${certificateOnclick}; return false;"` : ''} 
                   class="btn" 
                   target="${certificateTarget}"
                   ${certificateOnclick ? 'style="cursor: pointer;"' : ''}>
                    Ver Certificado
                    ${curso.certificateType === 'file' ? ' <i class="bi bi-download"></i>' : ' <i class="bi bi-box-arrow-up-right"></i>'}
                </a>
            ` : `
                <button class="btn" disabled style="opacity: 0.6;">
                    Sem Certificado
                </button>
            `}
        `;
        cursosContainer.appendChild(cursoBox);
    });
}

// Função para fazer download de certificados de cursos
function downloadCourseCertificate(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    
    if (curso.certificateType === 'file' && curso.fileData) {
        // Criar link de download
        const link = document.createElement('a');
        link.href = curso.fileData;
        link.download = curso.certificate || 'certificado.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback visual
        const btn = event.target.closest('.btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check-circle"></i> Download Iniciado';
            btn.classList.add('btn-success');
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
            }, 2000);
        }
    } else {
        alert('Certificado não disponível para download.');
    }
}
function updateExperiencesSection(experiencias) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    // Limpar conteúdo existente (manter apenas o primeiro item como template se necessário)
    timeline.innerHTML = '';
    
    // Adicionar cada experiência
    experiencias.forEach((exp, index) => {
        const expItem = document.createElement('div');
        expItem.className = 'timeline-item';
        
        // Determinar a imagem da empresa
        let empresaImg = 'imagem/empresas/front-end.jpeg';
        if (exp.empresa.includes('Alexa')) empresaImg = 'imagem/empresas/Alexa.jpeg';
        if (exp.empresa.includes('Egate')) empresaImg = 'imagem/empresas/Egate-Logo.jpeg';
        if (exp.empresa.includes('StAndrews')) empresaImg = 'imagem/empresas/StAndrews.jpg';
        
        expItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${exp.periodo}</div>
            <div class="timeline-content">
                <div class="company-header">
                    <div class="company-logo">
                        <img src="${empresaImg}" alt="${exp.empresa}">
                    </div>
                    <div class="company-info">
                        <h3>${exp.cargo}</h3>
                        <p class="company-name">${exp.empresa}</p>
                        <p class="company-location"><i class="bi bi-geo-alt"></i> ${exp.localizacao}</p>
                    </div>
                </div>
                
                <div class="job-description">
                    <h4>Responsabilidades:</h4>
                    <ul>
                        ${exp.responsabilidades.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>

                ${exp.imagens && exp.imagens.length > 0 ? `
                <div class="work-gallery">
                    <h4>${exp.empresa.includes('StAndrews') ? 'Momentos em sala de aula:' : 'Evidências do trabalho:'}</h4>
                    <div class="gallery-grid">
                        ${exp.imagens.map((img, imgIndex) => `
                            <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#modal${index}_${imgIndex}">
                                <img src="${img}" alt="${exp.cargo} ${imgIndex + 1}">
                                <div class="gallery-overlay">
                                    <i class="bi bi-zoom-in"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        timeline.appendChild(expItem);
        
        // Adicionar modais para as imagens (se houver)
        if (exp.imagens && exp.imagens.length > 0) {
            exp.imagens.forEach((img, imgIndex) => {
                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.id = `modal${index}_${imgIndex}`;
                modal.tabIndex = '-1';
                modal.innerHTML = `
                    <div class="modal-dialog modal-xl modal-dialog-centered">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-0">
                                <h5 class="modal-title text-white">${exp.empresa}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-center">
                                <img src="${img}" class="img-fluid modal-image-full" alt="${exp.cargo} ${imgIndex + 1}">
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            });
        }
    });
}

function updateProjectsSection(projetos) {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (!portfolioContainer) return;
    
    // Limpar conteúdo existente
    portfolioContainer.innerHTML = '';
    
    // Adicionar cada projeto
    projetos.forEach(projeto => {
        const projectBox = document.createElement('div');
        projectBox.className = 'portfolio-box cursos-box';
        projectBox.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.nome}">
            <div class="portfolio-layer">
                <h4>${projeto.nome}</h4>
                <p>${projeto.descricao}</p>
                <i class="bi bi-code-slash"></i>
                ${projeto.link !== '#' ? `<a href="${projeto.link}" class="btn2">Acessar</a>` : ''}
            </div>
        `;
        portfolioContainer.appendChild(projectBox);
    });
}

function updateDesignSection(design) {
    const designContainer = document.querySelector('.design-container');
    if (!designContainer) return;
    
    // Limpar conteúdo existente
    designContainer.innerHTML = '';
    
    // Adicionar cada projeto de design
    design.forEach((projeto, index) => {
        const designCard = document.createElement('div');
        designCard.className = 'design-card';
        
        // Determinar logo do cliente
        let clientLogo = 'imagem/clientes/cliente2-logo.png';
        if (projeto.nome === 'TxArt') clientLogo = 'imagem/clientes/TxArt-Logo.png';
        if (projeto.nome === 'Siafrica') clientLogo = 'imagem/clientes/siafrica.jpg';
        
        // Determinar ícone do tipo de projeto
        let projectIcon = 'bi bi-palette';
        if (projeto.tipo.includes('Publicidade')) projectIcon = 'bi bi-megaphone';
        if (projeto.tipo.includes('Rebranding')) projectIcon = 'bi bi-brush';
        
        designCard.innerHTML = `
            <div class="design-header">
                <div class="client-logo">
                    <img src="${clientLogo}" alt="${projeto.nome} Logo">
                </div>
                <div class="project-info">
                    <h3>${projeto.tipo.split('&')[0]}</h3>
                    <p class="client-name">${projeto.nome}</p>
                    <p class="project-type"><i class="${projectIcon}"></i> ${projeto.tipo}</p>
                    <p class="project-year"><i class="bi bi-calendar"></i> ${projeto.ano}</p>
                </div>
            </div>
            
            <div class="project-description">
                <p>${projeto.descricao}</p>
                
                <div class="project-tags">
                    ${projeto.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>

            ${projeto.imagens && projeto.imagens.length > 0 ? `
            <div class="design-gallery">
                <h4>Galeria do Projeto:</h4>
                <div class="gallery-grid">
                    ${projeto.imagens.map((img, imgIndex) => `
                        <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#modalDesign${index}_${imgIndex}">
                            <img src="${img}" alt="${projeto.nome} ${imgIndex + 1}">
                            <div class="gallery-overlay">
                                <i class="bi bi-zoom-in"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        `;
        
        designContainer.appendChild(designCard);
        
        // Adicionar modais para as imagens (se houver)
        if (projeto.imagens && projeto.imagens.length > 0) {
            projeto.imagens.forEach((img, imgIndex) => {
                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.id = `modalDesign${index}_${imgIndex}`;
                modal.tabIndex = '-1';
                modal.innerHTML = `
                    <div class="modal-dialog modal-xl modal-dialog-centered">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-0">
                                <h5 class="modal-title text-white">${projeto.nome}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-center">
                                <img src="${img}" class="img-fluid modal-image-full" alt="${projeto.nome} ${imgIndex + 1}">
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            });
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio();
});