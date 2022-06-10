import React, { useState, useEffect } from "react";
import { CardWrapper, CardBody, CardButton } from "../components/Card";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTokenFromCookie } from "../components/Auth";
import { BiUser, BiHeart } from "react-icons/bi";
import Swal from "sweetalert2";
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

const setFav = async (id, postnum, isFavorite, fav) => {
  const res = await axios.post("http://localhost:4000/setFavorite", {
    id: id,
    postnum: postnum,
    isFavorite: isFavorite,
    fav: fav,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire(msg, " ", "success").then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  }
  console.log(res);
  if (isFavorite === true) return false;
  else return true;
};

function calDiff(data) {
  if (data) {
    const data_split = data.split(/[-T:.]/);
    // index 0:년, 1:월 2:일 3:시 4:분 5:초
    const start = new Date(
      data_split[0] +
        "-" +
        data_split[1] +
        "-" +
        data_split[2] +
        " " +
        data_split[3] +
        ":" +
        data_split[4] +
        ":" +
        data_split[5]
    );
    const now = new Date();
    const diff = (now.getTime() - start.getTime()) / 1000;
    if (diff < 60) return "방금 전";
    if (diff < 60 * 60) return parseInt(diff / 60) + "분 전";
    if (diff < 60 * 60 * 24) return parseInt(diff / (60 * 60)) + "시간 전";
    if (diff < 60 * 60 * 24 * 14)
      return parseInt(diff / (60 * 60 * 24)) + "일 전";
    if (diff < 60 * 60 * 24 * 30)
      return parseInt(diff / (60 * 60 * 24 * 7)) + "주 전";
    if (diff < 60 * 60 * 24 * 365)
      return parseInt(diff / (60 * 60 * 24 * 30)) + "개월 전";
    return parseInt(diff / (60 * 60 * 24 * 365)) + "년 전";
  }
}
function Price(data) {
  if (data) return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
}

const Post = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const token = getTokenFromCookie();
  var [postData, setPostData] = useState([]);
  var [userInfo, setUserInfo] = useState([]);
  var [isFavorite, setIsFavorite] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getPostData", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setPostData(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/userInfo", {
        headers: { token: token },
      })
      .then(({ data }) => setUserInfo(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFavorite", {
        headers: { token: token },
        params: { postnum: postnum },
      })
      .then(({ data }) => setIsFavorite(data));
  }, []);

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
                {postData.name}
              </div>
            </div>
            <div
              style={{
                marginTop: "30px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {postData.score}
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
              {postData.category} - {calDiff(postData.postDate)}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "28px" }}>
              {Price(postData.price)}
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
                onClick={async (e) => {
                  isFavorite = setFav(
                    userInfo.id,
                    postnum,
                    isFavorite,
                    postData.fav
                  );
                }}
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
