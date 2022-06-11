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
function Tab(ban){
  
}
function Table(user_list) {
  let array = [];
  for (let i = 0; i < user_list.length; i++) {
    array.push(
      <tr>
        <td>{user_list[i].id}</td>
        <td>{user_list[i].name}</td>
        <td>{user_list[i].phone}</td>
        <td>{user_list[i].email}</td>
        <td>{user_list[i].age}</td>
        <td>{user_list[i].score}</td>
        <td>
          {user_list[i].ban ?
            <CardButton style={{backgroundColor: 'red'}}>정지</CardButton> :
            <CardButton>해제</CardButton>
          }
        </td>
      </tr>)
  }
}
const MemberManagement = ({ history }) => {
  return (

    <Body style={{}}>
      <CardWrapper>
        <Title style={{ textAlign: 'center' }}>회원 관리</Title>

      </CardWrapper>
    </Body>
  )
}

export default MemberManagement;
