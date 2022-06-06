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


const Viewed = ({ history }) => {
  return(
  <Body style={{}}>
      <CardWrapper>
        <Title>
          최근본상품
        </Title>
        <ProductWrapper>
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '컨테이너', '1,000,000원')}
        </ProductWrapper>
        <ProductWrapper>
          {Product(logo, '컨테이너', '1,000,000원')}
          {Product(logo, '없음', '1,000,000원')}
          {Product(logo, '없음', '1,000,000원')}
          {Product(logo, '없음', '1,000,000원')}
          {Product(logo, '없음', '1,000,000원')}
        </ProductWrapper>
      </CardWrapper>

    </Body >
  )
}

export default Viewed;
