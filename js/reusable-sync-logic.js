// CODEX: utilitario partilhado para sincronizacao localStorage <-> snapshot remoto
(function () {
  const STORAGE_KEYS = [
    "personalInfo",
    "tecnologias",
    "cursos",
    "experiencias",
    "projetos",
    "design",
    "atividades",
  ];

  const DATA_TO_STORAGE_MAP = {
    profile: "personalInfo",
    tecnologias: "tecnologias",
    cursos: "cursos",
    experiencias: "experiencias",
    projetos: "projetos",
    design: "design",
    atividades: "atividades",
  };

  const LAST_UPDATED_KEY = "portfolio_last_updated";

  function safeParseJSON(value, fallback = null) {
    if (value === null || value === undefined || value === "") return fallback;
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function readStoredSnapshot() {
    return {
      profile: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.profile)),
      tecnologias: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.tecnologias)),
      cursos: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.cursos)),
      experiencias: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.experiencias)),
      projetos: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.projetos)),
      design: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.design)),
      atividades: safeParseJSON(localStorage.getItem(DATA_TO_STORAGE_MAP.atividades)),
      lastUpdated: Number(localStorage.getItem(LAST_UPDATED_KEY) || 0),
    };
  }

  function writeSnapshotToStorage(defaultData) {
    Object.entries(DATA_TO_STORAGE_MAP).forEach(([dataKey, storageKey]) => {
      const value = defaultData ? defaultData[dataKey] : undefined;
      if (value !== undefined) {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    });
    localStorage.setItem(LAST_UPDATED_KEY, String(Number(defaultData?.lastUpdated || 0)));
  }

  function initDatabase(defaultData) {
    if (!defaultData || typeof defaultData !== "object") return false;

    const localLastUpdated = Number(localStorage.getItem(LAST_UPDATED_KEY) || 0);
    const remoteLastUpdated = Number(defaultData.lastUpdated || 0);
    const isLocalEmpty = STORAGE_KEYS.every((key) => !localStorage.getItem(key));
    const remoteIsNewer = remoteLastUpdated > localLastUpdated;

    if (isLocalEmpty || remoteIsNewer) {
      if (remoteIsNewer && !isLocalEmpty) {
        console.log("[data.js] Versao mais recente detectada. Actualizando localStorage...");
      } else {
        console.log("[data.js] LocalStorage vazio. Carregando dados padrao...");
      }

      writeSnapshotToStorage(defaultData);

      if (!isLocalEmpty && remoteIsNewer && localLastUpdated !== 0) {
        setTimeout(() => window.location.reload(), 500);
      }
      return true;
    }

    console.log(`[data.js] LocalStorage actualizado (v${localLastUpdated}). Nenhuma sincronizacao necessaria.`);
    return false;
  }

  function buildDataJsContent(defaultData) {
    const normalized = {
      ...defaultData,
      lastUpdated: Number(defaultData?.lastUpdated || 0),
    };
    const serialized = JSON.stringify(normalized, null, 2);
    return `// js/data.js
// CODEX: Single Source of Truth - snapshot gerado pelo painel admin
// Este ficheiro depende de js/reusable-sync-logic.js

const defaultData = ${serialized};

window.defaultData = defaultData;
window.initDatabase = function () {
  return window.PortfolioSync.initDatabase(defaultData);
};
window.initDatabase();
`;
  }

  window.PortfolioSync = {
    STORAGE_KEYS,
    DATA_TO_STORAGE_MAP,
    LAST_UPDATED_KEY,
    safeParseJSON,
    readStoredSnapshot,
    writeSnapshotToStorage,
    initDatabase,
    buildDataJsContent,
  };
})();
