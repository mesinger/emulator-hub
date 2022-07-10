import init, {Context as EmulatorContext, wasmMemory} from "../emulator/emulator_hub.js";
import {Context, ContextOptions} from "./context.js";

export class RustPulsatingEmulatorContext implements Context {
  constructor(private context: EmulatorContext, private options: ContextOptions) {
  }

  static async create(options: ContextOptions): Promise<Context> {
    await init();
    const context = EmulatorContext.new(options.width, options.height);
    return new RustPulsatingEmulatorContext(context, options);
  }

  rawScreen(): Uint8Array {
    return new Uint8Array(wasmMemory().buffer, this.context.raw_screen(), this.options.width * this.options.height * 3);
  }

  tick(): void {
    this.context.tick();
  }

  free(): void {

  }
}