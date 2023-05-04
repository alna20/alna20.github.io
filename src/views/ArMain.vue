<template>
    <canvas ref="canvas" id="canvas"></canvas>
    <div ref="overlay" id="overlay">
        <button ref="picture" class="picture-button" v-show="containerIsPlaced">
            TA BILD
        </button>
        <button ref="rotate" class="rotation-button" v-show="containerIsPlaced">
            ROTERA
        </button>

    </div>
    <canvas ref="finalCanvas" id="finalCanvas" style="display:none;"></canvas>
    <video ref="cameraFeed" id="cameraFeed" style="display:none;" autoplay playsinline></video>
    <a ref="download"></a>
</template>
<script lang="ts">
import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { usePayloadStore } from "@/store/orderStore";
export default {
    mounted() {
        this.init();
        this.animate();
        window.addEventListener("resize", this.onWindowResize);
    },
    beforeUnmounted() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
            containerIsPlaced: false,
            arStarted: false,
        };
    },
    methods: {
        init() {
            // Global variables for takePicture function
            this.video = this.$refs.cameraFeed;
            // Create a THREE scene
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.1,
                20
            );
            this.camera.position.z = 1;
            // CreatE a THREE WebGLRenderer
            this.canvas = this.$refs.canvas;

            this.gl = this.canvas.getContext('webgl', { xrCompatible: true });
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                context: this.gl,
                antialias: true,
                alpha: true,
                //powerPreference: 'high-performance', 
                xrCompatible: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.xr.enabled = true;

            // Create a THREE light object
            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            light.position.set(0.5, 1, 0.25);
            this.scene.add(light);

            // Load the model and reticle to the scene
            this.addReticleToScene();
            this.addModelToScene();
            // Create THREE controller to place the container
            this.controller = this.renderer.xr.getController(0);
            this.controller.addEventListener("select", this.onSelect);
            this.scene.add(this.controller);

            // Create a button to enter  a AR session 
            this.overlay = this.$refs.overlay;
            this.button = ARButton.createButton(this.renderer, {
                requiredFeatures: ["hit-test"],
                optionalFeatures: [
                    "dom-overlay",
                    "dom-overlay-for-handheld-ar",
                ],
                domOverlay: {
                    root: this.overlay,
                },
            });
            this.overlay.appendChild(this.button);
            //Initiate the event listeners for the rotate and take picture buttons
            this.rotationButton = this.$refs.rotate;
            this.takePictureButton = this.$refs.picture;
            this.rotationButton.addEventListener('beforexrselect', ev => ev.preventDefault());
            this.takePictureButton.addEventListener('beforexrselect', ev => ev.preventDefault());

            this.rotationButton.addEventListener('click', () => {
                this.rotate();
            });

            this.takePictureButton.addEventListener('click', async () => {
                try {
                    await this.startCamera();
                    setTimeout(() => {
                        this.takePicture();
                    }, 40);
                } catch (error) {
                    console.error(error);
                }
            });
            // Add event listener to adjust the size of the window
            window.addEventListener("resize", this.onWindowResize, false);
        },
        async addModelToScene() {
            // Create the path to the chosen container
            const modelUrl =
                this.payloadStore.selectedContainer.value?.modelPath;
            // Load the Model
            const loader = new GLTFLoader();
            const gltf = await loader.loadAsync(modelUrl);
            this.model = gltf.scene;
            this.model.outputEncoding = THREE.sRGBEncoding;
            this.model.scale.multiplyScalar(0.005);
            this.model.visible = false;
            this.scene.add(this.model);
        },
        addReticleToScene() {
            const geometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
                -Math.PI / 2
            );
            const material = new THREE.MeshBasicMaterial();
            this.reticle = new THREE.Mesh(geometry, material);
            this.reticle.matrixAutoUpdate = false;
            this.reticle.visible = false;
            this.scene.add(this.reticle);
        },
        onSelect() {
            if (this.reticle.visible && this.model) {
                this.model.visible = true;

                this.model.position.setFromMatrixPosition(this.reticle.matrix);
                this.model.quaternion.setFromRotationMatrix(this.reticle.matrix);
                this.model.position.x += 0.25;
                this.model.position.z -= 0.25;
                this.containerIsPlaced = true;
            }
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        animate() {
            this.renderer.setAnimationLoop(this.render);
        },
        async initializeHitTestSource() {
            const session = this.renderer.xr.getSession({
                mode: "immersive-ar",
                requiredFeatures: ["hit-test"]
            });
            const viewerSpace = await session.requestReferenceSpace("viewer");
            this.hitTestSource = await session.requestHitTestSource({
                space: viewerSpace,
            });
            this.localSpace = await session.requestReferenceSpace("local");
            this.hitTestSourceInitialized = true;

            session.addEventListener("end", () => {
                this.hitTestSourceInitialized = false;
                this.hitTestSource = null;
                // Redirect the user to home after the STOP AR button is clicked
                this.arStarted;
                this.$router.push({
                    name: "home",
                });
            });
        },
        render(timestamp, frame) {
            if (!this.arStarted) {
                if ('ontouchstart' in window) {
                    setTimeout(() => {
                        const clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        this.button.dispatchEvent(clickEvent);
                    }, 10);
                } else {
                    this.button.click();
                }
                this.arStarted = true;
            }

            if (frame) {
                if (!this.hitTestSourceInitialized) {
                    this.initializeHitTestSource();
                }
                if (this.hitTestSourceInitialized) {
                    const hitTestResults = frame.getHitTestResults(
                        this.hitTestSource
                    );
                    if (hitTestResults.length > 0) {
                        const hit = hitTestResults[0];
                        const pose = hit.getPose(this.localSpace);
                        this.reticle.visible = true;
                        this.reticle.matrix.fromArray(pose.transform.matrix);
                    } else {
                        this.reticle.visible = false;
                    }
                }
                this.renderer.render(this.scene, this.camera);
            }
        },
        async startCamera() {
            try {
                // Set the constraints for the getUserMedia function
                const constraints = {
                    video: {
                        facingMode: 'environment',
                    }
                };
                // Get access to the back camera
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                // Attach the camera stream to the video element
                this.video.srcObject = stream;

            } catch (error) {
                console.error('Failed to get camera stream', error);
            }
        },
        takePicture() {
            // Cache DOM element references
            const finalCanvas = this.$refs.finalCanvas;
            const downloadLink = this.$refs.download;

            finalCanvas.width = this.canvas.width;
            finalCanvas.height = this.canvas.height;

            const ctx = finalCanvas.getContext('2d');

            ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);

            const finalDataURL = finalCanvas.toDataURL('image/jpeg');
            downloadLink.href = finalDataURL;
            downloadLink.download = 'snapshot.jpeg';
            downloadLink.click();
        },

        rotate() {
            //Checks if the model exists
            if (this.model && this.model.visible) {
                this.model.rotation.y -= 0.4;
            }
        },
    },
};
</script>
<style scoped>
#canvas {
    position: absolute;
    width: 100vw;
    height: 100vh;
}

.picture-button {
    right: 20px;
    position: absolute;
    bottom: 20px;
    padding: 12px 6px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    color: rgb(255, 255, 255);
    font: 13px sans-serif;
    text-align: center;
    opacity: 0.5;
    outline: none;
    z-index: 999;
    cursor: pointer;
    width: 100px;
}

.picture-button:hover {
    opacity: 1;
}

.rotation-button {
    right: 0;
    position: absolute;
    bottom: 20px;
    padding: 12px 6px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    color: rgb(255, 255, 255);
    font: 13px sans-serif;
    text-align: l;
    opacity: 0.5;
    outline: none;
    z-index: 999;
    cursor: pointer;
    left: 19px;
    width: 100px;
}

.rotation-button:hover {
    opacity: 1;
}
</style>