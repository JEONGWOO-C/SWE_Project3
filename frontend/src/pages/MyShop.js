import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeading,
  CardBody,
  CardButton,
} from "../components/Card";
import styled from "styled-components";
import { BiUser, BiCog } from "react-icons/bi";
import { getTokenFromCookie } from "../components/Auth";
import { Title, PrintProducts, Product } from "../components/Product";
import { useNavigate } from "react-router";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

function score_star(score) {
  // score는 5점 만점
  return (
    <div style={{ dispaly: "flex" }}>
      <div style={{ color: "rgb(214,214,214)", marginTop: "0px", fontSize: "18px" }}>
        ★★★★★ <span style={{ color: "black", fontSize: "18px" }}> {score}</span>
      </div>
      <div
        style={{
          color: "rgb(246,196,15)",
          marginTop: "-24px",
          overflow: "hidden",
          width: score * 18 + "px",
          fontSize: "18px"
        }}
      >
        ★★★★★
      </div>
    </div>
  );
}
function printComments(soldProducts, navigate){
  let array = [];
  for(let i = 0; i<soldProducts.length; i++){
    array.push(
      <div style={{maring: '10px', padding: '10px', width: '400px', background: i%2?'#e6f1ff':'#f0f7ff'}}
      onClick={()=>{navigate('/post', {state:{postnum:soldProducts[i].postnum}})}}>
        <div style={{padding: '0px 4px', fontSize: '18px', fontWeight:' bold'}}>{soldProducts[i].buyer_id}</div>
        <div style={{padding: '2px', marginTop:'-6px'}}>{score_star(soldProducts[i].score)}</div>
        <div style={{padding: '4px 2px', fontSize: '15px'}}>{soldProducts[i].title}</div>
        <div style={{padding: '4px'}}>{soldProducts[i].review}</div>
      </div>
    )
  }
  return array;
}
const MyShop = ({ history }) => {
  const token = getTokenFromCookie();
  const navigate = useNavigate();
  var [shopInfo, setShopInfo] = useState([]);
  var [userProducts, setUserProducts] = useState([]);
  const [mainContent, setMainContent] = useState(true);
  var [soldProducts, setSoldProducts] = useState([]);
  console.log(soldProducts);

  useEffect(() => {
    axios
      .get("http://localhost:4000/userInfo", {
        headers: { token: token },
      })
      .then(({ data }) => setShopInfo(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/userProducts", {
        headers: { token: token },
      })
      .then(({ data }) => setUserProducts(data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getSoldProducts", {
        headers: { token: token },
      })
      .then(({ data }) => {
        setSoldProducts(data);
      });
  }, []);

  return (
    <Body>
      <CardWrapper style={{ display: "flex" }}>
        <div
          style={{
            width: "30%",
            textAlign: "center",
            marginTop: "64px",
          }}
        >
          {/* 사용자 사진*/}
          <div>
            <BiUser style={{ width: "40%", height: "40%" }} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "30px",
            }}
          >
            {/* 사용자 이름 */}
            <CardHeading style={{ width: "33%" }}>
              {shopInfo.username}
            </CardHeading>

            {/* 마이페이지로 이동하는 버튼 */}
            <CardHeading>
              <BiCog
                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                onClick={(e) => {
                  navigate("/mypage");
                }}
              />
            </CardHeading>
          </div>
          {/* 사용자 자기소개 */}
          <div
            style={{
              paddingRight: "30%",
              paddingLeft: "30%",
              paddingBottom: "32px",
            }}
          >
            {shopInfo.info === ""
              ? "자기소개를 입력하는 곳입니다. 자기소개는 내 정보에서 변경 가능합니다."
              : shopInfo.info}
          </div>

          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
            <div
              style={{ display: "flex", paddingLeft: "110px" }}
              onClick={() => setMainContent(true)}
            >
              <div>상품</div>
              {/* 사용자 상품 개수 */}
              <div style={{ paddingLeft: "110px" }}>{userProducts.length}</div>
            </div>
            <div
              style={{
                display: "flex",
                paddingLeft: "110px",
                cursor: "pointer",
              }}
              onClick={() => setMainContent(false)}
            >
              <div>평점</div>
              {/* 사용자 평점 */}
              <div style={{ paddingLeft: "15px" }}>
                {score_star(shopInfo.score)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <div style={{ padding: "10px 100px" }}>
              <CardButton onClick={(e) => navigate("/salesdetail")}>
                판매 내역
              </CardButton>
            </div>
            <div style={{ padding: "10px 100px" }}>
              <CardButton onClick={(e) => navigate("/purchasedetail")}>
                구매 내역
              </CardButton>
            </div>
          </div>
        </div>
        {mainContent ? (
          <CardBody>
            <Title>판매상품</Title>
            {PrintProducts(userProducts, userProducts.length, 3)}
          </CardBody>
        ) : (
          <CardBody>
            <Title>평점 / 후기</Title>
            {printComments(soldProducts, navigate)}
          </CardBody>
        )}
      </CardWrapper>
    </Body>
  );
};

export default MyShop;
