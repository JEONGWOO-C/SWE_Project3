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
import {
  ProductWrapper,
  Product,
  Title,
  PrintProducts,
} from "../components/Product";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const PurchaseDetail = ({ history }) => {
  var info = getInfoFromCookie();
  var [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getPurchasedProducts", {
        headers: { token: info.token },
      })
      .then(({ data }) => {
        setPurchasedProducts(data);
      });
  }, []);
  console.log(purchasedProducts);
  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>구매내역</Title>
        {PrintProducts(purchasedProducts, purchasedProducts.length, 5, false, true)}
      </CardWrapper>
    </Body>
  );
};

export default PurchaseDetail;
