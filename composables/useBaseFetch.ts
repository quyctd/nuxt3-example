export const useBaseFetch = (url: string, options = {}) => {
  const config = useRuntimeConfig()

  return $fetch(`${config.public.apiBaseUrl}${url}`, options)
}
