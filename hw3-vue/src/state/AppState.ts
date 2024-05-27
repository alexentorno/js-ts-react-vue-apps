import { reactive } from 'vue';

export const state = reactive({
  userInfo: JSON.parse(localStorage.getItem('userInfo') ?? "[]"),
});

export interface IUserInfo {
    "token": string,
    "refreshToken": string,
    "firstName": string,
    "lastName": string
}

export const setUserInfo = (userInfo: IUserInfo | null) => {
  state.userInfo = userInfo;
};