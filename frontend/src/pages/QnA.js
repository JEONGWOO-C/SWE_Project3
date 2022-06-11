import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Body, Title } from "./CustCenter";
import { getInfoFromCookie } from "../components/Auth";
import "../App.css";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

export const CardButton = styled.button`
  display: block;
  width: 140px;
  height: 60px;
  margin-left: 60px;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #033a7a;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: 0;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

const QnA = ({ history }) => {
  // 게시글 이동 테스트 코드 (db에서 게시글 번호를 받아서 페이지 이동)
  const listNum = 1;
  const view_url = "/viewQnA/" + listNum;

  let navigate = useNavigate();
  const info = getInfoFromCookie();
  console.log(info);
  var [QnAlist, setQnAlist] = useState([]);
  console.log(QnAlist);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getQnA", { headers: { token: info.token } })
      .then(({ data }) => setQnAlist(data));
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>문의사항</Title>

        <div className="List">
          <div className="list_grid_qna list_tit">
            <div className="acenter"> 번호 </div>
            <div> 제목 </div>
            <div className="acenter"> 작성자 </div>
            <div className="acenter"> 날짜 </div>
            <div className="acenter"> 답변상태 </div>
          </div>

          <div className="list_grid_qna list_data">
            <div className="acenter"> {listNum} </div>
            <div>
              <Link to={view_url} className="text-link">
                {" "}
                도와주세요{" "}
              </Link>
            </div>
            <div className="acenter"> 이세연 </div>
            <div className="acenter"> 2022-06-10 </div>
            {/* 답변되면 완료로 */}
            <div className="acenter"> 대기중 </div>
          </div>
        </div>

        <CardButton
          style={{ cursor: "pointer" }}
          onClick={() => {
            info ? (
              <div>{navigate("/writeQnA")}</div>
            ) : (
              <div>
                {Swal.fire("로그인이 필요합니다.", "로그인 창으로 이동합니다.")}
                {navigate("/login")}
              </div>
            );
          }}
        >
          문의 등록
        </CardButton>
      </CardWrapper>
    </Body>
  );
};

export default QnA;
