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
        int sign = increaseColor ? 1 : -1;
        for(int i = 0; i < screenSize; i++) {
            pScreen[i] = (pScreen[i] + (1 * sign));
        }

        if(pScreen[0] >= 255) {
            increaseColor = false;
        }

        if(pScreen[0] <= 0) {
            increaseColor = true;
        }
    }

    val rawScreen() const {
        return val(typed_memory_view(screenSize, pScreen));
    }

private:
    const int width, height, screenSize;
    uint8_t * pScreen;
    bool increaseColor = true;
};

EMSCRIPTEN_BINDINGS(my_class_example) {
    class_<PulsatingEmulator>("PulsatingEmulator")
        .constructor<int, int>()
        .function("tick", &PulsatingEmulator::tick)
        .function("rawScreen", &PulsatingEmulator::rawScreen)
    ;
}

