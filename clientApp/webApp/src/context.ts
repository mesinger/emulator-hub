export interface Context {
  tick(): void;
  rawScreen(): Uint8Array;
  free(): void;
}

export interface ContextOptions {
  width: number;
  height: number;
}

export interface CppWasmModule {
  emulator: {
    tick: () => void,
    rawScreen: () => Uint8Array,
    delete: () => void,
  }
}
