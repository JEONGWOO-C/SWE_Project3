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
import { ProductWrapper, PrintProducts, Title } from "../components/Product";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Home = ({ history }) => {
  var [popularPosts, setPopularPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/todayPopularPosts")
      .then(({ data }) => setPopularPosts(data));
  }, []);

  var [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/recentUploadedPosts")
      .then(({ data }) => setRecentPosts(data));
  }, []);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>금일 인기 매물</Title>
        <ProductWrapper>
          {PrintProducts(popularPosts, popularPosts.length, 5)}
        </ProductWrapper>
        <Title>최근 등록된 매물</Title>
        <ProductWrapper>
          {PrintProducts(recentPosts, recentPosts.length, 5)}
        </ProductWrapper>
      </CardWrapper>
    </Body>
  );
};

export default Home;
