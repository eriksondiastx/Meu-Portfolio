// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    // Busca o nosso container lá da seção Sobre
    const container = document.getElementById('canvas-container');
    if (!container) return; // Se não achar o container, cancela a execução

    // 1. Configuração Básica (Cena, Câmera e Renderizador)
    const scene = new THREE.Scene();

    // Configura a câmera (o "olho" que vai olhar pro laptop)
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5); // Afasta a câmera no eixo Z para ver o objeto inteiro

    // Configura o renderizador (com alpha: true para o fundo ficar transparente e pegar o vídeo do buraco negro!)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Adicionando Luzes potentes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Luz base mais forte
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2); // Luz principal intensa
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1); // Luz lateral para tirar sombras
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // 3. Controles Interativos (OrbitControls)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Rotação suave do mouse
    controls.enableZoom = false; // Desativamos o zoom para que o scroll do mouse na página não acabe dando zoom no laptop sem querer

    // 4. Carregando o Modelo 3D
    const loader = new THREE.GLTFLoader();
    let model;

    // Aqui vai apontar para o arquivo que você baixou
    loader.load('3d/laptop.glb', function (gltf) {
        model = gltf.scene;

        // Ajustamos o tamanho (scale) e a posição inicial.
        model.scale.set(13.0, 13.0, 13.0);
        model.position.y = -1.2; // Ajustado levemente para compensar o aumento de tamanho

        scene.add(model);
    }, undefined, function (error) {
        console.error('Erro ao carregar o modelo 3D:', error);
    });

    // 5. Animando infinitamente
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Atualiza a física do controle do mouse

        // Se quiser que o laptop gire sozinho de leve:
        if (model) {
            model.rotation.y -= 0.003;
        }

        renderer.render(scene, camera);
    }
    animate();

    // 6. Atualização Automática quando diminuir o ecrã (Responsividade)
    window.addEventListener('resize', () => {
        // Usa o tamanho atual do container
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
