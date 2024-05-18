"use client"

import AccountService from "@/services/AccountService";
import { AppContext } from "@/state/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validationError, setValidationError] = useState("");

    const { userInfo, setUserInfo } = useContext(AppContext)!;

    const validateAndRegister = async () => {
        if (email.length < 5 || pwd.length < 6 || firstName.length < 1 || lastName.length < 1) {
            setValidationError("Invalid input lengths");
            return;
        }

        if (pwd !== repeatPwd) {
            setValidationError("Passwords do not match");
            return;
        }

        const response = await AccountService.register(email, pwd, firstName, lastName);
        if (response.data) {
            setUserInfo(response.data);
            router.push("/");
        }

        if (response.errors && response.errors.length > 0) {
            setValidationError(response.errors[0]);
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <h2>Register</h2>
                <hr />
                <div className="text-danger" role="alert">{validationError}</div>
                <div className="form-floating mb-3">
                    <input
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value); setValidationError(""); }}
                        id="firstName" type="text" className="form-control" placeholder="First Name" />
                    <label htmlFor="firstName" className="form-label">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value); setValidationError(""); }}
                        id="lastName" type="text" className="form-control" placeholder="Last Name" />
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setValidationError(""); }}
                        id="email" type="email" className="form-control" autoComplete="email" placeholder="name@example.com" />
                    <label htmlFor="email" className="form-label">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        value={pwd}
                        onChange={(e) => { setPwd(e.target.value); setValidationError(""); }}
                        id="password" type="password" className="form-control" autoComplete="password" placeholder="Password" />
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        value={repeatPwd}
                        onChange={(e) => { setRepeatPwd(e.target.value); setValidationError(""); }}
                        id="repeatPassword" type="password" className="form-control" autoComplete="repeat-password" placeholder="Repeat Password" />
                    <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                </div>
                <div>
                    <button onClick={(e) => validateAndRegister()} className="w-100 btn btn-lg btn-primary">Register</button>
                </div>
            </div>
        </div>
    );
}
