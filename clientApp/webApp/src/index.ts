import {Context} from "./context.js";
import {RustPulsatingEmulatorContext} from "./rustPulsatingEmulatorContext.js";
import {CppPulsatingEmulatorContext} from "./cppPulsatingEmulatorContext.js";

const width = 64;
const height = 64;
const pixelWidth = 2;
const pixelSpacing = 0;

let emulatorContext: Context;
let pixels: Uint8Array;

const canvas = document.getElementById("shibe") as HTMLCanvasElement;
canvas.width = 1000
canvas.height = 1000;
const ctx = canvas.getContext("2d");

export default async function loadEmulator() {
  emulatorContext = await CppPulsatingEmulatorContext.create({
    width: width,
    height: height,
  });

  pixels = emulatorContext.rawScreen();

  renderLoop();
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

      ctx!.fillStyle = `rgb(
                ${pixels[i]},
                ${pixels[i + 1]},
                ${pixels[i + 2]}
            )`;

      ctx!.fillRect(
        x * (pixelWidth + pixelSpacing),
        y * (pixelWidth + pixelSpacing),
        pixelWidth,
        pixelWidth
      )
    }
  }
}