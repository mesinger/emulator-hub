# web
web-pre-deploy:
	mkdir -p clientApp/webApp/src/emulators

serve:
	serve clientApp/webApp

# emulators
# rust-pulsating
rust-pulsating-clean:
	rm -rf clientApp/webApp/src/emulators/rust-pulsating && rm -rf emulators/rust-pulsating/build

rust-pulsating-build: rust-pulsating-clean
	wasm-pack build --target web --out-dir build emulators/rust-pulsating --out-name emulator

rust-pulsating: web-pre-deploy rust-pulsating-build
	cp -R emulators/rust-pulsating/build clientApp/webApp/src/emulators/rust-pulsating

# cpp-pulsating
cpp-pulsating-clean:
	rm -rf clientApp/webApp/src/emulators/cpp-pulsating && rm -rf emulators/cpp-pulsating/build

cpp-pulsating-build: cpp-pulsating-clean
	mkdir emulators/cpp-pulsating/build && \
	docker run --rm -v $(shell pwd):/src -u $(id -u):$(id -g) \
	emscripten/emsdk emcc emulators/cpp-pulsating/pulsatingEmulator.cpp \
	-o emulators/cpp-pulsating/build/emulator.js \
	--no-entry --bind -sEXPORT_ES6=1 -sMODULARIZE=1

cpp-pulsating: web-pre-deploy cpp-pulsating-build
	cp -R emulators/cpp-pulsating/build clientApp/webApp/src/emulators/cpp-pulsating
