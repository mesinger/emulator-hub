#pragma once
#include <cstdlib>

class HeadlessScreen {
public:
    HeadlessScreen(uint16_t width, uint16_t height);
    virtual ~HeadlessScreen();

    void setPixel (std::size_t x, std::size_t y, uint8_t r, uint8_t g, uint8_t b);

    uint8_t* rawScreen() const;
    uint32_t getRawScreenSize() const;

private:
    const uint16_t width, height;
    const uint32_t rawScreenSize;

    uint8_t* pRawScreen;
};
