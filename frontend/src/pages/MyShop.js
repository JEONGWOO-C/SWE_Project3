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
import { BiUser, BiCog } from "react-icons/bi"
import logo from '../imgs/logo192.png'; // 예시 사진
import {ProductWrapper, Product, Title} from '../components/Product'
import {useNavigate} from 'react-router';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const MyShop = ({ history }) => {
  const navigate = useNavigate();
  return (
    <Body >
      <CardWrapper style={{ display: 'flex' }}>
        <div style={{
          width: '30%',
          textAlign: 'center',
          marginTop: '64px'
        }}>

          {/* 사용자 사진*/}
          <div><BiUser style={{ width: '40%', height: '40%' }} /></div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '30px'
          }}>

            {/* 사용자 이름 */}
            <CardHeading style={{ width: '33%' }} >
              김광운
            </CardHeading>

            {/* 마이페이지로 이동하는 버튼 */}
            <CardHeading >
              <BiCog style={{ width: '32px', height: '32px', cursor: "pointer" }} onClick={(e)=>{ navigate('/mypage');}}/>
            </CardHeading>
            
          </div>
          {/* 사용자 자기소개 */}
          <div style={{
            paddingRight: '30%',
            paddingLeft: '30%',
            paddingBottom: '32px'
          }}>
            자기소개를 입력하는 곳입니다.
            자기소개는 내 정보에서 변경 가능합니다.
          </div>

          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
            <div style={{ display: 'flex', paddingLeft: '110px' }}>
              <div>상품</div>
              {/* 사용자 상품 개수 */}
              <div style={{ paddingLeft: '110px' }}>3</div>
            </div>
            <div style={{ display: 'flex', paddingLeft: '110px' }}>
              <div>평점</div>
              {/* 사용자 평점 */}
              <div style={{ paddingLeft: '110px' }}>0</div>
            </div>
          </div>
        </div>
        <CardBody>
          <Title>
            판매상품
          </Title>
          <ProductWrapper>
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'}/>
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'}/>
          <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'}/>
        </ProductWrapper>
        <ProductWrapper>
        <Product key={'컨테이너'} logo={logo} name={'컨테이너'} price={'1,000,000원'}/>
        <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'}/>
        <Product key={'없음'} logo={logo} name={'없음'} price={'1,000,000원'}/>
        </ProductWrapper>
        </CardBody>
      </CardWrapper>
    </Body>
  )
}

export default MyShop;
