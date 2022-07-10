export interface Context {
  tick(): void;
  rawScreen(): Uint8Array;
  free(): void;
}

export interface ContextOptions {
  width: number;
  height: number;
}
