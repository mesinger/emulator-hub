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

web: web-build
	serve clientApp/webApp

