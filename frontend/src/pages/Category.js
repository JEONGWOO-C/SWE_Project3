import React, { useState, useEffect } from "react";
import { CardWrapper } from "../components/Card";
import styled from "styled-components";
import { ProductWrapper, Title, PrintProducts } from "../components/Product";
import { useLocation } from "react-router";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Category = ({ history }) => {
  const navigateState = useLocation().state;
  const category = navigateState && navigateState.category;

  var [categoryPosts, setCategoryPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/categoryPosts", {
        params: {
          category: category,
        },
      })
      .then(({ data }) => setCategoryPosts(data));
  }, []);
  console.log(categoryPosts);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>{category}</Title>
        <ProductWrapper>
          {categoryPosts.length === 0
            ? "해당 카테고리의 게시물이 존재하지 않습니다."
            : PrintProducts(categoryPosts, categoryPosts.length, 5)}
        </ProductWrapper>
      </CardWrapper>
    </Body>
  );
};

export default Category;
