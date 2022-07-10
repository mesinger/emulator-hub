#include <stdint.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "HeadlessScreen.h"
#include "HeadlessScreen.cpp"
#include "Emulator.h"
#include "Cartridge.cpp"
#include "Controller.cpp"
#include "CPU.cpp"
#include "Emulator.cpp"
#include "Log.cpp"
#include "MainBus.cpp"
#include "Mapper.cpp"
#include "Mapper11.cpp"
#include "MapperAxROM.cpp"
#include "MapperCNROM.cpp"
#include "MapperGxROM.cpp"
#include "MapperMMC3.cpp"
#include "MapperNROM.cpp"
#include "MapperSxROM.cpp"
#include "MapperUxROM.cpp"
#include "PictureBus.cpp"
#include "PPU.cpp"

using namespace emscripten;

class SimpleNesWasmContext {
public:
    SimpleNesWasmContext(int width, int height): width(width), height(height) {
        pScreen = new HeadlessScreen(width, height);
        pEmulator = new sn::Emulator(pScreen);
        pEmulator->setVideoWidth(width);
        pEmulator->setVideoHeight(height);
    }

    virtual ~SimpleNesWasmContext() {
        delete pEmulator;
        delete pScreen;
    }

    std::string run() {
        return pEmulator->run();
    }

    void tick() {
        pEmulator->tick();
//        int sign = increaseColor ? 1 : -1;
//        currentColor = (currentColor + (1 * sign));
//        for(int y = 0; y < height; y++) {
//            for(int x = 0; x < width; x++) {
//                pScreen->setPixel(x, y, currentColor, 0, 0);
//            }
//        }
//
//        if(currentColor >= 255) {
//            increaseColor = false;
//        }
//
//        if(currentColor <= 0) {
//            increaseColor = true;
//        }
    }

    val rawScreen() const {
        return val(typed_memory_view(pScreen->getRawScreenSize(), pScreen->rawScreen()));
    }

private:
    const int width, height;
    uint8_t currentColor = 0;
    HeadlessScreen* pScreen;
    bool increaseColor = true;
    sn::Emulator* pEmulator;
};

EMSCRIPTEN_BINDINGS(wasm_context) {
        class_<SimpleNesWasmContext>("SimpleNesWasmContext")
                .constructor<int, int>()
                .function("tick", &SimpleNesWasmContext::tick)
                .function("rawScreen", &SimpleNesWasmContext::rawScreen)
                .function("run", &SimpleNesWasmContext::run)
        ;
};
