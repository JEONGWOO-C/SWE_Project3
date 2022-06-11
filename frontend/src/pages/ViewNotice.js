import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
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
  CardLink
} from '../components/Card';
import { CardButton } from './ViewFAQ';
import '../App.css';
import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  width: 100%;
`;

const ViewNotice = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;

  return (
    <Body>
      <CardWrapper>
        {postnum}
        <div className='View'>
          <div className='top_title'>
            <div id='title_txt'>홈페이지 오픈했어요!</div>
            <div className='date_div'>2022-06-10</div>
          </div>

          <div>
            <div className='content'>많이 이용해 주세요 :)</div>
          </div>
        </div>

        <CardButton onClick={()=>navigate('/writeNotice')}>
          수정하기
        </CardButton>
      </CardWrapper>
    </Body>
  );
}

export default ViewNotice;