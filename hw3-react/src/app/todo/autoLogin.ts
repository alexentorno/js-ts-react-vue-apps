import AccountService from "@/services/AccountService";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect } from "react";

export default function AutoLogin() {

    const { userInfo, setUserInfo } = useContext(AppContext)!;
    if (!userInfo) {
        useEffect(() => {
            const validateAndLogin = async () => {
                const response = await AccountService.login("alpekh@gmail.com", "First_1");
                if (response.data) {
                    setUserInfo(response.data);
                }
            };

            validateAndLogin();
        }, []);
    }

}
