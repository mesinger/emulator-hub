use derive_new::new;
use std::fmt::{Display, Formatter};

#[derive(new, Clone)]
pub struct Pixel {
  pub(crate) r: u8,
  pub(crate) g: u8,
  pub(crate) b: u8,
}

impl Display for Pixel {
  fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
    write!(f, "#{}{}{}", self.r, self.g, self.b)
  }
}
