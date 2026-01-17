import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import { mobile } from '../responsive';

const SectionTitle = styled.h2`
    margin: 20px;
    font-size: 28px;
    font-weight: 600;
    color: var(--ink);
    ${mobile({margin: "20px 10px", fontSize: "22px"})}
`;

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar/>
            <Slider />
            <SectionTitle>Categories</SectionTitle>
            <Categories />
            <SectionTitle>Featured Products</SectionTitle>
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home
