import React, { useState, useEffect } from "react";
import { CardWrapper, CardBody, CardButton } from "../components/Card";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getInfoFromCookie } from "../components/Auth";
import { BiUser, BiHeart } from "react-icons/bi";
import { useLocation } from "react-router";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// const items = [logo, logo, logo, logo];
// const items_num = 4;
// function slider() {
//   var array = [];
//   for (var i = 0; i < items_num; i++) {
//     array.push(
//       <div>
//         <img src={items[i]} width={'100%'} height={'100%'} alt="logo" />
//       </div>
//     )
//   }
//   return array;
// }

const Post = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const sellerInfo = getInfoFromCookie();
  console.log("게시글 번호 : " + postnum);
  var [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getPostData", {
        params: {
          postnum: postnum,
        },
      })
      .then(({ data }) => setPostData(data[0]));
  }, []);

  console.log(postData);

  return (
    <Body style={{}}>
      <CardWrapper style={{ display: "flex" }}>
        <CardBody style={{ width: "36%", padding: "64px" }}>
          {/* <Slider {...settings}>
            {slider()}
          </Slider> */}
          <img
            src={postData.photo}
            width="100%"
            heightL="100%"
            alt="이미지 없음"
            style={postData.isSelling ? null : { opacity: 0.5 }}
          />
        </CardBody>
        <CardBody style={{ width: "40%", padding: "64px" }}>
          {postData.isSelling ? (
            <div
              style={{
                padding: "4px 0",
                background: "#033a7a",
                color: "#fff",
                width: "100px",
                height: "32px",
                textAlign: "center",
                borderRadius: "5px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              판매중
            </div>
          ) : (
            <div
              style={{
                padding: "4px 0",
                background: "lightgray",
                width: "100px",
                height: "32px",
                textAlign: "center",
                borderRadius: "5px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              판매완료
            </div>
          )}

          <div
            style={{
              display: "flex",
              paddingTop: "24px",
              paddingBottom: "8px",
            }}
          >
            <div>
              <BiUser style={{ width: "80px", height: "80px" }} />
            </div>
            <div style={{ margin: "16px", width: "400px" }}>
              <div style={{ fontWeight: "bold", fontSize: "36px" }}>
                {sellerInfo.name}
              </div>
            </div>
            <div
              style={{
                marginTop: "30px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              0
            </div>
          </div>
          <hr />
          <div style={{ marginTop: "16px" }}>
            <div style={{ fontWeight: "bold", fontSize: "28px" }}>
              {postData.title}
            </div>
            <div
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                color: "#858688",
              }}
            >
              {postData.category} / {postData.postDate}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "28px" }}>
              {postData.price}
            </div>
            <div
              style={{
                marginTop: "24px",
                marginBottom: "24px",
                fontSize: "20px",
              }}
            >
              {postData.descript}
            </div>
            <div style={{ color: "lightgray" }}>
              찜 {postData.fav} - 채팅 30 - 조회 {postData.views}
            </div>
            <div
              style={{
                display: "flex",
                paddingTop: "24px",
                paddingBottom: "8px",
              }}
            >
              <BiHeart
                style={{ width: "60px", height: "60px", paddingRight: "16px" }}
              />
              <div style={{ paddingRight: "16px", paddingLeft: "16px" }}>
                <CardButton
                  style={{
                    width: "140px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "#033a7a",
                    color: "white",
                  }}
                >
                  채팅하기
                </CardButton>
              </div>
              <div style={{ paddingRight: "16px", paddingLeft: "16px" }}>
                <CardButton
                  style={{
                    width: "210px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "lightgray",
                    color: "white",
                  }}
                >
                  이 게시글 신고하기
                </CardButton>
              </div>
            </div>
          </div>
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Post;
