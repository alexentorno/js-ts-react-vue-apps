import { reactive } from 'vue';

export const state = reactive({
  userInfo: JSON.parse(localStorage.getItem('userInfo') ?? "[]"),
});

export interface IUserInfo {
    "jwt": string,
    "refreshToken": string,
    "email": string
}

export const setUserInfo = (userInfo: IUserInfo | null) => {
  state.userInfo = userInfo;
};