
import { defineComponent, reactive, provide, inject } from 'vue';
export interface IUserInfo {
    "token": string,
    "refreshToken": string,
    "firstName": string,
    "lastName": string
}

interface IUserContext {
    userInfo: IUserInfo | null;
    setUserInfo: (userInfo: IUserInfo | null) => void;
}

// Create a reactive state for user information
const state = reactive<IUserContext>({
    userInfo: null,
    setUserInfo(userInfo: IUserInfo | null) {
        state.userInfo = userInfo;
    }
});

export default defineComponent({
    name: 'AppContext',
    setup() {

        provide('userContext', state);

        return {};
    }
});

// Export a function to inject the state in other components
export function useUserContext() {
    const userContext = inject<IUserContext>('userContext');
    if (!userContext) {
        throw new Error('useUserContext must be used within a provider');
    }
    return userContext;
}
