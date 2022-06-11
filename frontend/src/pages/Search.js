import React, { useState, useEffect } from "react";
import { CardWrapper, CardHeading } from "../components/Card";
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
  const search = navigateState && navigateState.search;
  const result = navigateState && navigateState.result;

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>'{search}'에 대한 검색결과 입니다.</Title>
          {result.length
            ? PrintProducts(result, result.length, 5)
            :<CardHeading style={{width: '100%'}}>"해당 검색어에 대한 게시물이 존재하지 않습니다."</CardHeading>
          }
      </CardWrapper>
    </Body>
  );
};

export default Category;
