import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";

export const Body = styled.div`
  display: flex;
  width: 100%;
`;

export const CardButton = styled.button`
  float: right;
  display: block;
  width: 140px;
  height: 60px;
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
  }
`;

const ViewQnA = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const [QnAdata, setQnAdata] = useState([]);
  console.log(QnAdata);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getQnAbyPostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setQnAdata(data));
  }, []);

  return (
    <Body>
      <CardWrapper>
        <div className="View">
          <div className="top_title">
            <div id="title_txt">도와주세요</div>
            <div className="date_div">작성자: / 2022-06-10</div>
          </div>

          <div>
            <div className="content">이거 이렇게 해줘어</div>
          </div>
        </div>

        <div className="comment">
          <hr />
          답변하기
          <p />
          <textarea
            className="review-input"
            placeholder="답변을 입력해주세요."
          ></textarea>
          <CardButton>등록하기</CardButton>
        </div>

        <div className="admin">
          {/* 아이디, 답변내용 */}
          <div>➡ 관리자 : 네~ 알겠습니다</div>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default ViewQnA;
