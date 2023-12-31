import {Card, CardBody, CardFooter, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";

const Register = () => {

    return (
        <Card className={'w-25'}>
            <CardBody>
                <CardTitle as={'h3'} className={'mb-4'}>Registration</CardTitle>
                <CardText>
                    <RegisterForm/>
                </CardText>
            </CardBody>
            <CardFooter>
                <CardText className={'d-flex justify-content-between'}>
                    <Link to="/auth/login">Login</Link>
                </CardText>
            </CardFooter>
        </Card>
    );

}

export default Register;
