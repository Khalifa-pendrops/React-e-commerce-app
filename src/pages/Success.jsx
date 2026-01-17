import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import styled from "styled-components";
import { CheckCircleOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { Link } from 'react-router-dom';


const Button = styled.button`
    padding: 10px 20px;
    margin-top: 15px;
    font-size: 15px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(90deg, var(--brand), var(--brand-2), var(--brand-3));
    color: #0b0b0f;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Message = styled.div`
    color: var(--ink);
    font-size: 18px;
    text-align: center;
    max-width: 520px;
`;

const Success = () => {
  const location = useLocation();
  const stripeData = location.state?.stripeData;
  const cart = location.state?.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        if (!stripeData || !cart || !currentUser) return;
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: stripeData.billing_details?.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    createOrder();
  }, [cart, stripeData, currentUser]);

  return (
    <>
      <Announcement />
      <Navbar />
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
        <Icon>
        <CheckCircleOutlined />
        </Icon>
        <Message>
          {orderId
            ? `Order has been created successfully. Your order number is ${orderId}`
            : `Successfull. Your order is being prepared...`}
        </Message>
        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div></>
  );
};

export default Success;
