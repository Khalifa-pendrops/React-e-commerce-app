import styled from "styled-components";
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Add, Remove, ArrowBack } from "@material-ui/icons";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect, useRef } from "react";
import {userRequest} from "../requestMethods";
import { useHistory } from "react-router-dom";
import { removeProduct, updateProductQuantity } from "../redux/cartRedux";
import { useToast } from "../components/Toast";

const KEY = "pk_test_51Jd1ChCYOHuWVZqtCJKwbfxUgo9ljfiWf4SfBk68NJ1kS09KuaA2X4x0H1NyoaQjRUrZ827v7TLmhmkBwDsvqbTW00YiP4GJm0";

const Container = styled.div`
    min-height: 100vh;
    background: var(--bg);
`;

const Wrapper = styled.div`
    padding: 30px 20px 60px;
    max-width: 1200px;
    margin: 0 auto;
    ${mobile({padding: "10px" })}
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
    border: 1px solid rgba(32, 34, 43, 0.15);
    background: var(--card);
    color: var(--ink);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    &:hover {
        border-color: rgba(32, 34, 43, 0.35);
        transform: translateY(-1px);
    }
`;

const Title = styled.h1`
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.5px;
    ${mobile({fontSize: "22px"})}
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    background: var(--card);
    border-radius: 16px;
    box-shadow: 0 12px 30px rgba(16, 24, 40, 0.08);
    gap: 12px;
    flex-wrap: wrap;
`;

const TopButton = styled.button`
    padding: 12px 18px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 999px;
    border: ${props=> props.type === "filled" ? "none" : "1px solid rgba(32, 34, 43, 0.2)"};
    background: ${props=> props.type === "filled" ? "linear-gradient(66deg, rgba(26,215,143,0.98) 41%, rgba(0,212,255,1) 100%)" : "transparent"};
    color: ${props=> props.type === "filled" ? "white" : "var(--ink)"};
    transition: all 0.2s ease;
    &:hover {
        transform: translateY(-1px);
        box-shadow: ${props=> props.type === "filled" ? "0 10px 20px rgba(0, 212, 255, 0.25)" : "none"};
    }
`;

const TopTexts = styled.div`
    ${mobile({display: "none" })}
`;

const TopText = styled.span`
    color: var(--muted);
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 30px;
    ${mobile({flexDirection: "column" })}
    ${tablet({flexDirection: "column"})}
`;

const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const EmptyCart = styled.div`
    padding: 30px;
    background: var(--card);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--muted);
    text-align: center;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    background: var(--card);
    border-radius: 18px;
    box-shadow: 0 12px 26px rgba(16, 24, 40, 0.08);
    ${mobile({flexDirection: "column" })} 
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    gap: 20px;
    ${mobile({padding: "10px", flexDirection: "column", alignItems: "center", justifyContent: "center",})}
    ${tablet({flexDirection: "column", alignItems: "flex-start"})}
`;

const Image = styled.img`
    width: 200px; 
    border-radius: 16px;
    object-fit: cover;
    ${mobile({width: "150px"})}
    ${tablet({width: "100%", maxWidth: "280px"})}
`;

const Details = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ProductName = styled.span`
    color: var(--ink);
`;

const ProductId = styled.span`
    color: var(--muted);
`;

const RemoveButton = styled.button`
    align-self: flex-start;
    margin-top: 6px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--muted);
    padding: 6px 10px;
    border-radius: 999px;
    cursor: pointer;
    &:hover {
        color: var(--ink);
        border-color: rgba(255, 255, 255, 0.3);
    }
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color}
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProductSize = styled.span`
    color: var(--muted);
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--ink);
    ${tablet({alignItems: "flex-start"})}
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--card-soft);
    & svg {
        cursor: pointer;
        color: #0b0b0f;
    }
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 0;
    ${mobile({margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
    font-size: 28px;
    font-weight: 600;
    ${mobile({marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eef2f7;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: none;
    border-radius: 18px;
    padding: 24px;
    background: var(--card);
    box-shadow: 0 14px 30px rgba(16, 24, 40, 0.08);
    height: fit-content;
    position: sticky;
    top: 20px;
    ${tablet({position: "static"})}
`;

const SummaryTitle = styled.h1`
    font-weight: 600;
    font-size: 22px;
`;

const SummaryItem = styled.div`
    margin: 18px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
    color: var(--ink);
`;

const SummaryItemText = styled.span`
    color: var(--muted);
`;

const SummaryItemPrice = styled.span`
    color: var(--ink);
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const checkoutButtonRef = useRef(null);
    const summaryRef = useRef(null);
    const dispatch = useDispatch();
    const { pushToast } = useToast();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            history.goBack();
        } else {
            history.push("/");
        }
    };

    const handleContinueShopping = () => {
        history.push("/products");
        pushToast("Back to products", "info");
    };

    const handleCheckoutClick = () => {
        if (!cart.products.length) {
            pushToast("Your cart is empty.", "error");
            return;
        }
        if (summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (checkoutButtonRef.current) {
            checkoutButtonRef.current.click();
        }
        pushToast("Opening checkout…", "info");
    };

    const handleQuantityChange = (product, delta) => {
        dispatch(
            updateProductQuantity({
                productId: product._id,
                color: product.color,
                size: product.size,
                delta,
            })
        );
        pushToast(delta > 0 ? "Added one more item" : "Removed one item", "info");
    };

    const handleRemoveItem = (product) => {
        dispatch(
            removeProduct({
                productId: product._id,
                color: product.color,
                size: product.size,
            })
        );
        pushToast("Item removed from cart", "info");
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                history.push("/success", {
                    stripeData: res.data,
                    cart,
                });
            } catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart, history]);
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <BackRow>
                    <BackButton type="button" onClick={handleBack}>
                        <ArrowBack fontSize="small" />
                        Back
                    </BackButton>
                </BackRow>
                <Title>YOUR CART</Title>
                <Top>
                    <TopButton type="button" onClick={handleContinueShopping}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag ({cart.quantity})</TopText>
                        <TopText>Your Wishlists (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={handleCheckoutClick}>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.length ? (
                            <>
                                {cart.products.map((product) => (
                                    <Product key={`${product._id}-${product.color}-${product.size}`}>
                                        <ProductDetail>
                                            <Image src={product.img} />
                                            <Details>
                                                <ProductName>
                                                    <b>Product:</b> {product.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {product._id}
                                                </ProductId>
                                                <ProductColor color={product.color} /> 
                                            <ProductSize>
                                                <b>Size:</b> {product.size}
                                            </ProductSize>
                                            <RemoveButton
                                                type="button"
                                                onClick={() => handleRemoveItem(product)}
                                            >
                                                Remove
                                            </RemoveButton>
                                        </Details>
                                    </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Add onClick={() => handleQuantityChange(product, 1)} />
                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                <Remove onClick={() => handleQuantityChange(product, -1)} />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                $ {product.price * product.quantity}
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                ))}
                                <Hr />
                            </>
                        ) : (
                            <EmptyCart>Your cart is empty. Add something you love.</EmptyCart>
                        )}
                    </Info>
                    <Summary ref={summaryRef}>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 7.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -7.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Real Trift"
                            image="https://i.ibb.co/gFKrpxQ/icon.png"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button ref={checkoutButtonRef} disabled={!cart.products.length}>
                                CHECKOUT NOW
                            </Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
