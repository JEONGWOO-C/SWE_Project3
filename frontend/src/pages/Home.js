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
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const Home = ({ history }) => {
  return(
  
    <Body style={{}}>
      <CardWrapper>
        홈화면
      </CardWrapper>
    </Body>
  )
}

export default Home;
