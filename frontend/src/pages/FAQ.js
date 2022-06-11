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
import "../App.css";
import styled from "styled-components";
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

function printList(list, navigate) {
  let array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(
      <div className="list_grid list_data" 
        style={{cursor: 'pointer', marginTop:'4px'}}
        onClick={()=>{navigate("/viewFAQ/"+list[i].postnum, {state:{postnum:list[i].postnum}})}}>
        <div className="acenter"> {list[i].postnum} </div>
        <div className="text-link"> {list[i].title} </div>
        <div className="acenter"> {list[i].postDate.split('T')[0]} </div>
      </div>
    )
  }
  return array;
}

const FAQ = ({ history }) => {
  // 게시글 이동 테스트 코드 (db에서 게시글 번호를 받아서 페이지 이동)
  var [FAQlist, setFAQlist] = useState([]);
  console.log(FAQlist);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFAQ", {})
      .then(({ data }) => setFAQlist(data));
  }, []);

  let navigate = useNavigate();

  return (
    <Body>
      <CardWrapper>
        <Title>FAQ</Title>

        <div className="List">
          <div className="list_grid list_tit">
            <div className="acenter"> 번호 </div>
            <div> 제목 </div>
            <div className="acenter"> 날짜 </div>
          </div>
          {printList(FAQlist, navigate)}
        </div>

        <CardButton onClick={() => navigate("/writeFAQ")}>FAQ 등록</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default FAQ;
