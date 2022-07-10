var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import Module from "./emulators/simple-nes/emulator.js";
export class SimpleNesEmulatorContext {
    constructor(wasm) {
        this.wasm = wasm;
    }
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wasm = yield Module();
            const emulator = new wasm.SimpleNesWasmContext(options.width, options.height);
            console.log(emulator.run());
            // @ts-ignore
            return new SimpleNesEmulatorContext({
                emulator: emulator
            });
        });
    }
    rawScreen() {
        return this.wasm.emulator.rawScreen();
    }
    tick() {
        this.wasm.emulator.tick();
    }
    free() {
        this.wasm.emulator.delete();
    }
}
