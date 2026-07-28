import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/worker.mjs',
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  external: ['hono'],
  minify: false,
  sourcemap: false,
});

console.log('Build complete: dist/worker.mjs');
