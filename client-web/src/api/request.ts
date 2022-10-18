
export const http = {

  baseUrl: 'http://192.168.0.4:10393/mock/10c40527-f7fc-4b3a-b5bf-cc501dd720ba',

  get: async (url: string, options?: RequestInit) => {

    return await fetch(http.baseUrl + url, { method: 'get', ...options },).then(async resp => await resp.json())
  },

  post: async (url: string, options?: RequestInit) => {

    return await fetch(http.baseUrl + url, { method: 'post', ...options }).then(async resp => await resp.json())
  },

  put: async (url: string, options?: RequestInit) => {

    return await fetch(http.baseUrl + url, { method: 'put', ...options }).then(async resp => await resp.json())
  },

  delete: async (url: string, options?: RequestInit) => {

    return await fetch(http.baseUrl + url, { method: 'delete', ...options}).then(async resp => await resp.json())
  }


}