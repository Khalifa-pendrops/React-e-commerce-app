import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { sampleProducts } from "../data";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    ${tablet({justifyContent: "center"})}
    ${mobile({justifyContent: "center"})}
` 

const EmptyState = styled.div`
    width: 100%;
    padding: 40px 20px;
    text-align: center;
    color: var(--muted);
    background: var(--card);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Products = ({ cat, filters, sort = "newest", searchTerm = "", showAll = false }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [useFallback, setUseFallback] = useState(false);


    useEffect(() => {
        const getProducts = async () => {
            if (useFallback) {
                setProducts(
                    cat
                        ? sampleProducts.filter((item) =>
                            item.categories?.includes(cat)
                          )
                        : sampleProducts
                );
                return;
            }
            try {
                const res = await axios.get(
                    cat
                        ? `https://naijashop-production.up.railway.app/api/products?category=${cat}`
                        : "https://naijashop-production.up.railway.app/api/products"
                );
                setProducts(res.data);
            } catch (err) {
                setUseFallback(true);
                setProducts(
                    cat
                        ? sampleProducts.filter((item) =>
                            item.categories?.includes(cat)
                          )
                        : sampleProducts
                );
            }
        };
        getProducts();
    }, [cat, useFallback]);

    useEffect(() => {
        cat && 
            setFilteredProducts(
                products.filter((item) => 
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    },[products,cat,filters]);

    const displayedProducts = useMemo(() => {
        let list = cat ? filteredProducts : products;
        const query = searchTerm.trim().toLowerCase();
        if (query) {
            list = list.filter((item) => {
                const title = item.title?.toLowerCase() || "";
                const desc = item.desc?.toLowerCase() || "";
                return title.includes(query) || desc.includes(query);
            });
        }
        const sorted = [...list];
        if (sort === "newest") {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    }, [cat, filteredProducts, products, searchTerm, sort]);

    return (
        <Container>
            {cat 
            ? (
                displayedProducts.length
                    ? displayedProducts.map((item) => (
                        <Product item={item} key={item._id || item.id} />
                      ))
                    : <EmptyState>No products match this category yet.</EmptyState>
              )
            : (
                displayedProducts.length
                    ? (showAll ? displayedProducts : displayedProducts.slice(0, 8))
                        .map((item) => <Product item={item} key={item._id || item.id} />)
                    : <EmptyState>Products are loading. Check back in a moment.</EmptyState>
              )} 
        </Container>
    );
};

export default Products;
