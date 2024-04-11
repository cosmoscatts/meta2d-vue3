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
      'text-base': 'text-#232323 dark:text-#f3f3f3',
      'border-base': 'border-#aaa3',
      'border-box': 'border border-base border-solid rounded',
      'bg-base': 'bg-white dark:bg-#101828',
      'bg-glass': 'bg-white:75 dark:bg-#101828:75 backdrop-blur-5',
      'bg-hover': 'bg-gray:5',
      'bg-active': 'bg-gray:10',
      'text-button': 'border-box bg-hover hover:bg-active px3 py1 cursor-pointer flex gap-1 items-center justify-center',
      'icon-button': 'border-box bg-hover hover:bg-active p1 cursor-pointer',
      'icon-button-sm': 'icon-button p0.5 text-sm cursor-pointer',
      'action-button': 'border border-base border-solid rounded flex gap-2 items-center cursor-pointer px2 py1 text-sm op75 hover:op100 hover:bg-hover',
      'action-button-active': 'bg-primary/10 dark:bg-primary/15 text-primary border border-base border-solid rounded flex gap-2 items-center cursor-pointer px2 py1 text-sm op75 hover:op100',
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
      primary: '#722ED1',
    },
  },
  safelist: [
    'i-fluent:fast-acceleration-20-regular',
    'i-fluent:top-speed-20-regular',
    'i-fluent:location-ripple-16-regular',
    'i-fluent:temperature-16-regular',
  ],
})
