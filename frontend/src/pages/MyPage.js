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

const MyPage = ({ history }) => {
  return(
  
    <Body style={{}}>
      <CardWrapper>
        마이페이지
      </CardWrapper>
    </Body>
  )
}

export default MyPage;
