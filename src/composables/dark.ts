export const isDark = useDark()

export function toggleDark() {
  isDark.value = !isDark.value
}

export function createArcoTheme() {
  if (isDark.value)
    document.body.setAttribute('arco-theme', 'dark')
  else document.body.removeAttribute('arco-theme')
}

watch(isDark, createArcoTheme, { immediate: true })
