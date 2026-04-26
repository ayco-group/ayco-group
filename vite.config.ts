import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import checker from 'vite-plugin-checker';
import { products } from './src/data/products';
import { renderCards, renderTerminal, renderJsonLd, type Lang } from './src/lib/render-products';

interface PackageJson {
  version: string;
}

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as PackageJson;
const version = process.env.VITE_APP_VERSION || pkg.version;
const buildSha = (process.env.VITE_BUILD_SHA || 'dev').slice(0, 7);
const versionLabel = `v${version} · ${buildSha}`;

function inject(): Plugin {
  return {
    name: 'ayco-inject',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const lang: Lang = ctx.path?.startsWith('/en/') ? 'en' : 'uk';
        return html
          .replace('<!--inject:cards-->', renderCards(products, lang))
          .replace('<!--inject:terminal-->', renderTerminal(products))
          .replace(/\{\s*"_inject"\s*:\s*"jsonld-products"\s*\}/, renderJsonLd(products))
          .replaceAll('<!--inject:version-->', versionLabel);
      },
    },
  };
}

export default defineConfig({
  plugins: [checker({ typescript: true }), inject()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: {
        uk: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
});
