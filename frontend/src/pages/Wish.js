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
import logo from "../imgs/logo192.png"; // 예시 사진
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

const Wish = ({ history }) => {
  const info = getInfoFromCookie();
  const [wishList, setWishList] = useState([]);
  const [viewIsSelling, setViewIsSelling] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wishlist", {
        headers: { token: info.token },
      })
      .then(({ data }) => setWishList(data));
  }, []);
  console.log(wishList);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>찜목록</Title>
        {wishList.length === 0 ? (
          <CardHeading style={{ width: "100%" }}>
            "찜 목록 상품이 존재하지 않습니다."
          </CardHeading>
        ) : <div>
          <div style={{ marginTop: '-40px', paddingBottom: '20px', paddingLeft: '1020px' }}><input type={'checkbox'} onClick={() => { setViewIsSelling(!viewIsSelling) }} /> 거래완료 상품 보지 않기</div>
          {PrintProducts(wishList, wishList.length, 5, viewIsSelling)}
        </div>}
      </CardWrapper>
    </Body>
  );
};

export default Wish;
