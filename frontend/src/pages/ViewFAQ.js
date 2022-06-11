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
  margin-right: 60px;
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

const ViewFAQ = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const [FAQdata, setFAQdata] = useState([]);
  console.log(FAQdata);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFAQbyPostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setFAQdata(data));
  }, []);

  return (
    <Body>
      <CardWrapper>
        <div className="View">
          <div className="top_title">
            <div id="title_txt">구매는 어떻게 하면 되나요?</div>
            <div className="date_div">2022-06-10</div>
          </div>

          <div>
            <div className="content">알아서 하세요</div>
          </div>
        </div>
        <CardButton onClick={() => navigate("/writeFAQ")}>수정하기</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default ViewFAQ;
