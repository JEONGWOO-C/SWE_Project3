import React, { useState, useEffect } from 'react';
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
} from '../components/Card';
import styled from 'styled-components';
import {
  ProductWrapper,
  Product,
  Title,
  PrintProducts,
} from "../components/Product";

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const SalesDetail = ({ history }) => {
  return(
  
    <Body style={{}}>
      <CardWrapper>
        <Title>판매내역</Title>
      </CardWrapper>
    </Body>
  )
}

export default SalesDetail;