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
import { PrintProducts, Product, Title } from '../components/Product';
import { getInfoFromCookie } from '../components/Auth';
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;


const Viewed = ({ history }) => {
  const info = getInfoFromCookie();
  var [recentView,setRecentView] = useState([]);
  useEffect(() => {
    console.log(getInfoFromCookie());
    axios
      .get("http://localhost:4000/userRecentPosts",{
        headers: { token: info.token },
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
        {recentView.length === 0
            ? <CardHeading style={{width: '100%'}}>"최근 본 상품이 존재하지 않습니다."</CardHeading>
            : PrintProducts(recentView, recentView.length, 5)}
      </CardWrapper>

    </Body >
  )
}

export default Viewed;
