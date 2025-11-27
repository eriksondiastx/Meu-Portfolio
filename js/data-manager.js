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
            certificate: "#"
        },
        { 
            name: "Contabilidade Informatizada", 
            description: "Curso feito durante época de pausa escolar, no Istituto Médio de Economia do Kilamba Kiaxi (IMEKK). Luanda/Angola",
            certificate: "certificados/Certificado_Contabilidade Informatizada.pdf"
        },
        { 
            name: "Pedagogia e Didática", 
            description: "Curso feito durante época de pausa escolar, a escola Cheguevara. Luanda/Angola",
            certificate: "certificados/Certificado_Pedagogia e Didática.pdf"
        },
        { 
            name: "Redes de Computadores", 
            description: "Curso de redes de computadores com foco em configuração e administração de redes locais.",
            certificate: "certificados/Certificado_Redes de Computadores.pdf"
        },
        { 
            name: "Montagem e Reparação de Computadores", 
            description: "Curso prático de hardware cobrindo montagem, manutenção e resolução de problemas em computadores.",
            certificate: "certificados/Certificado Hardware.pdf"
        },
        { 
            name: "Electrônica Analógica", 
            description: "Curso fundamental em análise de circuitos analógicos, comportamento de componentes e princípios de design de sistemas eletrônicos.",
            certificate: "certificados/Certificado_Eletrônica Analógica.pdf"
        },
        { 
            name: "Electrônica Digital", 
            description: "Curso avançado cobrindo lógica digital, microprocessadores e design e implementação de sistemas digitais.",
            certificate: "certificados/Certificado_Eletrônica Digital.pdf"
        },
        { 
            name: "Iniciação Bancária para Assistente de Clientes", 
            description: "Curso profissional em operações bancárias, atendimento ao cliente e procedimentos de instituições financeiras.",
            certificate: "certificados/Certificado_CIBAC.pdf"
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
        },
        {
            nome: "Siafrica",
            tipo: "Rebranding",
            descricao: "Modernização completa da identidade visual, incluindo novo logotipo, paleta de cores e aplicações em diversos materiais.",
            ano: "2023",
            tags: ["Rebranding", "Logo", "Papelaria"],
            imagens: [
                "imagem/design/siafrica0.jpg",
                "imagem/design/siafrica1.jpg",
                "imagem/design/siafrica2.jpg",
                "imagem/design/siafrica3.jpg"
            ]
        }
    ];
}