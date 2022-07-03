wasm-pack-node:
	wasm-pack build --target nodejs --out-dir pkg-node

node: wasm-pack-node
	ts-node clientApp/nodeApp/app.ts
