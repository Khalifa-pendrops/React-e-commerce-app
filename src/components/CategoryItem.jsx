import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useToast } from "./Toast";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
    ${tablet({height: "45vh"})}
    ${mobile({height: "30vh"})}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height: "30vh" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: linear-gradient(180deg, rgba(10, 10, 15, 0.2) 10%, rgba(10, 10, 15, 0.85) 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    letter-spacing: 1px;
    ${tablet({fontSize: "25px" })}
`;

const Button = styled.button`
    border:none;
    border-radius: 50px;
    padding: 12px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color:#0b0b0f;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.5s ease;
    ${tablet({fontSize: "12px" })}

    &:hover {
        transform: scale(1.2);
    }
`;

const CategoryItem = ({ item }) => {
    const { pushToast } = useToast();
    return (
        <Container>
            <Link
                to={`/products/${item.cat}`}
                onClick={() => pushToast(`Browsing ${item.title}`, "info")}
            >
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
        );
    };

export default CategoryItem;
