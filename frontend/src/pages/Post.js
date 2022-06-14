import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardBody,
  CardButton,
  CardHeading,
} from "../components/Card";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTokenFromCookie } from "../components/Auth";
import { BiInfoCircle, BiUser } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

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

const reportPost = async (writer, postnum, reason) => {
  const res = await axios.post("http://localhost:4000/reportPost", {
    writer: writer,
    postnum: postnum,
    reason: reason,
  });
  return res.data;
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
  var navigate = useNavigate();
  const Chart = () => {
    const data = [
      { title: "10대", value: postData.teens, color: "#ff6600" },
      { title: "20대", value: postData.twenties, color: "#99ff00" },
      { title: "30대", value: postData.thirties, color: "#00ff66" },
      { title: "40대", value: postData.fourties, color: "#0099ff" },
      { title: "50대", value: postData.fifties, color: "#6600ff" },
      { title: "60대 이상", value: postData.overSixties, color: "#ff0099" },
    ];
    let total =
      data[0].value +
      data[1].value +
      data[2].value +
      data[3].value +
      data[4].value +
      data[5].value;
    return (
      <div style={{ display: "flex", padding: "50px" }}>
        <PieChart data={data} animate style={{ width: "50%" }} />
        <div
          style={{
            paddingLeft: "100px",
            marginBottom: "auto",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[0].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[0].title} </div>
              <div> {((data[0].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[1].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[1].title} </div>
              <div> {((data[1].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[2].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[2].title} </div>
              <div> {((data[2].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[3].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[3].title} </div>
              <div> {((data[3].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[4].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[4].title} </div>
              <div> {((data[4].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: data[5].color,
              }}
            ></div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ paddingBottom: "10px" }}> {data[5].title} </div>
              <div> {((data[5].value / total) * 100).toFixed(0) + "%"} </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <Body>
      <CardWrapper>
        <div style={{ display: "flex" }}>
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
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    Swal.fire(
                      "'" + postData.username + "'님의 연락처",
                      "전화번호: 000-0000-0000 / 이메일: zzzzz@zzz.zzz"
                    );
                  }}
                >
                  {postData.username}
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
                찜 {postData.fav} - 조회 {postData.views}
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "24px",
                  paddingBottom: "8px",
                }}
              >
                {isFavorite ? (
                  <BsHeartFill
                    style={{
                      width: "60px",
                      height: "60px",
                      paddingRight: "16px",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={async (e) => {
                      isFavorite = setFav(
                        userInfo.id,
                        postnum,
                        isFavorite,
                        postData.fav
                      );
                    }}
                  />
                ) : (
                  <BsHeart
                    style={{
                      width: "60px",
                      height: "60px",
                      paddingRight: "16px",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={async (e) => {
                      isFavorite = setFav(
                        userInfo.id,
                        postnum,
                        isFavorite,
                        postData.fav
                      );
                    }}
                  />
                )}
                <div style={{ paddingRight: "16px", paddingLeft: "16px" }}>
                  <CardButton
                    style={{
                      width: "140px",
                      height: "60px",
                      fontSize: "20px",
                      backgroundColor: "#033a7a",
                      color: "white",
                    }}
                    onClick={() => {
                      Swal.fire({
                        title: "구매 하시겠습니까?",
                        text: "구매하시면 마일리지가 차감됩니다.",
                        icon: "question",

                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "구매",
                        cancelButtonText: "취소",
                        reverseButtons: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // 마일리지가 구매하는 상품의 개수보다 적다면
                          if (userInfo.mileage < postData.price) {
                            // 에러 출력
                            Swal.fire(
                              "마일리지가 부족합니다.",
                              "현재 마일리지: " + userInfo.mileage + "원",
                              "error"
                            );
                          }
                          // 아니라면 구매 완료
                          else {
                            axios
                              .post(
                                "http://localhost:4000/setMileage",
                                { value: parseInt(userInfo.mileage) - parseInt(postData.price)},
                                { headers: { token: token } }
                              )
                              .then(() => {
                                axios
                                  .post("http://localhost:4000/productSell", {
                                    postnum: postnum,
                                    buyer_id: userInfo.id,
                                    seller_id: postData.seller_id,
                                    price:postData.price
                                  })
                                  .then(() => {
                                    Swal.fire(
                                      "구매가 완료되었습니다.",
                                      "남은 마일리지: " +
                                        eval(
                                          userInfo.mileage +
                                            "-" +
                                            postData.price
                                        ) +
                                        "원",
                                      "success"
                                    ).then((result) => {
                                      if (result.isConfirmed)
                                        window.location.reload();
                                    });
                                  });
                              });
                          }
                        }
                      });
                    }}
                  >
                    구매하기
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
                    onClick={() => {
                      Swal.fire({
                        title: "이 게시글 신고하기",
                        text: "이 게시글을 신고 하시겠습니까?",
                        icon: "question",

                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "신고",
                        cancelButtonText: "취소",
                        reverseButtons: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "이 게시글 신고하기",
                            text: "신고 내용을 입력하세요.",
                            input: "text",
                            inputPlaceholder: "신고내용 입력..",
                          }).then((result) => {
                            console.log(result);
                            var reason = result.value;
                            reportPost(userInfo.id, postnum, reason).then(
                              (res) => {
                                console.log(res);
                                if (res) {
                                  Swal.fire(
                                    "신고가 완료 되었습니다",
                                    "신고 내용 : " + result.value,
                                    "success"
                                  );
                                } else {
                                  Swal.fire(
                                    "신고에 실패하셨습니다.",
                                    "신고 내용을 입력해주세요.",
                                    "error"
                                  );
                                }
                              }
                            );
                          });
                        }
                      });
                    }}
                  >
                    이 게시글 신고하기
                  </CardButton>
                </div>
              </div>
            </div>
          </CardBody>
        </div>
        <div>
          <CardHeading>연령별 조회 현황</CardHeading>
          <div style={{ padding: "0px 200px" }}>
            <Chart />
          </div>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default Post;
