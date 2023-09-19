import {Context} from "./context.js";
import {RustPulsatingEmulatorContext} from "./rustPulsatingEmulatorContext.js";
import {CppPulsatingEmulatorContext} from "./cppPulsatingEmulatorContext.js";
import {SimpleNesEmulatorContext} from "./simpleNesEmulatorContext.js";

const width = 256;
const height = 240;
const pixelWidth = 2;
const pixelSpacing = 0;

let emulatorContext: Context;
let pixels: Uint8Array;

const canvas = document.getElementById("shibe") as HTMLCanvasElement;
canvas.width = 1000
canvas.height = 1000;
const ctx = canvas.getContext("2d");

async function loadEmulator() {
  // const rom = await (await fetch("firedemo.nes")).arrayBuffer();

  // const memory = new WebAssembly.Memory({initial: 20, maximum: 100, shared: true});
  // const romInMemory = new Uint8Array(memory.buffer, 5000, 5);
  // romInMemory.set([1, 2, 3, 4, 5]);

  // console.log(romInMemory.byteOffset);
  // console.log(romInMemory.byteLength);

  emulatorContext = await SimpleNesEmulatorContext.create({
    width: width,
    height: height,
  });

  pixels = emulatorContext.rawScreen();

  renderLoop();
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

loadEmulator().then(_ => console.log("Loaded emulator"));