document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".midiaBackground");
    if (containers.length === 0) return;

    containers.forEach(container => {
        const video = document.createElement("video");
        video.src = "video/video-sobre.mp4";
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.loop = true;

        // Garante que o vídeo seja exibido assim que estiver pronto para reproduzir
        video.style.opacity = 0;
        video.style.transition = "opacity 1s ease";

        video.addEventListener("canplay", () => {
            video.style.opacity = 1;
        });

        container.appendChild(video);
    });
});

// CODEX: Lógica de rolagem horizontal para a Galeria de Actividades
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("atividadesWrapper");
    const scrollLeftBtn = document.getElementById("scrollLeft");
    const scrollRightBtn = document.getElementById("scrollRight");

    if (wrapper && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: -350, behavior: "smooth" });
        });

        scrollRightBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: 350, behavior: "smooth" });
        });
    }
});
