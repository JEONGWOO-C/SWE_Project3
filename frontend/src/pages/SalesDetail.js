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
import { getInfoFromCookie } from "../components/Auth";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const SalesDetail = ({ history }) => {
  var info = getInfoFromCookie();
  var [SoldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getSoldProducts", {
        headers: { token: info.token },
      })
      .then(({ data }) => {
        setSoldProducts(data);
      });
  }, []);
  console.log(SoldProducts);
  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>판매내역</Title>
        {PrintProducts(SoldProducts, SoldProducts.length, 3)}
      </CardWrapper>
    </Body>
  );
};

export default SalesDetail;
