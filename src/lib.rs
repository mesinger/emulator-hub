use wasm_bindgen::prelude::*;
use crate::core::emulator::{Emulator};
use crate::core::pixel::Pixel;
use crate::core::screen::Screen;
use crate::emulators::pulsating_emulator::PulsatingEmulator;

mod core;
mod emulators;

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn wasmMemory() -> JsValue {
  wasm_bindgen::memory()
}

#[wasm_bindgen]
extern {
  #[wasm_bindgen(js_namespace=console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub struct Context {
  emulator: Box<dyn Emulator>,
}

#[wasm_bindgen]
impl Context {
  pub fn new(width: usize, height: usize) -> Self {
    log("Creating new context");
    Context {
      emulator: Box::new(PulsatingEmulator::new(width, height)),
    }
  }

  pub fn tick(&mut self) {
    self.emulator.tick();
  }

  pub fn raw_screen(&self) -> *const Pixel {
    self.emulator.raw_screen()
  }

  pub fn debug_render(&self) -> String {
    self.emulator.debug_screen()
  }
}








#[cfg(test)]
mod tests {
  use crate::{Pixel, Screen};

  #[test]
  fn pixel() {
    let pixel = Pixel::new(0, 0, 0);
    assert_eq!("#000", pixel.to_string());
  }

  #[test]
  fn screen() {
    let screen = Screen::new(2, 2);
    assert_eq!("#000 #000 \n#000 #000 \n", screen.to_string());
  }
}
