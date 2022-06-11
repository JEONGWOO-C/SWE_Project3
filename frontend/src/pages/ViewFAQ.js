import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";

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

const info = getInfoFromCookie();

let admin = false;
if (info)
  if (info.token)
    admin = (info.token.type == 'admin')


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
        {FAQdata[0]?
        <div className="View">
          <div className="top_title">
            <div id="title_txt">{FAQdata[0].title}</div>
            <div className="date_div">{FAQdata[0].postDate.split('T')[0]}</div>
          </div>

          <div>
            <div className="content">{FAQdata[0].postBody}</div>
          </div>
        </div>
        :null}
        {admin?<CardButton onClick={() => navigate("/modifyFAQ",{state:{FAQdata:FAQdata[0]}})}>수정하기</CardButton>:null}
        <CardButton onClick={() => navigate(-1)}>목록</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default ViewFAQ;
