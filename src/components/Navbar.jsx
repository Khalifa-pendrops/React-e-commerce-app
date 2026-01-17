import React from 'react';
import styled from 'styled-components';
import { laptop, mobile } from '../responsive';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from "react-router-dom";

const Container = styled.div`
    height: 70px;
    background: rgba(11, 11, 15, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    ${mobile({height: "60px" })}
`

const Wrapper = styled.div`
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.div`
    font-size: 13px;
    cursor: pointer;
    color: var(--muted);
    ${mobile({display: "none" })}
`

const SearchContainer = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    border-radius: 999px;
    background: rgba(21, 23, 32, 0.8);
    ${mobile({marginLeft: "10px"})}
`

const Input = styled.input`
    border: none;
    background: transparent;
    color: var(--ink);
    ${mobile({width: "50px" })} 
    &::placeholder {
        color: var(--muted);
    }
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Brand = styled.div`
    font-family: "Space Grotesk", "Segoe UI", sans-serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: var(--ink);
    text-shadow: 0 0 12px rgba(255, 59, 212, 0.35);
    ${mobile({fontSize: "18px", paddingLeft: "5px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: "2", justifyContent: "center", marginLeft: "-15px", marginRight: "-35px" })}
    ${laptop({padding: "0px 30px" })} 
`

const MenuItem = styled.div`
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: var(--ink);
    margin-left: 25px;
    ${mobile({fontSize: "10px", marginLeft: "8px" })}
    ${laptop({marginLeft: "15px" })}
    
    &:hover {
        padding: 10px 18px;
        background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
        color: #0b0b0f;
        border: none;
        border-radius: 50px;
        transition: all 0.5s ease;
    }
`

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const [searchValue, setSearchValue] = React.useState("");
    const history = useHistory();
    const location = useLocation();

    const handleSearch = () => {
        const query = searchValue.trim();
        if (!query) return;
        const params = new URLSearchParams(location.search);
        params.set("q", query);
        history.push(`/products?${params.toString()}`);
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>ENG</Language>
                    <SearchContainer>
                        <Input
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <Search
                            style={{color: "var(--muted)", fontSize: 16, cursor: "pointer"}}
                            onClick={handleSearch}
                        />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/">
                    <Brand>Real Trift</Brand>
                    </Link>
                </Center>
                <Right>
                    <Link to="/register" style={{textDecoration: "none"}}>
                    <MenuItem>REGISTER</MenuItem>
                    </Link>
                    <Link to="/login" style={{textDecoration: "none"}}>
                    <MenuItem>SIGN IN</MenuItem>
                    </Link>
                    <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
