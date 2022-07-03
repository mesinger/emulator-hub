import init, {wasmMemory, Context} from "./emulator/emulator_hub.js";

const width = 16;
const height = 16;
const pixelWidth = 5;
const pixelSpacing = 1;

let emulatorContext;
let screenPtr;
let pixels;

const canvas = document.getElementById("shibe");
const ctx = canvas.getContext("2d");

async function run() {
    await init();

    emulatorContext = Context.new(width, height);
    screenPtr = emulatorContext.raw_screen();
    pixels = new Uint8Array(wasmMemory().buffer, screenPtr, width * height * 3);

    renderLoop();
}

function renderLoop() {
    emulatorContext.tick();
    draw();
    requestAnimationFrame(renderLoop);
}

const draw = () => {
    const screenPtr = emulatorContext.raw_screen();
    const pixels = new Uint8Array(wasmMemory().buffer, screenPtr, 4 * 3);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = x + width * y;

            ctx.fillStyle = `rgb(
                ${pixels[i]},
                ${pixels[i + 1]},
                ${pixels[i + 2]}
            )`;

            ctx.fillRect(
                x * (pixelWidth + pixelSpacing),
                y * (pixelWidth + pixelSpacing),
                pixelWidth,
                pixelWidth
            )
        }
    }
}

run();