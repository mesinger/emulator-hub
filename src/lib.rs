use std::fmt::{Display, Formatter};
use wasm_bindgen::prelude::*;
use derive_new::new;

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
  emulator: Emulator,
}

#[wasm_bindgen]
impl Context {
  pub fn new(width: usize, height: usize) -> Self {
    log("Creating new context");
    Context {
      emulator: Emulator::new(Screen::new(width, height))
    }
  }

  pub fn tick(&mut self) {
    self.emulator.tick();
  }

  pub fn raw_screen(&self) -> *const Pixel {
    self.emulator.screen.pixels.as_ptr()
  }

  pub fn debug_render(&self) -> String {
    self.emulator.screen.to_string()
  }
}

#[derive(new)]
pub struct Emulator {
  screen: Screen,
}

impl Emulator {
  fn tick(&mut self) {
    self.screen.pixels.iter_mut().for_each(|pixel| {
      pixel.r = (pixel.r + 1) % 255;
      pixel.g = (pixel.g + 1) % 255;
      pixel.b = (pixel.b + 1) % 255;
    });
  }
}

pub struct Screen {
  width: usize,
  height: usize,
  pixels: Vec<Pixel>,
}

impl Screen {
  fn new(width: usize, height: usize) -> Self {
    let pixels = vec![Pixel::new(0, 0, 0); width * height];

    Screen {
      width,
      height,
      pixels
    }
  }
}

impl Screen {
  fn pixel_index(&self, x: usize, y: usize) -> usize {
    x + self.width * y
  }
}

impl Display for Screen {
  fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
    let mut result = String::new();
    for y in 0..self.height {
      for x in 0..self.width {
        result.push_str(format!("{} ", self.pixels.get(self.pixel_index(x, y)).unwrap()).as_str());
      }
      result.push_str("\n");
    }
    write!(f, "{}", result)
  }
}

#[derive(new, Clone)]
pub struct Pixel {
  r: u8,
  g: u8,
  b: u8,
}

impl Display for Pixel {
  fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
    write!(f, "#{}{}{}", self.r, self.g, self.b)
  }
}













#[cfg(test)]
mod tests {
  use super::*;

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
