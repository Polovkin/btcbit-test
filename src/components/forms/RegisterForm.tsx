import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import AppInput from "../inputs/AppInput";
import AuthHook from "../../hooks/auth.hook";
import HttpService from "../../services/Http.service";

const RegisterForm = () => {

    const {register} = AuthHook(HttpService)
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity()) {
            event.preventDefault();
            setValidated(true);
            const response = await register({email, password, username});


        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <AppInput required
                      value={username}
                      setValue={setUsername}
                      id={'username'}
                      invalidFeedback={"Must be at least 2 characters long."}
                      type="text"
                      placeholder="Username"
            />
            <AppInput required
                      value={email}
                      setValue={setEmail}
                      id={'email'}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      invalidFeedback={"Please provide a valid email."}
                      type="email"
                      placeholder="Email"
            />
            <AppInput required
                      value={password}
                      setValue={setPassword}
                      id={'password'}
                      minLength={8}
                      invalidFeedback={"Must be at least 8 characters long."}
                      type="password"
                      placeholder="Password"
            />
            <AppInput required
                      value={repeatPassword}
                      setValue={setRepeatPassword}
                      id={'password'}
                      minLength={8}
                      invalidFeedback={"Must be at least 8 characters long."}
                      type="password"
                      placeholder="Repeat password"
            />
            <Button variant="success" className="mt-4 mb-2 w-100" type="submit">Register</Button>
        </Form>
    )
}

export default RegisterForm

