// CODEX: Dicionário i18n e aplicação de idioma
(function () {
  const translations = {
    pt: {
      brand_title: "Portfólio",
      nav_home: "Início",
      nav_about: "Sobre",
      nav_tech: "Tecnologias",
      nav_courses: "Cursos",
      nav_experience: "Experiências",
      nav_projects: "Projectos",
      nav_design: "Design",
      nav_contact: "Contactos",
      lang_toggle: "EN",
      home_greeting: "Olá, <span>chamo-me</span>",
      home_role_prefix: "Sou",
      home_description:
        "A minha paixão pela tecnologia e pelos computadores começou aos 13 anos, dando início a uma jornada de aprendizagem e descoberta que viria a definir o meu percurso profissional. O primeiro passo foi a formação em Informática na Óptica do Utilizador, no Centro de Formação São Domingos, em Luanda.<br><br>Desde então, tenho vindo a aprofundar os meus conhecimentos e a desenvolver competências em diferentes áreas das Tecnologias de Informação, com especial enfoque no desenvolvimento Web, suporte técnico e soluções informáticas.<br><br>Acredito que a tecnologia vai muito além do código: é uma ferramenta para resolver problemas, optimizar processos e transformar ideias em soluções práticas. É essa visão que orienta o meu trabalho e a minha evolução contínua como profissional de TI.",
      home_degree: "&lt; <span>Desenvolvimento Web | Sistemas | Soluções Tecnológicas</span> /&gt;.",
      home_download_cv: "Download CV",
      about_heading: "Sobre <span>Mim</span>",
      about_intro: "Natural de Angola, Província de Luanda, Nascido aos 12 de Setembro de 1993,<br>O primeiro filho de três (3) irmãos.<br>Pai: Mateus Inácio Teixeira;<br>Mãe: Ana Tuti Dias Ntonha Teixeira.<br>",
      about_career: "Actualmente trilhando o caminho como <span id=\"aboutRole\">Desenvolvedor Web & Técnico de Informática.</span>",
      about_motto: "Sempre procurando ser melhor do que fui no dia anterior.",
      tech_heading: "Domínio de <span>Ferramentas</span>",
      courses_heading: "Cursos <span>Feitos</span>",
      experience_heading: "Minhas <span>Experiências</span>",
      projects_heading: "Meus <span>Projectos</span>",
      design_heading: "Meus Projetos de <span>Design Gráfico</span>",
      contact_heading: "Meus <span>Contactos</span>",
      nav_open_menu: "Abrir Menu",
      tech_category_frontend: "Front-End",
      tech_category_backend: "Back-End & Databases",
      tech_category_tools: "Ferramentas & Outros",
      tech_level_advanced: "Avançado",
      tech_level_intermediate: "Intermediário",
      tech_level_basic: "Básico",
      tech_level_beginner: "Iniciante",
      course_view_cert: "Ver Certificado",
      course_1_title: "Informática<br> para Usuário",
      course_1_desc: "O primeiro curso que fiz, aos 13 anos de idade, no Centro de Formação São Domingos. <br>Luanda/Angola.",
      course_2_title: "Contabilidade<br> Informatizada",
      course_2_desc: "Curso feito durante época de pausa escolar, no Istituto Médio de Economia do Kilamba Kiaxi (IMEKK). <br>Luanda/Angola",
      course_3_title: "Pedagogia<br> e <br>Didática",
      course_3_desc: "Curso feito durante época de pausa escolar, a escola Cheguevara. <br>Luanda/Angola",
      course_4_title: "Redes <br>de Computadores",
      course_4_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_5_title: "Montagem e Reparação <br>de Computadores",
      course_5_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_6_title: "Electrônica <br>Analógica",
      course_6_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_7_title: "Electrônica <br>Digital",
      course_7_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_8_title: "Iniciação Bancária <br>para Assistente de Clientes",
      course_8_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      project_access: "Acessar",
      status_completed: "Concluído",
      status_in_progress: "Em desenvolvimento",
      project_1_title: "Currículum Online",
      project_1_desc: "Um projecto simples do meu currículum, disponibilizado online através do GitHub Pages.",
      project_2_title: "Portfólio",
      project_2_desc: "O projecto do meu portfólio, na qual estão tendo acesso.<br>Disponibilizado online através do GitHub Pages.",
      project_3_title: "Conheça Angola",
      project_3_desc: "Projecto pessoal, com o objectivo de divulgar Angola, navegando pela história. Desenvolvido usando React 19, TypeScript 5.8, Tailwind CSS v4 e Vibe Coding, hospedada na plataforma Netlify",
      project_4_title: "LisBeauty",
      project_4_desc: "Projecto desenvolvido para a divulgação do negócio da minha esposa.",
      project_5_title: "Empreendedor Faixa Preta",
      project_5_desc: "Projecto da plataforma de cursos online Empreendedor Faixa Preta, solicitada por: Pedro Ferreira e hospedada na plataforma Netlify.",
      project_6_title: "Designer Portfolio",
      project_6_desc: "Portfólio para Designer desenvolvido para o Sr. Joaquim Mateus e hospedado na plataforma Netlify.",
      project_7_title: "TXART",
      project_7_desc: "Web Portfólio para da minha marca, desenvolvido usando programação assistida por agente de IA (VibeCoding) na plataforma Google IA Studio",
      exp_responsibilities: "Responsabilidades:",
      exp_work_evidence: "Evidências do trabalho:",
      exp3_gallery: "Trabalho técnico:",
      exp4_gallery: "Momentos em sala de aula:",
      exp1_r1: "Desenvolvimento de websites responsivos usando HTML5, CSS3 e JavaScript",
      exp1_r2: "Criação de interfaces modernas com Bootstrap e frameworks CSS",
      exp1_r3: "Implementação de designs fornecidos pelos clientes",
      exp1_r4: "Otimização de sites para SEO e performance",
      exp1_r5: "Manutenção e atualização de websites existentes",
      exp1_title: "Desenvolvedor Front-End Freelancer",
      exp1_date: "2025 - Presente",
      exp2_r1: "Organização de documentos administrativos",
      exp2_r2: "Pagamento(recarga) de saldo para os motoristas na plataforma(Yango",
      exp2_r3: "Depósitos bancários",
      exp2_r4: "Compra dos materiais para manutenção das viaturas",
      exp2_r5: "Marketing da marca para angariação de parceiros",
      exp2_r6: "Emitir relatórios de actividades",
      exp2_title: "Secretário",
      exp2_date: "2024 - 2025",
      exp3_r1: "Suporte técnico a usuários finais",
      exp3_r2: "Suporte técnico a usuários finais na empresa Sociedade de Desenvolvimento da Barra do Dande(SDB)",
      exp3_r3: "Auxílio ao Engº Amandio Zumba na gestão de sistemas da SDB ",
      exp3_r4: "Implementar e normas de Segurança da Informação na empresa",
      exp3_r5: "Instalação e configuração de software",
      exp3_r6: "Manutenção preventiva e corretiva de computadores",
      exp3_r7: "Configuração de redes locais",
      exp3_r8: "Treinamento básico para usuários",
      exp3_title: "Técnico de Suporte em TI",
      exp3_date: "2022 - 2024",
      exp4_r1: "Lecionar a disciplina de Informática para crianças e adolescentes",
      exp4_r2: "Lecionar a disciplina de Artes Plásticas",
      exp4_r3: "Auxíliar os alunos na resolução das tarefas escolares",
      exp4_r4: "Preparação de material didático e avaliações",
      exp4_r5: "Acompanhamento do progresso dos alunos",
      exp4_r6: "Ensino de pacote Office (Word, Excel, PowerPoint)",
      exp4_r7: "Criação de actividades para datas comemorativas",
      exp4_r8: "Auxílio ao coordenador na gestão de disciplinas e professores",
      exp4_r9: "Suporte técnico das TICs do centro",
      exp4_title: "Professor de Informática",
      exp4_date: "2020 - 2022",
      design_gallery: "Galeria do Projeto:",
      design1_title: "Identidade e Posts",
      design1_type: "Branding & Identidade Visual",
      design1_desc: "Desenvolvimento completo de identidade visual para página online, incluindo logotipo, cartão de visita e posts.",
      design1_tag1: "Logo Design",
      design1_tag2: "Material Gráfico",
      design1_tag3: "Design",
      design2_title: "Campanha Publicitária",
      design2_type: "Publicidade & Marketing",
      design2_desc: "Criação de campanha publicitária completa para ONG, incluindo peças para redes sociais, banners e material impresso.",
      design2_tag1: "Social Media",
      design2_tag2: "Banners",
      design2_tag3: "Impressos",
      design3_title: "Redesign de Marca",
      design3_type: "Rebranding",
      design3_desc: "Modernização completa da identidade visual, incluindo novo logotipo, paleta de cores e aplicações em diversos materiais.",
      design3_tag1: "Rebranding",
      design3_tag2: "Logo",
      design3_tag3: "Papelaria",
      modal_close: "Fechar",
      modal_design1_1: "TxArt - Logo",
      modal_design1_2: "TxArt - Capa para o Facebook",
      modal_design1_3: "TxArt - Post 11 de Novembro",
      modal_design1_4: "TxArt - Tabela de Preços",
      modal_design1_5: "TxArt - Design 5",
      modal_design1_6: "TxArt - Design 6",
      modal_design1_7: "TxArt - Design 7",
      modal_design1_8: "TxArt - Design 8",
      modal_design1_9: "TxArt - Design 9",
      modal_design1_10: "TxArt - Design 10",
      modal_design1_11: "TxArt - Design 11",
      modal_design1_12: "TxArt - Design 12",
      modal_design1_13: "TxArt - Design 13",
      modal_design2_1: "Projeto Estamos Juntos - Fusão de Ideias 1",
      modal_design2_2: "Projeto Estamos Juntos - Fusão de Ideias 2",
      modal_design2_3: "Projeto Estamos Juntos - Fusão de Ideias 4",
      contact_email_label: "Email:",
      contact_phone_label: "Telefone / WhatsApp:",
      contact_location_label: "Localização:",
      activities_heading: "Actividades <span>Extras</span>",
      activity_1_date: "Jan 2024",
      activity_1_title: "Workshop de UI/UX",
      activity_1_desc: "Participação em workshop intensivo sobre princípios modernos de interface e experiência do usuário.",
      activity_2_date: "Mar 2024",
      activity_2_title: "Hackathon Luanda",
      activity_2_desc: "Desenvolvimento de uma solução web para mobilidade urbana em equipe durante 48 horas.",
      activity_3_date: "Jun 2024",
      activity_3_title: "Curso de React Avançado",
      activity_3_desc: "Especialização em hooks, context API e gerenciamento de estado global com Redux.",
      rotatives: ["Desenvolvedor Web.", "Técnico de Informática.", "Criador de conteúdo.", "Designer Gráfico."]
    },
    en: {
      brand_title: "My Portfolio",
      nav_home: "Home",
      nav_about: "About",
      nav_tech: "Technologies",
      nav_courses: "Courses",
      nav_experience: "Experience",
      nav_projects: "Projects",
      nav_design: "Design",
      nav_contact: "Contact",
      lang_toggle: "PT",
      home_greeting: "Hello, <span>my name is</span>",
      home_role_prefix: "I'm a",
      home_description:
        "My passion for technology and computers began at age 13, launching a journey of learning and discovery that would define my career path. The first step was training in Computer Use at the São Domingos Training Center in Luanda.<br><br>Since then, I have been deepening my knowledge and developing skills across different fields of Information Technology, with a focus on Web development, technical support, and IT solutions.<br><br>I believe technology goes far beyond code: it is a tool to solve problems, optimize processes, and turn ideas into practical solutions. This vision guides my work and continuous growth as an IT professional.",
      home_degree: "&lt; <span>Web Development | Systems | Tech Solutions</span> /&gt;.",
      home_download_cv: "Download CV",
      about_heading: "About <span>Me</span>",
      about_intro: "Born in Angola, Luanda Province, on September 12, 1993,<br>The first of three (3) siblings.<br>Father: Mateus Inácio Teixeira;<br>Mother: Ana Tuti Dias Ntonha Teixeira.<br>",
      about_career: "Currently paving my way as a <span id=\"aboutRole\">Web Developer & IT Technician.</span>",
      about_motto: "Always striving to be better than I was the day before.",
      tech_heading: "My <span>Tools</span>",
      courses_heading: "Courses <span>Completed</span>",
      experience_heading: "My <span>Experience</span>",
      projects_heading: "My <span>Projects</span>",
      design_heading: "My <span>Graphic Design</span> Projects",
      contact_heading: "My <span>Contact</span>",
      nav_open_menu: "Open Menu",
      tech_category_frontend: "Front-End",
      tech_category_backend: "Back-End & Databases",
      tech_category_tools: "Tools & Other",
      tech_level_advanced: "Advanced",
      tech_level_intermediate: "Intermediate",
      tech_level_basic: "Basic",
      tech_level_beginner: "Beginner",
      course_view_cert: "View Certificate",
      course_1_title: "Computer<br> User",
      course_1_desc: "The first course I took at age 13 at São Domingos Training Center. <br>Luanda/Angola.",
      course_2_title: "Computerized<br> Accounting",
      course_2_desc: "Course taken during school break at IMEKK. <br>Luanda/Angola",
      course_3_title: "Pedagogy<br> and <br>Didactics",
      course_3_desc: "Course taken during school break at Cheguevara School. <br>Luanda/Angola",
      course_4_title: "Computer <br>Networks",
      course_4_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_5_title: "Computer Assembly <br>and Repair",
      course_5_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_6_title: "Analog <br>Electronics",
      course_6_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_7_title: "Digital <br>Electronics",
      course_7_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet quas expedita quos cumque, fugiat sapiente magni quis quisquam est.",
      course_8_title: "Banking Initiation <br>for Customer Assistants",
      course_8_desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      project_access: "Access",
      status_completed: "Completed",
      status_in_progress: "In development",
      project_1_title: "Online Resume",
      project_1_desc: "A simple online resume hosted on GitHub Pages.",
      project_2_title: "Portfolio",
      project_2_desc: "My portfolio project you are viewing.<br>Hosted on GitHub Pages.",
      project_3_title: "Know Angola",
      project_3_desc: "Personal project aimed at sharing Angola and navigating through history. Built with React 19, TypeScript 5.8, Tailwind CSS v4, and Vibe Coding, hosted on Netlify.",
      project_4_title: "LisBeauty",
      project_4_desc: "Project developed to promote my wife's business.",
      project_5_title: "Black Belt Entrepreneur",
      project_5_desc: "Online course platform project Black Belt Entrepreneur, requested by Pedro Ferreira and hosted on Netlify.",
      project_6_title: "Designer Portfolio",
      project_6_desc: "Portfolio for Designer developed for Mr. Joaquim Mateus and hosted on Netlify.",
      project_7_title: "TXART",
      project_7_desc: "Brand web portfolio developed using AI agent-assisted programming (VibeCoding) on Google AI Studio platform.",
      exp_responsibilities: "Responsibilities:",
      exp_work_evidence: "Work evidence:",
      exp3_gallery: "Technical work:",
      exp4_gallery: "Classroom moments:",
      exp1_r1: "Development of responsive websites using HTML5, CSS3 and JavaScript",
      exp1_r2: "Creation of modern interfaces with Bootstrap and CSS frameworks",
      exp1_r3: "Implementation of designs provided by clients",
      exp1_r4: "Site optimization for SEO and performance",
      exp1_r5: "Maintenance and updates of existing websites",
      exp1_title: "Freelance Front-End Developer",
      exp1_date: "2025 - Present",
      exp2_r1: "Organization of administrative documents",
      exp2_r2: "Balance top-up payments for drivers on the Yango platform",
      exp2_r3: "Bank deposits",
      exp2_r4: "Purchase of materials for vehicle maintenance",
      exp2_r5: "Brand marketing to attract partners",
      exp2_r6: "Issuing activity reports",
      exp2_title: "Secretary",
      exp2_date: "2024 - 2025",
      exp3_r1: "Technical support for end users",
      exp3_r2: "Technical support for end users at SDB (Barra do Dande Development Society)",
      exp3_r3: "Assisting Engº Amandio Zumba in SDB systems management",
      exp3_r4: "Implementing information security standards within the company",
      exp3_r5: "Software installation and configuration",
      exp3_r6: "Preventive and corrective maintenance of computers",
      exp3_r7: "Local network configuration",
      exp3_r8: "Basic training for users",
      exp3_title: "IT Support Technician",
      exp3_date: "2022 - 2024",
      exp4_r1: "Teaching Computer Science to children and teenagers",
      exp4_r2: "Teaching Visual Arts",
      exp4_r3: "Helping students solve school tasks",
      exp4_r4: "Preparing teaching materials and assessments",
      exp4_r5: "Monitoring student progress",
      exp4_r6: "Teaching Office suite (Word, Excel, PowerPoint)",
      exp4_r7: "Creating activities for commemorative dates",
      exp4_r8: "Assisting the coordinator in managing subjects and teachers",
      exp4_r9: "Technical support for the center's ICT",
      exp4_title: "Computer Science Teacher",
      exp4_date: "2020 - 2022",
      design_gallery: "Project Gallery:",
      design1_title: "Identity and Posts",
      design1_type: "Branding & Visual Identity",
      design1_desc: "Full visual identity development for an online page, including logo, business card and posts.",
      design1_tag1: "Logo Design",
      design1_tag2: "Graphic Material",
      design1_tag3: "Design",
      design2_title: "Advertising Campaign",
      design2_type: "Advertising & Marketing",
      design2_desc: "Full advertising campaign for an NGO, including social media assets, banners and print materials.",
      design2_tag1: "Social Media",
      design2_tag2: "Banners",
      design2_tag3: "Print",
      design3_title: "Brand Redesign",
      design3_type: "Rebranding",
      design3_desc: "Complete modernization of visual identity, including new logo, color palette and applications across materials.",
      design3_tag1: "Rebranding",
      design3_tag2: "Logo",
      design3_tag3: "Stationery",
      modal_close: "Close",
      modal_design1_1: "TxArt - Logo",
      modal_design1_2: "TxArt - Facebook Cover",
      modal_design1_3: "TxArt - November 11 Post",
      modal_design1_4: "TxArt - Price Table",
      modal_design1_5: "TxArt - Design 5",
      modal_design1_6: "TxArt - Design 6",
      modal_design1_7: "TxArt - Design 7",
      modal_design1_8: "TxArt - Design 8",
      modal_design1_9: "TxArt - Design 9",
      modal_design1_10: "TxArt - Design 10",
      modal_design1_11: "TxArt - Design 11",
      modal_design1_12: "TxArt - Design 12",
      modal_design1_13: "TxArt - Design 13",
      modal_design2_1: "Projeto Estamos Juntos - Fusion of Ideas 1",
      modal_design2_2: "Projeto Estamos Juntos - Fusion of Ideas 2",
      modal_design2_3: "Projeto Estamos Juntos - Fusion of Ideas 4",
      contact_email_label: "Email:",
      contact_phone_label: "Phone / WhatsApp:",
      contact_location_label: "Location:",
      activities_heading: "Extra <span>Activities</span>",
      activity_1_date: "Jan 2024",
      activity_1_title: "UI/UX Workshop",
      activity_1_desc: "Participation in an intensive workshop on modern interface principles and user experience.",
      activity_2_date: "Mar 2024",
      activity_2_title: "Luanda Hackathon",
      activity_2_desc: "Development of a web solution for urban mobility in a team for 48 hours.",
      activity_3_date: "Jun 2024",
      activity_3_title: "Advanced React Course",
      activity_3_desc: "Specialization in hooks, context API and global state management with Redux.",
      rotatives: ["Web Developer.", "IT Technician.", "Content Creator.", "Graphic Designer."]
    }
  };

  const storageKey = "lang";
  let dynamicTranslations = { pt: {}, en: {} };

  function getCurrentLang() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "en" || saved === "pt") return saved;
    return "pt";
  }

  function setLang(lang) {
    localStorage.setItem(storageKey, lang);
  }

  function getValue(dict, key) {
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    return null;
  }

  function mergeTranslations(base, dynamic) {
    return {
      pt: { ...(base.pt || {}), ...(dynamic.pt || {}) },
      en: { ...(base.en || {}), ...(dynamic.en || {}) }
    };
  }

  function translateKey(key, fallbackValue) {
    const lang = getCurrentLang();
    const merged = mergeTranslations(translations, dynamicTranslations);
    const dict = merged[lang] || merged.pt;
    const fallback = merged.pt || {};
    return getValue(dict, key) ?? getValue(fallback, key) ?? fallbackValue ?? "";
  }

  function applyI18n(lang) {
    const merged = mergeTranslations(translations, dynamicTranslations);
    const dict = merged[lang] || merged.pt;
    const fallback = merged.pt;
    document.documentElement.lang = lang === "en" ? "en" : "pt-pt";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const value = getValue(dict, key) ?? getValue(fallback, key);
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      const value = getValue(dict, key) ?? getValue(fallback, key);
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const key = el.getAttribute("data-i18n-aria");
      const value = getValue(dict, key) ?? getValue(fallback, key);
      if (value) el.setAttribute("aria-label", value);
    });

    const rotatives = getValue(dict, "rotatives") ?? getValue(fallback, "rotatives");
    if (Array.isArray(rotatives)) window.__i18nRotatives = rotatives;
    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
  }

  function initToggle() {
    const toggle = document.getElementById("languageToggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const current = getCurrentLang();
      const next = current === "pt" ? "en" : "pt";
      setLang(next);
      applyI18n(next);
    });
  }

  async function loadDynamicTranslations() {
    try {
      const response = await fetch("/api/i18n");
      if (!response.ok) return;
      const data = await response.json();
      if (data && typeof data === "object") {
        dynamicTranslations = {
          pt: data.pt || {},
          en: data.en || {}
        };
      }
    } catch (error) {
      // Ignorar erro para não bloquear
    }
  }

  async function init() {
    await loadDynamicTranslations();
    const lang = getCurrentLang();
    applyI18n(lang);
    initToggle();
  }

  // CODEX: Expor dicionário para diagnóstico
  window.__i18nTranslations = translations;
  window.__i18nTranslate = translateKey;
  window.__i18nGetLang = getCurrentLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
