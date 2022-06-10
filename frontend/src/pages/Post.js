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
  CardButton,
} from '../components/Card';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../imgs/logo192.png'; // 예시 사진
import { BiUser, BiHeart } from "react-icons/bi"
import { useLocation } from "react-router";
import Category from './Category';


const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

// const items = [logo, logo, logo, logo];
// const items_num = 4;
// function slider() {
//   var array = [];
//   for (var i = 0; i < items_num; i++) {
//     array.push(
//       <div>
//         <img src={items[i]} width={'100%'} height={'100%'} alt="logo" />
//       </div>
//     )
//   }
//   return array;
// }


const Post = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;

  let isSelling=0;
  return (
    <Body style={{}}>

      <CardWrapper style={{ display: 'flex' }}>
        <CardBody style={{ width: '36%', padding: '64px' }}>
          {/* <Slider {...settings}>
            {slider()}
          </Slider> */}
          <img src={logo} width='100%' heightL='100%' alt="이미지 없음" style={isSelling ? null : { opacity: 0.5 }} />
        </CardBody>
        <CardBody style={{ width: '40%', padding: '64px' }}>

          {isSelling
            ? <div style={{ padding: '4px 0', background: '#033a7a', color: '#fff', width: '100px', height: '32px', textAlign: 'center', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold' }}>
              판매중
            </div>
            : <div style={{ padding: '4px 0', background: 'lightgray', width: '100px', height: '32px', textAlign: 'center', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold' }}>
              판매완료
            </div>
          }

          <div style={{ display: 'flex', paddingTop: '24px', paddingBottom: '8px' }}>
            <div>
              <BiUser style={{ width: '80px', height: '80px' }} />
            </div>
            <div style={{ margin: '16px', width: '400px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '36px' }}>
                item.user
              </div>
            </div>
            <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '24px' }}>
              0
            </div>
          </div>
          <hr />
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '28px' }}>
              item.title
            </div>
            <div style={{ marginTop: '8px', marginBottom: '8px', color: '#858688' }}>
              여성신발 - 10시간 전
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '28px' }}>
              60,000원
            </div>
            <div style={{ marginTop: '24px', marginBottom: '24px', fontSize: '20px' }}>
              3월말에 10만원 조금 넘게 주고 샀어요<br />
              240사이즈, 엄청 편하고 굽도 높아요<br />
              사놓고 딱 3번 잠깐씩만 신어서 상태 아주 좋아요 :)
            </div>
            <div style={{ color: 'lightgray' }}>
              찜 2 - 채팅 30 - 조회 311
            </div>
            <div style={{ display: 'flex', paddingTop: '24px', paddingBottom: '8px' }}>
              <BiHeart style={{ width: '60px', height: '60px', paddingRight: '16px' }} />
              <div style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                <CardButton style={{ width: '140px', height: '60px', fontSize: '20px', backgroundColor: '#033a7a', color: 'white' }}>
                  채팅하기
                </CardButton>
              </div>
              <div style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                <CardButton style={{ width: '210px', height: '60px', fontSize: '20px', backgroundColor: 'lightgray', color: 'white' }}>
                  이 게시글 신고하기
                </CardButton>
              </div>
            </div>
          </div>
        </CardBody>
      </CardWrapper>
    </Body>
  )
}

export default Post;
