import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
`

const Announcement = () => {
    return (
        <Container>
            Super Deal! Free shipping on Orders over $50
        </Container>
    )
}

export default Announcement
