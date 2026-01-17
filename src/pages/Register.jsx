import styled from "styled-components";
import { mobile } from "../responsive";
import { useToast } from "../components/Toast";
import { Link as RouterLink } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background:
        linear-gradient(rgba(11, 11, 15, 0.7), rgba(11, 11, 15, 0.9)),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: var(--card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
    ${mobile({width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    color: var(--ink);
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    background: #0f111a;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    color: var(--ink);
    &::placeholder {
        color: var(--muted);
    }
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
    color: var(--muted);
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    border-radius: 999px;
`;

const FooterRow = styled.div`
    margin-top: 15px;
    font-size: 14px;
    color: var(--muted);
`;

const FooterLink = styled(RouterLink)`
    margin-left: 6px;
    color: var(--ink);
`;


const Register = () => {
    const { pushToast } = useToast();
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Username" />
                    <Input placeholder="Password" />
                    <Input placeholder="Confirm Password" />
                    <Agreement>
                        By Creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button
                        type="button"
                        onClick={() => pushToast("Account created (demo).", "success")}
                    >
                        CREATE
                    </Button>
                </Form>
                <FooterRow>
                    Already have an account?
                    <FooterLink to="/login">Sign in</FooterLink>
                </FooterRow>
            </Wrapper>
        </Container>
    )
}

export default Register;
