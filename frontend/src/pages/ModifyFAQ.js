import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  CardWrapper,
} from '../components/Card';
import {
  Title,
  SubTitle,
  InputText
} from './Sell';
import styled from 'styled-components';
import { Navigate } from 'react-router';

export const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const ModifyFAQ = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const FAQdata = navigateState && navigateState.FAQdata;

  return (
    <Body>
      <CardWrapper>
        <Title>
          FAQ 수정
        </Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="게시글 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              value={FAQdata?FAQdata.title:null}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="게시글 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              value={FAQdata?FAQdata.postBody:null}
            />
          </div>
        </SubTitle>

        <hr />
        <div style={{ textAlign: "center" }}>
          <button
            type="reset"
            style={{
              margin: "16px",
              height: "50px",
              width: "120px",
              backgroundColor: "#c4c4c4",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={()=>{navigate(-1)}}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              margin: "16px",
              height: "50px",
              width: "120px",
              backgroundColor: "#033a7a",
              color: "#fff",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={()=>{navigate('/faq')}}
          >
            수정
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
}

export default ModifyFAQ;