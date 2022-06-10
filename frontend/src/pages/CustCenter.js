import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
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
} from '../components/Card';
import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom : 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const ProdBody = styled.div`
  border: 1px solid #d7d5d5;
  height: 200px;
  width: 200px;
  margin: 20px;
  &:hover {
    border: 1px solid #f9f9f9;
  }
`;

export const Button = styled.div`
  height: 130px;
  width: 130px;
  text-align: center;
  padding: 35px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const FAQIcon = styled.img`
  height: 50px;
  width: 50px;
  margin-bottom: 3px;
`;

export const SubTitle = styled.span`
  font-size: 18px;
  font-family: sans-serif;
`;

export const ExplainBox = styled.div`
  margin-top: 10px;
`;

export const Explain = styled.span`
  font-size: 14px;
  color: #858688;
`;

const CustCenter = ({ history }) => {
  const navigate = useNavigate();

  return(
    <Body>
      <CardWrapper>
        <Title>고객센터</Title>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProdBody>
            <Button onClick={(e) => {navigate("/faq");}}>
              <FAQIcon src='/faq.png'/><br />
              <SubTitle>FAQ</SubTitle><br />
              <ExplainBox><Explain>자주 묻는 질문을<br />확인해보세요</Explain></ExplainBox>
            </Button>
          </ProdBody>

          <ProdBody>
            <Button onClick={(e) => {navigate("/notice");}}>
              <FAQIcon src='/speaker.png'/><br />
              <SubTitle>Notice</SubTitle><br />
              <ExplainBox><Explain>쇼핑시 공지사항을<br />참고하세요</Explain></ExplainBox>
            </Button>
          </ProdBody>

          <ProdBody>
            <Button onClick={(e) => {navigate("/QnA");}}>
              <FAQIcon src='/contract.png'/><br />
              <SubTitle>Q & A</SubTitle><br />
              <ExplainBox><Explain>궁금한 사항은<br />문의해주세요</Explain></ExplainBox>
            </Button>
          </ProdBody>
        </div>
      </CardWrapper>
    </Body>
  )
}

export default CustCenter;
