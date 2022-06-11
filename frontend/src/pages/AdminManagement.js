import React, { useState, useEffect } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardButton,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from '../components/Card';
import styled from 'styled-components';
import {
  ProductWrapper,
  Product,
  Title,
  PrintProducts,
} from "../components/Product";

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const AdminManagement = ({ history }) => {
  return (

    <Body style={{}}>
      <CardWrapper>
        <Title style={{ textAlign: 'center' }}>관리자 관리</Title>

      </CardWrapper>
    </Body>
  )
}

export default AdminManagement;
