import React, { useState } from 'react';
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

export const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const WriteQnA = ({ history }) => {
  let navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(true);

  // function getSelectValue(){
  //   var secret = document.getElementsByName('secret');
  //   console.log('s'+secret);
  //   console.log(secret);
  //     if (secret[0].checked) {
  //       setSelectedValue(true);
  //     }
  //     else {
  //       setSelectedValue(false);
  //     }

  // }

  return (
    <Body>
      <CardWrapper>
        <Title>
          문의사항 등록
        </Title>

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

        <SubTitle>
          공개여부
          <div style={{ marginLeft: '200px', marginTop: '-28px' }}>

            {IsOpen ?
              <div style={{ display: 'flex', fontWeight:'500'}}>
                <div style={{ height: '28px', width: '80px', textAlign: 'center', background: '#033a7a', color: '#fff' }} onClick={(e) => { setIsOpen(true) }}>공개</div>
                <div style={{ height: '28px', width: '80px', textAlign: 'center', background: '#ddd' }} onClick={(e) => { setIsOpen(false) }}>비공개</div>
              </div>
              :
              <div style={{ display: 'flex' }}>
                <div style={{ height: '28px', width: '80px', textAlign: 'center', background: '#ddd'}} onClick={(e) => { setIsOpen(true) }}>공개</div>
                <div style={{ height: '28px', width: '80px', textAlign: 'center', background: '#033a7a', color: '#fff' }} onClick={(e) => { setIsOpen(false) }}>비공개</div>
              </div>
            }

          </div>
        </SubTitle>

        {IsOpen ? (
          <div />
        )
          :
          <SubTitle>
            비밀번호
            <div style={{ marginTop: "-28px" }}>
              <InputText
                placeholder="비밀번호 4자를 입력해주세요."
                style={{ height: "25px", width: "20%" }}
              />
            </div>
          </SubTitle>}


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
            onClick={() => { navigate(-1) }}
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
            onClick={() => { navigate('/custcenter') }}
          >
            등록
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
}

export default WriteQnA;