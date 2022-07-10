use crate::Pixel;

pub trait Emulator {
  fn tick(&mut self);
  fn raw_screen(&self) -> *const Pixel;
  fn debug_screen(&self) -> String;
}