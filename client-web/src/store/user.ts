import { reactive } from "vue";

interface User {
  id: number,
  username: string,
  token?: string
}

interface UserStore {

  userInfo?: User,
  isAuthenticated: boolean
}

export const theUserStore: UserStore = reactive({
  isAuthenticated: true,
  userInfo: {
    id: 10000,
    username: 'easydu',
  }
})