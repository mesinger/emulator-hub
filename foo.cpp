#include <stdint.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;

class PulsatingEmulator {
public:
    PulsatingEmulator(int width, int height): width(width), height(height), screenSize(width * height * 3) {
        pScreen = new uint8_t [screenSize];
    }

    virtual ~PulsatingEmulator() {
        delete[] pScreen;
    }

    void tick() {
        for(int i = 0; i < screenSize; i++) {
            pScreen[i] = (pScreen[i] - 1) % 255;
        }
    }

    val rawScreen() const {
        return val(typed_memory_view(screenSize, pScreen));
    }

private:
    const int width, height, screenSize;
    uint8_t * pScreen;

};

EMSCRIPTEN_BINDINGS(my_class_example) {
    class_<PulsatingEmulator>("PulsatingEmulator")
        .constructor<int, int>()
        .function("tick", &PulsatingEmulator::tick)
        .function("rawScreen", &PulsatingEmulator::rawScreen)
    ;
}

