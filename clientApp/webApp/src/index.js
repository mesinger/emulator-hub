var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SimpleNesEmulatorContext } from "./simpleNesEmulatorContext.js";
const width = 256;
const height = 240;
const pixelWidth = 2;
const pixelSpacing = 0;
let emulatorContext;
let pixels;
const canvas = document.getElementById("shibe");
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext("2d");
export default function loadEmulator() {
    return __awaiter(this, void 0, void 0, function* () {
        // const rom = await (await fetch("firedemo.nes")).arrayBuffer();
        // const memory = new WebAssembly.Memory({initial: 20, maximum: 100, shared: true});
        // const romInMemory = new Uint8Array(memory.buffer, 5000, 5);
        // romInMemory.set([1, 2, 3, 4, 5]);
        // console.log(romInMemory.byteOffset);
        // console.log(romInMemory.byteLength);
        emulatorContext = yield SimpleNesEmulatorContext.create({
            width: width,
            height: height,
        });
        pixels = emulatorContext.rawScreen();
        renderLoop();
    });
}
function renderLoop() {
    // console.log(pixels);
    emulatorContext.tick();
    draw();
    requestAnimationFrame(renderLoop);
}
const draw = () => {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (x + width * y) * 3;
            ctx.fillStyle = `rgb(
                ${pixels[i]},
                ${pixels[i + 1]},
                ${pixels[i + 2]}
            )`;
            ctx.fillRect(x * (pixelWidth + pixelSpacing), y * (pixelWidth + pixelSpacing), pixelWidth, pixelWidth);
        }
    }
};
