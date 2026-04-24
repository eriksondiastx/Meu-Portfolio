document.addEventListener("DOMContentLoaded", () => {
    // Configuração de cada slot de hobby
    const configs = [
        {
            id: 'hobby-canvas-1',
            model: '3d/brushes_valentina.glb',
            scale: 0.04,
            positionY: -1.5,
            cameraZ: 8
        },
        {
            id: 'hobby-canvas-2',
            model: '3d/gamepad_sony_dualshock_3.glb',
            scale: 13.9,
            positionY: -0.5,
            cameraZ: 6
        },
        {
            id: 'hobby-canvas-3',
            model: '3d/basketball.glb',
            scale: 1.5,
            positionY: -0.5,
            cameraZ: 6
        },
        {
            id: 'hobby-canvas-4',
            model: '3d/compact_multimeter_lowpoly.glb',
            scale: 0.8,
            positionY: -1.0,
            cameraZ: 7
        },
        {
            id: 'hobby-canvas-5',
            model: '3d/medieval_open_book_1.glb',
            scale: 1.9,
            positionY: -1.0,
            cameraZ: 7
        }
    ];

    const scenesInfo = [];
    const loader = new THREE.GLTFLoader();

    configs.forEach(config => {
        const container = document.getElementById(config.id);
        if (!container) return;

        // Cena
        const scene = new THREE.Scene();

        // Câmera
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = config.cameraZ;

        // Renderizador com fundo transparente
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(renderer.domElement);

        // Luzes
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(10, 15, 10);
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
        fillLight.position.set(-10, 5, -10);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0x0bceaf, 1.5, 30);
        rimLight.position.set(0, -5, 5);
        scene.add(rimLight);

        // Controles de órbita com auto-rotate
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 3.0;

        let model = null;

        // Carregar o modelo .glb
        loader.load(
            config.model,
            (gltf) => {
                model = gltf.scene;
                model.scale.set(config.scale, config.scale, config.scale);

                // Calcular o centro real do modelo após aplicar a escala
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());

                // Usar um grupo pivot para centralizar todos os eixos corretamente
                const pivot = new THREE.Group();
                model.position.sub(center); // Centra o modelo dentro do pivot (X, Y e Z)
                pivot.position.y = config.positionY; // Apenas o pivot se desloca no Y
                pivot.add(model);

                scene.add(pivot);
            },
            undefined,
            (error) => {
                console.error(`Erro ao carregar ${config.model}:`, error);
            }
        );

        scenesInfo.push({ scene, camera, renderer, controls, container });
    });

    // Responsividade
    window.addEventListener('resize', () => {
        scenesInfo.forEach(info => {
            const width = info.container.clientWidth;
            const height = info.container.clientHeight;
            info.renderer.setSize(width, height);
            info.camera.aspect = width / height;
            info.camera.updateProjectionMatrix();
        });
    });

    // Loop de animação
    function animate() {
        requestAnimationFrame(animate);
        scenesInfo.forEach(info => {
            info.controls.update();
            info.renderer.render(info.scene, info.camera);
        });
    }

    animate();
});
