export function useLoading(initValue = false) {
  const loading = ref(initValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return {
    loading,
    setLoading,
    startLoading() {
      setLoading(true);
    },
    endLoading() {
      setLoading(false);
    },
    toggleLoading() {
      setLoading(!loading.value);
    },
  };
}
