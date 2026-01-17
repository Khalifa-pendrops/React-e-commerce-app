import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { mobile } from "../responsive";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    background: transparent;
    color: var(--ink);
`;

const BackRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 20px 0;
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

const Title = styled.h1`
    margin: 20px;
    color: var(--ink);
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: var(--card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    margin: 0 20px;
    padding: 10px 0;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    color: var(--muted);
    ${mobile({marginRight: "0px" })}
`;

const Select = styled.select`
    font-size: 16px;
    font-weight: 600; 
    padding: 10px;
    margin-right: 20px;
    background: var(--card);
    color: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    ${mobile({margin: "10px 0px" })}
`;

const SearchInput = styled.input`
    width: 240px;
    padding: 10px 14px;
    background: var(--card);
    color: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    ${mobile({width: "100%" })}
`;

const Option = styled.option`
    font-size: 15px;
`;

const ProductList = () => {
    const { category } = useParams();
    const location = useLocation();
    const history = useHistory();
    const cat = category && category !== "all" ? category : null;
    const [filters,setFilters] = useState({});
    const [sort,setSort] = useState("newest");
    const searchTerm = new URLSearchParams(location.search).get("q") || "";
    const [searchValue, setSearchValue] = useState(searchTerm);

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            history.goBack();
        } else {
            history.push("/");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const params = new URLSearchParams(location.search);
        if (value.trim()) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        history.replace({ pathname: location.pathname, search: params.toString() });
    };

    return (
        <Container>
            <Announcement />
            <Navbar />
            <BackRow>
                <BackButton type="button" onClick={handleBack}>Back</BackButton>
            </BackRow>
            <Title>{cat || "All Products"}</Title>
            <FilterContainer>
                {cat && (
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                )}
                <Filter>
                    <FilterText>Search:</FilterText>
                    <SearchInput
                        placeholder="Search products"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} searchTerm={searchTerm} showAll />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList
