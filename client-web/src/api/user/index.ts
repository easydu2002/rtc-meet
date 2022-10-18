import { http } from "../request";

export const getFriendsList = () => http.get('/meet-api/friend/*')