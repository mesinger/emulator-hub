use std::fmt::{Display, Formatter};
use crate::core::pixel::Pixel;

pub struct Screen {
  width: usize,
  height: usize,
  pub(crate) pixels: Vec<Pixel>,
}

impl Screen {
  pub(crate) fn new(width: usize, height: usize) -> Self {
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
