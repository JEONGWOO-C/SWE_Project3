import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
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
import {
  Body,
  Title
} from './CustCenter';
import '../App.css'
import styled from 'styled-components';

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

const Notice = ({ history }) => {
  // 게시글 이동 테스트 코드 (db에서 게시글 번호를 받아서 페이지 이동)
  const listNum = 1;
  const view_url = '/viewNotice/' + listNum;

  let navigate = useNavigate();

  return (
    <Body>
      <CardWrapper>
        <Title>
          공지사항
        </Title>

        <div className='List'>
          <div className='list_grid list_tit'>
            <div className='acenter'> 번호 </div>
            <div> 제목 </div>
            <div className='acenter'> 날짜 </div>
          </div>

          <div className='list_grid list_data'>
            <div className='acenter'> { listNum } </div>
            <div><Link to={ view_url } className='text-link'> 홈페이지 오픈했어요! </Link></div>
            <div className='acenter'> 2022-06-10 </div>
          </div>
        </div>

        {/* 관리자한테만 버튼 보이고 작동하도록 */}
        <CardButton onClick={()=>navigate('/writeNotice')}>
          공지 등록
        </CardButton>
      </CardWrapper>
    </Body>
  );
};

export default Notice;