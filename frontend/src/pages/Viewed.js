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
import { ProductWrapper, Product, Title } from '../components/Product';
import { getInfoFromCookie } from '../components/Auth';
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;


const Viewed = ({ history }) => {
  var [recentViewTop5,setRecentViewTop5] = useState([]);
  var [recentViewTop10,setRecentViewTop10] = useState([]);
  var [recentView,setRecentView] = useState([]);
  useEffect(() => {
    console.log(getInfoFromCookie());
    axios
      .post("http://localhost:4000/userRecentPosts",{
        id:'test1'
      })
      .then(({ data }) => setRecentView(data));
  }, [])

  console.log(recentView);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>
          최근본상품
        </Title>
        <ProductWrapper>
          {recentView.map((item, ind) => {
            if(ind<5)
              return(
                <Product
                  item={item}
                />)
          })}
        </ProductWrapper>
        <ProductWrapper>
          {recentView.map((item, ind) => {
            if(ind>=5)
              return(
                <Product
                  item={item}
                />)
          })}
        </ProductWrapper>
      </CardWrapper>

    </Body >
  )
}

export default Viewed;
