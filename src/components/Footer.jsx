import styled from "styled-components";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  background: var(--card);
  color: var(--ink);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0px 40px;
  padding: 20px;
  ${tablet({ marginLeft: "-10px" })}
  ${tablet({ margin: "0px", padding: "20px" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: var(--muted);
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 30px;
  ${mobile({ display: "none" })}
  ${tablet({ marginLeft: "-60px" })}
  ${tablet({ marginLeft: "0px", padding: "20px" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: var(--ink);
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${tablet({ width: "30vw" })}
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: var(--muted);
`;

const Right = styled.div`
  flex: 1;
  padding: 30px;
  ${mobile({ backgroundColor: "transparent" })}
  ${tablet({ marginLeft: "-20px" })}
  ${tablet({ marginLeft: "0px", padding: "20px" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: var(--muted);
`;

const Payment = styled.img`
  width: 50%;
`;

const Brand = styled.div`
  font-family: "Space Grotesk", "Segoe UI", sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: var(--ink);
  text-shadow: 0 0 12px rgba(255, 59, 212, 0.35);
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Brand>Real Trift</Brand>
        <Desc>
          We're one of the best E-Commerce store in Africa, You can order any
          variations of products you want and we make sure we give best product
          you can possibly think of. We take our customer's satisfaction, as our
          No.1 priority and that's why we're the best.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Mens Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tacking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms&Condition</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 103, Grader Street, New
          Heaven, Enugu, Nigeria.
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +234 9000 90000
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@realtrift.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
