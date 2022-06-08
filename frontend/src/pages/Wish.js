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
import { ProductWrapper, Product, Title } from "../components/Product";
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
        <ProductWrapper>
          {wishList.map((post) => (
            <Product
              key={post.title}
              logo={logo}
              name={post.title}
              price={post.price}
            />
          ))}
        </ProductWrapper>
        <ProductWrapper>
          <Product
            key={"컨테이너"}
            logo={logo}
            name={"컨테이너"}
            price={"1,000,000원"}
          />
          <Product
            key={"없음"}
            logo={logo}
            name={"없음"}
            price={"1,000,000원"}
          />
          <Product
            key={"없음"}
            logo={logo}
            name={"없음"}
            price={"1,000,000원"}
          />
          <Product
            key={"없음"}
            logo={logo}
            name={"없음"}
            price={"1,000,000원"}
          />
          <Product
            key={"없음"}
            logo={logo}
            name={"없음"}
            price={"1,000,000원"}
          />
        </ProductWrapper>
      </CardWrapper>
    </Body>
  );
};

export default Wish;
