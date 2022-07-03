import {Context, wasmMemory} from "emulator-hub";

const context = Context.new(2, 2);
console.log(context);

const pRawScree = context.raw_screen();
const screenMem = new Uint8Array(wasmMemory().buffer, pRawScree, 2 * 2 * 3);

while (true) {


    console.log(screenMem);

    context.tick();
}
