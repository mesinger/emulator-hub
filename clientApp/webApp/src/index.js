var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CppPulsatingEmulatorContext } from "./cppPulsatingEmulatorContext.js";
const width = 64;
const height = 64;
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
        emulatorContext = yield CppPulsatingEmulatorContext.create({
            width: width,
            height: height,
        });
        pixels = emulatorContext.rawScreen();
        renderLoop();
    });
}
function renderLoop() {
    emulatorContext.tick();
    draw();
    requestAnimationFrame(renderLoop);
}
const draw = () => {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = x + width * y;
            ctx.fillStyle = `rgb(
                ${pixels[i]},
                ${pixels[i + 1]},
                ${pixels[i + 2]}
            )`;
            ctx.fillRect(x * (pixelWidth + pixelSpacing), y * (pixelWidth + pixelSpacing), pixelWidth, pixelWidth);
        }
    }
};
