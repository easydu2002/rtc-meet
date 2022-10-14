import { ref } from "vue"

export const useFetch = function(url: string, options: RequestInit) {
  
  const data = ref(null)
  const error = ref(null)

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}