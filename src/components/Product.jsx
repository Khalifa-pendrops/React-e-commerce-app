import { FavoriteBorderOutlined, VisibilityOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(11, 11, 15, 0.6);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 300px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--card);
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);

    &:hover ${Info}{
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.06);
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--card-soft);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
        color: #0b0b0f;
        transform: scale(1.1);
    }
`;

const Product = ({item}) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{color: "var(--ink)"}}>
                    <ShoppingCartOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{color: "var(--ink)"}}>
                    <VisibilityOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{color: "var(--ink)"}}>
                    <FavoriteBorderOutlined />
                    </Link>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product;
