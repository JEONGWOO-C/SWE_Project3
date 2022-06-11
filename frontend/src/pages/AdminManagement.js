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

const styledTable = styled.table`
  width: '80%';
  border-collapse: 'collapse'
`;

const Tr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:nth-child(odd){background-color: #e6f1ff;}
  &:nth-child(even) { background-color: #f0f7ff; }
  &:hover { background-color: #ffc5c2; cursor: pointer; }
`;

const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;




let user_list = [
  { id: '123', name: '임경택', phone: '112', email: 'eee@e.e', confirm: false },
  { id: '1234', name: '조정우', phone: '112', email: 'eee@e.e', confirm: false },
  { id: '12345', name: '이민석', phone: '112', email: 'eee@e.e', confirm: false  },
  { id: '123456', name: '이세연', phone: '112', email: 'eee@e.e', confirm: false  }
]

const AdminManagement = ({ history }) => {
  const [state,setState] = useState(true);
  function Tab(i) {
    //유저 아이디를 인자로 받고 그 아이디의 회원가입 승인 요청을 해줌
    user_list[i].confirm = true;
    setState(!state);
  }
  function Table(user_list) {
    let array = [];
    for (let i = 0; i < user_list.length; i++) {
      if(!user_list[i].confirm)
      array.push(
        <Tr>
          <Td>{user_list[i].id}</Td>
          <Td>{user_list[i].name}</Td>
          <Td>{user_list[i].phone}</Td>
          <Td>{user_list[i].email}</Td>
          <Td>
              <CardButton onClick={(e)=>{Tab(i)}}>승인</CardButton>
          </Td>
        </Tr>)
    }
    return array
  }
  return (
    <Body style={{}}>
      <CardWrapper style={{ textAlign: 'center'}}>
        <Title>관리자 승인</Title>
        <styledTable>
            <Td>ID</Td>
            <Td>이름</Td>
            <Td>전화번호</Td>
            <Td>이메일</Td>
            <Td>승인대기</Td>
          {Table(user_list)}
        </styledTable>
      </CardWrapper>
    </Body>
  )
}

export default AdminManagement;
