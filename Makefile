wasm-pack-node:
	wasm-pack build --target nodejs --out-dir pkg-node

wasm-pack-web:
	wasm-pack build --target web --out-dir pkg-web

web-clean:
	rm -rf clientApp/webApp/emulator

web-build: web-clean wasm-pack-web
	cp -R pkg-web clientApp/webApp/emulator

node: wasm-pack-node
	ts-node clientApp/nodeApp/app.ts

web: web-build emcc-build
	serve clientApp/webApp

emcc-clean:
	rm -rf clientApp/webApp/c-emulator && rm -rf pkg-c

emcc-pre-build: emcc-clean
	mkdir pkg-c

emcc: emcc-pre-build
	docker run --rm -v $(shell pwd):/src -u $(id -u):$(id -g) emscripten/emsdk emcc foo.cpp -o pkg-c/shibe.js --no-entry --bind -sEXPORT_ES6=1 -sMODULARIZE=1 -sEXPORTED_RUNTIME_METHODS=wasmMemory

emcc-build: emcc
	cp -R pkg-c clientApp/webApp/c-emulator


