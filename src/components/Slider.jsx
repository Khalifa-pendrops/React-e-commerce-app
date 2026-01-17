import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {sliderItems} from "../data";
import { laptop, mobile, tablet } from '../responsive';
import { useToast } from "./Toast";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({height: "auto"})} 
    ${tablet({height: "80vh"})}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: rgba(21, 23, 32, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.85;
    z-index: 2;
    color: var(--ink);
`

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    position: relative;
    z-index: 1;
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props=> props.bg};
    color: var(--ink);
    ${mobile({flexDirection: "column", height: "auto", padding: "20px 0"})}
`;
const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
    margin-left: 30px;
    ${tablet({marginLeft: "0px"})}
    ${mobile({width: "100%", marginLeft: "0px"})}
    ${mobile({display: "flex", justifyContent: "center"})}
`;

const Image = styled.img`
    height: 90%;
    padding: 20px 50px;
    ${tablet({height: "70%", padding: "10px 20px"})}
    ${mobile({height: "320px", padding: "0 20px"})}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    margin-right: 30px;
    ${tablet({marginLeft: "-30px" })}
    ${laptop({marginLeft: "-30px" })}
    ${tablet({padding: "20px", marginRight: "10px"})}
    ${mobile({marginRight: "0px", padding: "20px", textAlign: "center"})}
`;

const Title = styled.h1`
    font-size: 70px;
    color: var(--ink);
    ${tablet({fontSize: "50px" })}
    ${mobile({fontSize: "40px" })}
`;

const Desc = styled.p`
    margin: 50px 5px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    color: var(--muted);
    ${tablet({fontSize: "15px" })}
    ${tablet({margin: "20px 5px"})}
    ${mobile({fontSize: "14px", letterSpacing: "2px"})}
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 20px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    transition: all 0.5s ease;
    ${tablet({fontSize: "15px" })}

    &:hover {
        transform: scale(1.1);
    }
`;
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const { pushToast } = useToast();
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
        } else {
            setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (    
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Link
                                to="/products"
                                onClick={() => pushToast("Browsing all products", "info")}
                            >
                            <Button>SHOP NOW</Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}        
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    );
};

export default Slider;
