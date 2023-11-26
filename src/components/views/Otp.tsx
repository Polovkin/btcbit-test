import {Card, CardBody, CardFooter, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";

import OtpForm from "../forms/OtpForm";

const Otp = () => {

    return (
        <Card className={'w-25'}>
            <CardBody>
                <CardTitle as={'h3'} className={'mb-4'}>Enter OTP</CardTitle>
                <OtpForm/>
            </CardBody>
            <CardFooter>
                <CardText className={'d-flex justify-content-between'}>
                    <Link to="/auth/login">Login</Link>
                </CardText>
            </CardFooter>
        </Card>
    )
}

export default Otp
