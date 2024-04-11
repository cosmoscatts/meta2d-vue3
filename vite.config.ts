import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables/**',
        'src/stores/**',
        'src/server/**',
      ],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ArcoResolver({ sideEffect: true })],
      dts: 'src/components.d.ts',
    }),
    Icons({
      autoInstall: true,
      scale: 1,
      defaultClass: 'inline-block',
    }),
    Layouts(),
    Unocss(),
  ],
})
