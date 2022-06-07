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
import { ProductWrapper, Product, Title } from '../components/Product'
import { useLocation, useNavigate } from 'react-router';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;


const Category = ({ history }) => {
  const navigateState = useLocation().state;
  const category = (navigateState && navigateState.category );
  
  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>
          {category}
        </Title>
        <ProductWrapper>
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
        </ProductWrapper>
        <ProductWrapper>
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'} />
          <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'} />
          <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'} />
          <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'} />
          <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'} />
        </ProductWrapper>
      </CardWrapper>

    </Body >
  )
}

export default Category;
