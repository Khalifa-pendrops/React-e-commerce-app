import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link as RouterLink } from "react-router-dom";
import { useToast } from "../components/Toast";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background:
        linear-gradient(rgba(11, 11, 15, 0.7), rgba(11, 11, 15, 0.9)),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
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
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
    background: #0f111a;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    color: var(--ink);
    &::placeholder {
        color: var(--muted);
    }
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 999px;
    &:disabled{
        color: #0b0b0f;
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

const Link = styled(RouterLink)`
    margin: 7px 0px;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
    color: var(--muted);
`;

const Error = styled.span`
    color: red;
`;


const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);
    const { pushToast } = useToast();
    const didToastRef = useRef(false);

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password });
    };

    useEffect(() => {
        if (error) {
            pushToast("Login failed. Check your credentials.", "error");
        }
    }, [error, pushToast]);

    useEffect(() => {
        if (currentUser && !didToastRef.current) {
            pushToast("Welcome back!", "success");
            didToastRef.current = true;
        }
    }, [currentUser, pushToast]);
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                    placeholder="Password"
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Something went wrong, try and input your username and password...</Error>}
                    <Link to="/login">Forgot Password?</Link>
                    <Link to="/register">Create An Account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;
