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
import logo from '../imgs/logo192.png'; // 예시 사진
import {ProductWrapper, Product, Title} from '../components/Product'

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const Home = ({ history }) => {
  return(
  
    <Body style={{}}>
      <CardWrapper>
        <Title>
          실시간 인기 매물
        </Title>
        <ProductWrapper>
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
        </ProductWrapper>
        <Title>
          최근 등록된 매물
        </Title>
        <ProductWrapper>
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
        </ProductWrapper>
      </CardWrapper>
    </Body>
  )
}

export default Home;
