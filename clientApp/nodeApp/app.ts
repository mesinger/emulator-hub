import {Context, wasmMemory} from "emulator-hub";

const context = Context.new(2, 2);
console.log(context);

while (true) {
    const pRawScree = context.raw_screen();
    const screenMem = new Uint8Array(wasmMemory().buffer, pRawScree, 2 * 2 * 3);

    console.log(screenMem);

    context.tick();
}
