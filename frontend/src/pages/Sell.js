import React, { useState, useEffect } from 'react';
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

const Body = styled.div`
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

const Sell = ({ history }) => {
  return(
    <Body>
      <CardWrapper>
        <Title>
          상품 등록
        </Title>
        
        <SubTitle>
          상품사진
          <div style={{ marginTop: '-27px'}}>
          <ImageUpload style={{ marginLeft: '200px' }}>
            사진 업로드
          </ImageUpload>
          <ImageUpload>
            사진 업로드
          </ImageUpload>
          <ImageUpload>
            사진 업로드
          </ImageUpload>
          <ImageUpload>
            사진 업로드
          </ImageUpload>
          <ImageUpload>
            사진 업로드
          </ImageUpload>
          </div>
        </SubTitle>

        <SubTitle>
          상품제목
          <div style={{ marginTop: '-28px' }}>
          <InputText placeholder='상품 제목을 입력해주세요.' style={{ height: '25px', width: '52%' }}/>
          </div>
        </SubTitle>

        <SubTitle>
          카테고리
          <div style={{ marginTop: '-28px' }}>
            <select name='Category' style={{ 
              marginLeft: '200px',
              paddingLeft: '10px',
              width: '150px',
              height: '28px',
            }}>
              <option value={''}>카테고리</option>
              <option value={'여성의류'}>여성의류</option>
              <option value={'남성의류'}>남성의류</option>
              <option value={'여성잡화'}>여성잡화</option>
              <option value={'남성잡화'}>남성잡화</option>
              <option value={'시계/쥬얼리'}>시계/쥬얼리</option>
              <option value={'디지털/가전'}>디지털/가전</option>
              <option value={'스포츠/레저'}>스포츠/레저</option>
              <option value={'가구/인테리어'}>가구/인테리어</option>
              <option value={'유아동/유아도서'}>유아동/유아도서</option>
              <option value={'생활/가공식품'}>생활/가공식품</option>
              <option value={'게임/취미'}>게임/취미</option>
              <option value={'도서/티켓/음반'}>도서/티켓/음반</option>
              <option value={'반려동물용품'}>반려동물용품</option>
              <option value={'기타 중고물품'}>기타 중고물품</option>
            </select>
          </div>
        </SubTitle>

        <SubTitle>
          상품가격
          <div style={{ marginTop: '-28px' }}>
          <InputText placeholder='가격을 입력해주세요.' style={{ height: '25px', width: '30%', marginRight: '10px' }}/>
            원
          </div>
        </SubTitle>

        <SubTitle>
          상품설명
          <div style={{ marginTop: '-28px' }}>
            <textarea placeholder='상품 설명을 입력해주세요.' style={{ 
              height: '100px', 
              width: '52%', 
              marginLeft: '200px',
              paddingLeft: '10px',
              paddingTop: '10px' }}/>
          </div>
        </SubTitle>

        <SubTitle style={{ marginBottom: '48px' }}>
          판매여부
          <div style={{ marginTop: '-28px' }}>
            <select name='SellState' style={{ 
              marginLeft: '200px',
              paddingLeft: '10px',
              width: '150px',
              height: '28px',
            }}>
              <option value={'판매중'} selected>판매중</option>
              <option value={'예약중'}>예약중</option>
              <option value={'판매완료'}>판매완료</option>
            </select>
          </div>
        </SubTitle>

        <hr />
        <div style={{ textAlign: 'center' }}>
          <button type='reset' style={{
            margin: "16px",
            height: '50px',
            width: '120px',
            backgroundColor: '#c4c4c4',
            border: 0,
            borderRadius: '5px',
            boxShadow: 0
          }}>
            취소
          </button>
          <button type='submit' style={{
            margin: "16px",
            height: '50px',
            width: '120px',
            backgroundColor: '#033a7a',
            color: '#fff',
            border: 0,
            borderRadius: '5px',
            boxShadow: 0
          }}>
            상품등록 완료
          </button>
        </div>

      </CardWrapper>
    </Body>
  )
}

export default Sell;