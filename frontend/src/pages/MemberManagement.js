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
import axios from 'axios';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;


const Tr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:nth-child(odd){background-color: #e6f1ff;}
  &:nth-child(even) { background-color: #f0f7ff; }
  &:hover { background-color: #ffc5c2; cursor: pointer; }
`;

const TitleTr = styled.tr`
border-top: 1px solid black;
border-bottom: 1px solid black;
`;

const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;

// let user_list = [
//   { id: '123', name: '임경택', phone: '112', email: 'eee@e.e', age: '2', score: '5', ban: true },
//   { id: '123', name: '조정우', phone: '112', email: 'eee@e.e', age: '2', score: '5', ban: false },
//   { id: '123', name: '이민석', phone: '112', email: 'eee@e.e', age: '2', score: '5', ban: true  },
//   { id: '123', name: '이세연', phone: '112', email: 'eee@e.e', age: '2', score: '5', ban: true  }
// ]

const MemberManagement = ({ history }) => {
  const [state,setState] = useState([]);
  const [user_list,setUserList] = useState([]);
  useEffect(()=>{
    axios.post("http://localhost:4000/getMemberList")
    .then(({data})=>setUserList(data))
  },[])
  
  function Tab(i) {
    //유저 아이디를 인자로 받고 그 아이디의 정지 여부를 반대로 바꿈
    //정지였으면 해제로, 해제였으면 정지로
    user_list[i].ban = !(user_list[i].ban);
    setState(!state);
    axios.post("http://localhost:4000/setBan",{
      ban:user_list[i].ban,
      id:user_list[i].id
    })
  }
  function Table(user_list) {
    let array = [];
    for (let i = 0; i < user_list.length; i++) {
      array.push(
        <Tr>
          <Td>{user_list[i].id}</Td>
          <Td>{user_list[i].username}</Td>
          <Td>{user_list[i].phone}</Td>
          <Td>{user_list[i].email}</Td>
          <Td>{user_list[i].age}</Td>
          <Td>{user_list[i].score}</Td>
          <Td>
            {user_list[i].ban ?
              <CardButton style={{ backgroundColor: 'red' }} onClick={(e)=>{Tab(i)}}>정지</CardButton> :
              <CardButton onClick={(e)=>{Tab(i)}}>해제</CardButton>
            }
          </Td>
        </Tr>)
    }
    return array
  }
  return (
    <Body style={{}}>
      <CardWrapper style={{ textAlign: 'center'}}>
        <Title>회원 관리</Title>
        <table style={{width: '80%',borderCollapse: 'collapse',margin:'auto'}}>
            <TitleTr>
              <Td>ID</Td>
              <Td>이름</Td>
              <Td>전화번호</Td>
              <Td>이메일</Td>
              <Td>나이</Td>
              <Td>평점</Td>
              <Td>정지여부</Td>
            </TitleTr>
            {Table(user_list)}
        </table>
      </CardWrapper>
    </Body>
  )
}

export default MemberManagement;
