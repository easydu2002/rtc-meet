import { reactive } from "vue";

interface User {
  username: string,
  token?: string
}

interface UserStore {

  userInfo?: User,
  isAuthenticated: boolean
}

export const theUserStore: UserStore = reactive({
  isAuthenticated: true
})