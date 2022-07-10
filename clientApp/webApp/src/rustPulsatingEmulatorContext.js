var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import init, { Context as EmulatorContext, wasmMemory } from "./emulators/rust-pulsating/emulator.js";
export class RustPulsatingEmulatorContext {
    constructor(context, options) {
        this.context = context;
        this.options = options;
    }
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield init();
            const context = EmulatorContext.new(options.width, options.height);
            return new RustPulsatingEmulatorContext(context, options);
        });
    }
    rawScreen() {
        return new Uint8Array(wasmMemory().buffer, this.context.raw_screen(), this.options.width * this.options.height * 3);
    }
    tick() {
        this.context.tick();
    }
    free() {
    }
}
