#include "HeadlessScreen.h"

HeadlessScreen::HeadlessScreen(uint16_t width, uint16_t height): width(width), height(height), rawScreenSize(width * height * 3) {
    pRawScreen = new uint8_t[rawScreenSize];
}

HeadlessScreen::~HeadlessScreen() {
    delete[] pRawScreen;
}

void HeadlessScreen::setPixel(std::size_t x, std::size_t y, uint8_t r, uint8_t g, uint8_t b) {
    auto index = (x + (width * y)) * 3;
    pRawScreen[index] = r;
    pRawScreen[index + 1] = g;
    pRawScreen[index + 2] = b;
}

uint8_t *HeadlessScreen::rawScreen() const {
    return pRawScreen;
}

uint32_t HeadlessScreen::getRawScreenSize() const {
    return rawScreenSize;
}
