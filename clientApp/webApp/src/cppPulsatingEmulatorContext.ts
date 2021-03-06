import {Context, ContextOptions, CppWasmModule} from "./context.js";
// @ts-ignore
import Module from "./emulators/cpp-pulsating/emulator.js";

export class CppPulsatingEmulatorContext implements Context {
  constructor(private wasm: CppWasmModule) {
  }

  static async create(options: ContextOptions): Promise<Context> {
    const wasm = await Module();

    const emulator = new wasm.PulsatingEmulator(options.width, options.height);

    // @ts-ignore
    return new CppPulsatingEmulatorContext({
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