// js/data.js
// CODEX: Single Source of Truth — sincroniza com localStorage via timestamp
// Este ficheiro é reconstruído automaticamente pelo painel admin ao fazer "Sync para GitHub"

const defaultData = {
    profile: {
        nome: "Erikson Inácio Dias Teixeira",
        titulo: "Desenvolvedor Front-End",
        descricao: "Apaixonado por tecnologia e por computadores desde os 13 anos de idade, a minha jornada começou após ter feito o curso de Informática na Óptica do Usuário, no então renomado Centro de Formação São Domingos, em Luanda.\nDesde então, já sabia que carreira pretendia seguir.",
        formacao: "Engenharia Informática",
        profileImage: "imagem/Erikson Profile01.png",
        facebook: "https://www.facebook.com/erikson.teixeira.73/",
        instagram: "https://www.instagram.com/eriksonteixeira/",
        linkedin: "https://www.linkedin.com/in/erikson-teixeira-b912b3145",
        email: "eriksondiastx@gmail.com",
        telefone: "+244 949 100 325",
        whatsapp: "244949100325",
        localizacao: "Luanda, Angola",
        cvLink: "cv/1º Curricuculum  Vitae Erikson 05_25_IT.pdf",
        titulosRotativos: "Desenvolvedor Front-End, Professor, Criador de conteúdo, Designer Gráfico"
    },
    tecnologias: [
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
    ],
    cursos: [
        { name: "Informática para Usuário", description: "O primeiro curso que fiz, aos 13 anos de idade, no Centro de Formação São Domingos. Luanda/Angola.", certificate: "#", certificateType: "link", year: "2006", institution: "Centro de Formação São Domingos" },
        { name: "Contabilidade Informatizada", description: "Curso feito durante época de pausa escolar, no Istituto Médio de Economia do Kilamba Kiaxi (IMEKK). Luanda/Angola", certificate: "certificados/Certificado_Contabilidade Informatizada.pdf", certificateType: "link", year: "2010", institution: "IMEKK" },
        { name: "Pedagogia e Didática", description: "Curso feito durante época de pausa escolar, a escola Cheguevara. Luanda/Angola", certificate: "certificados/Certificado_Pedagogia e Didática.pdf", certificateType: "link", year: "2011", institution: "Escola Cheguevara" },
        { name: "Redes de Computadores", description: "Curso de redes de computadores com foco em configuração e administração de redes locais.", certificate: "certificados/Certificado_Redes de Computadores.pdf", certificateType: "link", year: "2012", institution: "Centro de Formação Profissional" },
        { name: "Montagem e Reparação de Computadores", description: "Curso prático de hardware cobrindo montagem, manutenção e resolução de problemas em computadores.", certificate: "certificados/Certificado Hardware.pdf", certificateType: "link", year: "2012", institution: "Centro de Formação Técnica" },
        { name: "Electrônica Analógica", description: "Curso fundamental em análise de circuitos analógicos, comportamento de componentes e princípios de design de sistemas eletrônicos.", certificate: "certificados/Certificado_Eletrônica Analógica.pdf", certificateType: "link", year: "2013", institution: "Instituto de Electrónica" },
        { name: "Electrônica Digital", description: "Curso avançado cobrindo lógica digital, microprocessadores e design e implementação de sistemas digitais.", certificate: "certificados/Certificado_Eletrônica Digital.pdf", certificateType: "link", year: "2013", institution: "Instituto de Electrónica" },
        { name: "Iniciação Bancária para Assistente de Clientes", description: "Curso profissional em operações bancárias, atendimento ao cliente e procedimentos de instituições financeiras.", certificate: "certificados/Certificado_CIBAC.pdf", certificateType: "link", year: "2014", institution: "Instituto Bancário" }
    ],
    experiencias: [
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
            imagens: ["imagem/portfolio1.jpg", "imagem/portfolio2.jpg"]
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
            imagens: ["imagem/portfolio1.jpg", "imagem/portfolio2.jpg"]
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
    ],
    projetos: [
        { nome: "Currículum Online", descricao: "Um projecto simples do meu currículum, disponibilizado online através do GitHub Pages. <br><span>Concluído</span>", imagem: "imagem/portfolio1.jpg", link: "#", status: "Concluído" },
        { nome: "Portfólio", descricao: "O projecto do meu portfólio, na qual estão tendo acesso.<br>Disponibilizado online através do GitHub Pages. <br><span>Em desenvolvimento...</span>", imagem: "imagem/portfolio2.jpg", link: "#", status: "Em desenvolvimento" },
        { nome: "Calculadora", descricao: "Calculadora web interativa com design moderno e funcionalidade completa. <br><span>Em desenvolvimento...</span>", imagem: "imagem/portfolio3.jpg", link: "#", status: "Em desenvolvimento" },
        { nome: "LisBeauty", descricao: "Este é um projecto que eu fiz para a divulgação do negócio da minha esposa. <br><span>Em desenvolvimento...</span>", imagem: "imagem/portfolio4.jpg", link: "https://eriksondiastx.github.io/Lisbeauty/", status: "Em desenvolvimento" },
        { nome: "Gestor de Cantinas", descricao: "Sistema de gestão para cantinas com controle de inventário e acompanhamento de vendas. <br><span>Em desenvolvimento...</span>", imagem: "imagem/portfolio5.jpg", link: "#", status: "Em desenvolvimento" },
        { nome: "Web Design", descricao: "Coleção de projetos de web design mostrando princípios modernos de UI/UX. <br><span>Em desenvolvimento...</span>", imagem: "imagem/portfolio6.jpg", link: "#", status: "Em desenvolvimento" }
    ],
    design: [
        {
            nome: "TxArt",
            tipo: "Branding & Identidade Visual",
            descricao: "Desenvolvimento completo de identidade visual para página online, incluindo logotipo, cartão de visita e posts.",
            ano: "2019",
            tags: ["Logo Design", "Material Gráfico", "Design"],
            imagens: [
                "imagem/design/txart1.jpg", "imagem/design/txart2.png", "imagem/design/txart3.jpg",
                "imagem/design/txart4.jpg", "imagem/design/txart5.jpg", "imagem/design/txart6.jpg",
                "imagem/design/txart7.jpg", "imagem/design/txart8.jpg", "imagem/design/txart9.jpg",
                "imagem/design/txart10.jpg", "imagem/design/txart11.jpg", "imagem/design/txart12.jpg",
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
    ],
    atividades: [
        { date: "Jan 2024", title: "Workshop de UI/UX", description: "Participação em workshop intensivo sobre princípios modernos de interface e experiência do usuário." },
        { date: "Mar 2024", title: "Hackathon Luanda", description: "Desenvolvimento de uma solução web para mobilidade urbana em equipe durante 48 horas." },
        { date: "Jun 2024", title: "Curso de React Avançado", description: "Especialização em hooks, context API e gerenciamento de estado global." }
    ],
    // CODEX: Timestamp de versão — o relógio do sistema de sincronização
    // Se este valor for maior que o do localStorage, o localStorage é substituído
    lastUpdated: 0
};

window.defaultData = defaultData;

if (window.PortfolioSync && typeof window.PortfolioSync.initDatabase === "function") {
    window.initDatabase = function () {
        return window.PortfolioSync.initDatabase(defaultData);
    };
    window.initDatabase();
} else {
    console.warn("[data.js] PortfolioSync indisponivel. Nao foi possivel inicializar a sincronizacao.");
}
