use crate::{Emulator, Pixel, Screen};

pub struct PulsatingEmulator {
  screen: Screen,
}

impl PulsatingEmulator {
  pub fn new(width: usize, height: usize) -> Self {
    PulsatingEmulator {
      screen: Screen::new(width, height),
    }
  }
}

impl Emulator for PulsatingEmulator {
  fn tick(&mut self) {
    self.screen.pixels.iter_mut().for_each(|pixel| {
      pixel.r = (pixel.r + 1) % 255;
      pixel.g = (pixel.g + 1) % 255;
      pixel.b = (pixel.b + 1) % 255;
    });
  }

  fn raw_screen(&self) -> *const Pixel {
    self.screen.pixels.as_ptr()
  }

  fn debug_screen(&self) -> String {
    self.screen.to_string()
  }
}
