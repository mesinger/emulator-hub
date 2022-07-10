import {Context, ContextOptions, CppWasmModule} from "./context.js";
// @ts-ignore
import Module from "./emulators/simple-nes/emulator.js";

export class SimpleNesEmulatorContext implements Context {
  constructor(private wasm: CppWasmModule) {
  }

  static async create(options: ContextOptions): Promise<Context> {
    const wasm = await Module();

    const emulator = new wasm.SimpleNesWasmContext(options.width, options.height);
    console.log(emulator.run());

    // @ts-ignore
    return new SimpleNesEmulatorContext({
      emulator: emulator
    });
  }

  rawScreen(): Uint8Array {
    return this.wasm.emulator.rawScreen();
  }

  tick(): void {
    this.wasm.emulator.tick();
  }

  free(): void {
    this.wasm.emulator.delete();
  }
}