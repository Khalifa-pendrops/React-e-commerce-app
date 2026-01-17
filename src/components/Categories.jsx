import styled from "styled-components";
import { categories } from "../data";
import { mobile, tablet } from "../responsive";
import CategoryItem from "./CategoryItem";

const  Container = styled.div`
    display: flex;
    padding : 20px;
    justify-content: space-between;
    gap: 20px;
    ${mobile({padding: "0px", flexDirection: "column" })}
    ${tablet({flexWrap: "wrap"})}
`

const Categories = () => { 
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
        ))} 
        </Container>
    )
}

export default Categories
