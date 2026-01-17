import React from 'react';
import styled, { keyframes } from 'styled-components';
import { laptop, mobile, tablet } from '../responsive';
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
    position: sticky;
    top: 0;
    z-index: 200;
    ${mobile({height: "60px" })}
`

const Wrapper = styled.div`
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    ${mobile({padding: "10px 12px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
`

const Language = styled.div`
    font-size: 13px;
    cursor: pointer;
    color: var(--muted);
    ${mobile({display: "none" })}
    ${tablet({display: "none" })}
`

const SearchContainer = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 25px;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(21, 23, 32, 0.8);
    flex: 1;
    max-width: 320px;
    ${mobile({marginLeft: "10px"})}
    ${tablet({marginLeft: "10px", maxWidth: "220px"})}
`

const Input = styled.input`
    border: none;
    background: transparent;
    color: var(--ink);
    ${mobile({width: "100%" })} 
    ${tablet({width: "100%" })}
    &::placeholder {
        color: var(--muted);
    }
`

const Center = styled.div`
    flex: 1;
    text-align: center;
    min-width: 0;
    ${mobile({textAlign: "left"})}
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
    gap: 10px;
    ${mobile({flex: "0", justifyContent: "flex-end", marginLeft: "0", marginRight: "0" })}
    ${laptop({padding: "0px 30px" })} 
    ${tablet({padding: "0px 10px"})}
    ${mobile({display: "none"})}
    ${tablet({display: "none"})}
`

const MenuItem = styled.div`
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: var(--ink);
    margin-left: 10px;
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

const slideIn = keyframes`
    to {
        transform: translateX(0);
    }
`;

const MenuButton = styled.button`
    display: none;
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    ${mobile({display: "inline-flex"})}
    ${tablet({display: "inline-flex"})}
`;

const MenuBars = styled.div`
    width: 18px;
    height: 12px;
    position: relative;
    span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: #ffffff;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    span:nth-child(1) {
        top: 0;
    }
    span:nth-child(2) {
        top: 5px;
    }
    span:nth-child(3) {
        top: 10px;
    }
`;

const MenuBarsOpen = styled(MenuBars)`
    span:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
    }
    span:nth-child(2) {
        opacity: 0;
    }
    span:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
    }
`;

const MobileOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
//   height: 60%;
  background: rgba(11, 11, 15, 0.96);
  backdrop-filter: blur(12px);
  z-index: 1000;
  opacity: 1;
  pointer-events: auto;
  ${mobile({ top: "60px" })}
  ${tablet({ top: "70px" })}
`;

const MobileMenu = styled.div`
    margin: 20px 0 0 auto;
    width: 82%;
    max-width: 320px;
    min-height: 60%;
    height: auto;
    background: transparent;
    border: none;
    border-radius: 18px;
    padding: 28px 22px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    align-items: stretch;
    box-shadow: none;
    transform: translateX(100%);
    animation: ${slideIn} 0.25s ease forwards;
`;

const MobileMenuItem = styled.div`
    width: 100%;
    padding: 12px 16px;
    border-radius: 999px;
    background: #0f111a;
    color: #ffffff;
    font-weight: 600;
    transition: all 0.2s ease;
    &:hover,
    &:active,
    &:focus {
        background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
        color: #0b0b0f;
    }
`;

const OverlaySpacer = styled.div`
    flex: 1;
`;

const MobileActions = styled.div`
    display: none;
    align-items: center;
    gap: 10px;
    ${mobile({display: "flex"})}
    ${tablet({display: "flex"})}
`;

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const [searchValue, setSearchValue] = React.useState("");
    const [menuOpen, setMenuOpen] = React.useState(false);
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
                    <MenuButton type="button" onClick={() => setMenuOpen((prev) => !prev)}>
                        <MenuBars>
                            <span />
                            <span />
                            <span />
                        </MenuBars>
                    </MenuButton>
                </Right>
                <MobileActions>
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                    <MenuButton type="button" onClick={() => setMenuOpen((prev) => !prev)}>
                        {menuOpen ? (
                            <MenuBarsOpen>
                                <span />
                                <span />
                                <span />
                            </MenuBarsOpen>
                        ) : (
                            <MenuBars>
                                <span />
                                <span />
                                <span />
                            </MenuBars>
                        )}
                    </MenuButton>
                </MobileActions>
            </Wrapper>
            {menuOpen && (
                <MobileOverlay onClick={() => setMenuOpen(false)}>
                    <OverlaySpacer />
                    <MobileMenu onClick={(e) => e.stopPropagation()}>
                        <Link to="/register" style={{textDecoration: "none"}} onClick={() => setMenuOpen(false)}>
                            <MobileMenuItem>REGISTER</MobileMenuItem>
                        </Link>
                        <Link to="/login" style={{textDecoration: "none"}} onClick={() => setMenuOpen(false)}>
                            <MobileMenuItem>SIGN IN</MobileMenuItem>
                        </Link>
                        <Link to="/cart" style={{textDecoration: "none"}} onClick={() => setMenuOpen(false)}>
                            <MobileMenuItem>VIEW CART</MobileMenuItem>
                        </Link>
                    </MobileMenu>
                </MobileOverlay>
            )}
        </Container>
    )
}

export default Navbar
