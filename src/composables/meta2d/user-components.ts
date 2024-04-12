const templates = ref<UserTemplate[]>([]) // [{ id, data, name, image }]

export function useUserComponents() {
  function loadTemplates() {
    const data = localStorage.getItem('meta2d-templates')

    if (data)
      templates.value = JSON.parse(data)
  }
  return {
    templates,
    loadTemplates,
  }
}
