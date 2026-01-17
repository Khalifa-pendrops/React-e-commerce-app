import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useToast } from "./Toast";

const Container = styled.div`
    min-height: 60vh;
    background: var(--card);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    ${mobile({padding: "40px 20px"})}
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    color: var(--ink);
    ${tablet({fontSize: "48px"})}
    ${mobile({fontSize: "36px", textAlign: "center"})}
`;

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    color: var(--muted);
    ${mobile({textAlign: "center" })}
    ${mobile({fontSize: "18px"})}
`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: var(--card-soft);
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    ${mobile({width: "80%" })}
    ${tablet({width: "70%" })}
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    background: transparent;
    color: var(--ink);
    &::placeholder {
        color: var(--muted);
    }
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const Newsletter = () => {
    const { pushToast } = useToast();
    return (
        <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favorite products.</Desc>
        <InputContainer>
            <Input placeholder="Your Email" />
            <Button
                type="button"
                onClick={() => pushToast("Thanks for subscribing!", "success")}
            >
            <Send />
            </Button>
        </InputContainer>
        </Container>
    );
};

export default Newsletter;
