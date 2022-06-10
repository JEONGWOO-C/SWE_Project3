import React, { useState, useEffect } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardButton,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from '../components/Card';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const SubTitle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 250px;
  font-size: 20px;
  font-weight: bold;
`;

export const ImageUpload = styled.button`
  margin-left: 15px;
  width: 100px;
  height: 100px;
`;

export const InputText = styled.input`
  margin-left: 200px;
  type: text;
  padding-left: 10px;
`;

export const StateButton = styled.button`
  margin-left: 15px;
  height: 30px;
  width: 70px;
  text-align: center;
`;

const MyPage = ({ history }) => {
  return(
    <Body>
      <CardWrapper>
        <Title>마이페이지</Title>
        <div style={{marginLeft: '248px', marginBottom: '12px', fontSize: '28px', fontWeight: 'bold'}}>
          프로필 변경
        </div>
        <div style={{paddingBottom:'40px'}}>
        <SubTitle>
          닉네임
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              value='현재 닉네임'
            />
          </div>
        </SubTitle>
        <SubTitle>
          소개글
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              value='현재 소개글'
            />
          </div>
        </SubTitle>
        <CardButton style={{marginLeft: '950px', width: '60px'}}>변경</CardButton>
        </div>


        <div style={{marginLeft: '248px', marginBottom: '12px', fontSize: '28px', fontWeight: 'bold'}}>
          개인정보 수정
        </div>
        <div style={{paddingBottom:'40px'}}>
        <SubTitle>
          휴대폰 번호
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              value='현재 휴대폰 번호'
            />
          </div>
        </SubTitle>
        <SubTitle>
          이메일
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              value='현재 이메일'
              type="email"
            />
          </div>
        </SubTitle>
        <SubTitle>
          나이
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              value='현재 나이'
            />
          </div>
        </SubTitle>
        <CardButton style={{marginLeft: '950px', width: '60px'}}>변경</CardButton>
        </div>

        <div style={{marginLeft: '248px', marginBottom: '12px', fontSize: '28px', fontWeight: 'bold'}}>
          비밀번호 수정
        </div>
        <div style={{paddingBottom:'40px'}}>
        <SubTitle>
          현재 비밀번호
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              type="password"
            />
          </div>
        </SubTitle>
        <SubTitle>
          새로운 비밀번호
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              type="password"
            />
          </div>
        </SubTitle>
        <SubTitle>
          비밀번호 확인
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              type="password"
            />
          </div>
        </SubTitle>
        <CardButton style={{marginLeft: '950px', width: '60px'}}>변경</CardButton>
        </div>

      </CardWrapper>
    </Body>
  )
}

export default MyPage;
