import React from 'react';
import { useNavigate } from "react-router-dom";
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

const WriteQnA = ({ history }) => {
  let navigate = useNavigate();

  return (
    <Body>
      <CardWrapper>
        <Title>
          문의사항 등록
        </Title>

        <SubTitle>
          이름
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="이름을 입력해주세요."
              style={{ height: "25px", width: "20%" }}
            />
          </div>
        </SubTitle>

        <SubTitle>
          아이디
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="아이디를 입력해주세요."
              style={{ height: "25px", width: "20%" }}
            />
          </div>
        </SubTitle>

        <SubTitle>
          연락처
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="연락처를 입력해주세요."
              style={{ height: "25px", width: "20%" }}
            />
          </div>
        </SubTitle>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="문의 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
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
            onClick={()=>{navigate('/custcenter')}}
          >
            등록
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
}

export default WriteQnA;