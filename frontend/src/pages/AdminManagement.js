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
import Swal from "sweetalert2";

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
//   { id: '123', name: '임경택', phone: '112', email: 'eee@e.e', confirm: false },
//   { id: '1234', name: '조정우', phone: '112', email: 'eee@e.e', confirm: false },
//   { id: '12345', name: '이민석', phone: '112', email: 'eee@e.e', confirm: false  },
//   { id: '123456', name: '이세연', phone: '112', email: 'eee@e.e', confirm: false  }
// ]

const AdminManagement = ({ history }) => {
  const [state, setState] = useState(true);
  const [user_list, setUserList] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:4000/getAdminList")
      .then(({ data }) => { console.log(data); setUserList(data) })
  }, [])

  function Tab(i, value) {
    //유저 아이디를 인자로 받고 그 아이디의 회원가입 승인 요청을 해줌
    user_list[i].confirm = value;
    setState(!state);
    // if (value == true)
      axios.post(
        "http://localhost:4000/setApproved", {
        id: user_list[i].id, approved: value
      })
    // else {
    //   axios.post(
    //     "http://localhost:4000/delAdmin", {
    //     id: user_list[i].id
    //   })
    // }
  }
  function Table(user_list) {
    let array = [];
    for (let i = 0; i < user_list.length; i++) {
        array.push(
          <Tr>
            <Td>{user_list[i].id}</Td>
            <Td>{user_list[i].adminname}</Td>
            <Td>{user_list[i].phone}</Td>
            <Td>{user_list[i].email}</Td>
            <Td>{user_list[i].confirm?'승인':'대기'}</Td>
            <Td style={{ display: 'flex' }}>
              <CardButton onClick={(e) => {
                Swal.fire({
                  title: "관리자 승인",
                  text: "'" + user_list[i].adminname + "'를 관리자로 승인 하시겠습니까?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "승인",
                  cancelButtonText: "취소",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed){
                    Tab(i, true);
                    window.location.reload();
                  }
                })
              }}>
                승인
              </CardButton>
              <CardButton style={{ backgroundColor: 'red' }} onClick={(e) => {
                Swal.fire({
                  title: "관리자 대기",
                  text: "'" + user_list[i].adminname + "'관리자를 대기상태로 변경하시겠습니까?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "변경",
                  cancelButtonText: "취소",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed){
                    Tab(i, false);
                    window.location.reload();
                  }
                })}}>대기</CardButton>
            </Td>
          </Tr>)
    }
    return array
  }
  return (
    <Body style={{}}>
      <CardWrapper style={{ textAlign: 'center' }}>
        <Title>관리자 승인</Title>
        <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto' }}>
          <TitleTr>
            <Td>ID</Td>
            <Td>닉네임</Td>
            <Td>전화번호</Td>
            <Td>이메일</Td>
            <Td>상태</Td>
            <Td>승인대기</Td>
          </TitleTr>
          {Table(user_list)}
        </table>
      </CardWrapper>
    </Body>
  )
}

export default AdminManagement;
