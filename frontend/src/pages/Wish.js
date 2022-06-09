import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import styled from "styled-components";
import logo from "../imgs/logo192.png"; // 예시 사진
import {
  ProductWrapper,
  Product,
  Title,
  PrintProducts,
} from "../components/Product";
import { getInfoFromCookie } from "../components/Auth";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Wish = ({ history }) => {
  const info = getInfoFromCookie();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wishlist", {
        headers: { token: info.token },
      })
      .then(({ data }) => setWishList(data));
  }, []);
  console.log(wishList);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>찜목록</Title>
        {PrintProducts(wishList, wishList.length, 5)}
      </CardWrapper>
    </Body>
  );
};

export default Wish;
