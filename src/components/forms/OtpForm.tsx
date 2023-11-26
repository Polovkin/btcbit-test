import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import AuthHook from "../../hooks/auth.hook";
import HttpService from "../../services/Http.service";
import {useNavigate} from "react-router-dom";

const OtpForm = () => {
    const {enterOtp} = AuthHook(HttpService)
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity()) {
            event.preventDefault();
            setValidated(true);
            enterOtp();
        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="number" minLength={4} maxLength={4} required
                className="form-control mb-2 mx-1"/>
            <Button variant="success" className="mt-4 mb-2 w-100" type="submit">Login</Button>
        </Form>
    )
}

export default OtpForm
