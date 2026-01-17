import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useHistory, useLocation } from "react-router-dom";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { sampleProducts } from "../data";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useToast } from "../components/Toast";

const Container = styled.div`
    color: var(--ink);
`;

const Wrapper= styled.div`
    padding: 50px;
    display: flex;
    gap: 30px;
    ${mobile({padding: "10px", flexDirection: "column" })}
`;

const BackRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 0 20px;
`;

const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: var(--card);
    color: var(--ink);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    border-radius: 20px;
    ${mobile({height: "50vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    background: var(--card);
    border-radius: 20px;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
    padding: 40px;
    ${mobile({padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 400;
    color: var(--ink);
`;

const Desc = styled.p`
    margin: 20px 0px;
    color: var(--muted);
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
    color: var(--ink);
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 300;
    color: var(--muted);
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.25);
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    background: var(--card);
    color: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    color: var(--ink);
    & svg {
        cursor: pointer;
    }
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: none;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    font-weight: 500;
    border-radius: 999px;

    &:hover {
        transform: translateY(-1px);
    }
`;

const Product = () => {
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const { pushToast } = useToast();

    useEffect(()=>{
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch {
                const fallback = sampleProducts.find((item) => item._id === id);
                if (fallback) {
                    setProduct(fallback);
                }
            }
        };
        getProduct()
    },[id]);

    const handleQuantity = (type) => {
        if(type === "des") {
            quantity>1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1) 
        }
    };
    
    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
        pushToast("Added to cart", "success");
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            history.goBack();
        } else {
            history.push("/products");
        }
    };
    
    return (
        <Container>
            <Announcement />
            <Navbar />
            <BackRow>
                <BackButton type="button" onClick={handleBack}>Back</BackButton>
            </BackRow>
            <Wrapper>
                <ImgContainer>
                <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize> 
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("des")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer /> 
        </Container>
    )
}

export default Product
