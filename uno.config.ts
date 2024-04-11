import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'hw-full': 'h-full w-full',
      'hw-screen': 'h-screen w-screen',
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-col-center': 'flex-col flex-center',
      'icon-btn': 'op30 hover:op100 hover:text-primary!',
      'border-base': 'border-[var(--color-neutral-3)]',
    },
    [/^btn-(\w+)$/, ([_, color]) => `op90 px2.5 py1 transition-all duration-200 ease-out no-underline! cursor-pointer hover:(text-${color} bg-${color}/10) border border-base! rounded`],
    [/^tag-(\w+)$/, ([_, color]) => `op90 px2.5 py1 transition-all duration-200 ease-out no-underline! cursor-pointer text-${color} bg-${color}/10 border border-base! rounded`],
  ],
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
      xxl: '1920px',
    },
    colors: {
      primary: 'rgba(var(--primary-6))',
      primary_hover: 'rgba(var(--primary-5))',
      primary_click: 'rgba(var(--primary-7))',
    },
  },
  safelist: [
    'i-fluent:fast-acceleration-20-regular',
    'i-fluent:top-speed-20-regular',
    'i-fluent:location-ripple-16-regular',
    'i-fluent:temperature-16-regular',
  ],
})
