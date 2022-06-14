import React, { useState, useEffect } from "react";
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
} from "../components/Card";
import styled from "styled-components";
import {
  ProductWrapper,
  Product,
  Title,
  PrintProducts,
} from "../components/Product";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
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

//신고 승인 시 호출되는 함수
const approveReport = async (postnum) => {
  const res = await axios.post("http://localhost:4000/deletePost", {
    postnum: postnum,
  });
  if (res.data === true) {
    Swal.fire(
      "신고가 승인되었습니다.",
      "게시글 삭제에 성공하였습니다.",
      "success"
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    return true;
  }
};

//신고 거부 시 호출되는 함수
const refuseReport = async (postnum) => {
  const res = await axios.post("http://localhost:4000/deleteReportbyPostnum", {
    postnum: postnum,
  });
  if (res.data === true) {
    Swal.fire(
      "신고가 거절되었습니다.",
      "해당 게시글 신고가 모두 삭제됩니다.",
      "success"
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    return true;
  }
};

function printList(list, key) {
  console.log(list);
  console.log("key " + key);

  let array = [];
  for (var i = 0; i < key.length; i++) {
    for (var j = 0; j < list[key[i]].length; j++) {
      let item = list[key[i]][j];
      array.push(
        <div>
        게시물번호 - {item.postnum} / 신고자 - {item.writer} / 신고이유 -
        {item.reason} / 신고 일시 - {item.reportDate}
        <button onClick={()=>{approveReport(item.postnum);}}>승인</button>
        <button onClick={()=>{refuseReport(item.postnum); }}>거절</button>
        </div>
      );
    }
  }
  return array;
}

function Table(list, key, navigate) {

  let array = [];
  for (var i = 0; i < key.length; i++) {
    for (var j = 0; j < list[key[i]].length; j++) {
      let item = list[key[i]][j];
      let time = item.reportDate.split('T')
      array.push(
        <Tr>
          <Td onClick={(e)=>{navigate('/post', {state: {postnum: item.postnum}})}}>
            {item.postnum}번 게시물 / 이동</Td>
          <Td>{item.reason}</Td>
          <Td>{time[0]+' / '+time[1].split('.')[0]}</Td>
          <Td>{item.writer}</Td>
          <Td style={{display: 'flex'}}>
            <CardButton onClick={(e) => {
                Swal.fire({
                  title: "신고 승인",
                  text: "'" + item.postnum + "'번 게시물에 관해 신고를 승인하시겠습니까?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "승인",
                  cancelButtonText: "취소",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed){
                    approveReport(item.postnum);
                    refuseReport(item.postnum);
                  }
                })}}>
              승인
              </CardButton>
            <CardButton style={{ backgroundColor: 'red' }}
            onClick={(e) => {
              Swal.fire({
                title: "신고 거절",
                text: "'" + item.postnum + "'번 게시물에 관해 신고를 거절하시겠습니까?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "거절",
                cancelButtonText: "취소",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed){
                  refuseReport(item.postnum);
                }
              })}}
            >
              거절
              </CardButton>
          </Td>

        </Tr>
        )
      ;
    }
  }

  for (let i = 0; i < list.length; i++) {
      array.push(
      )
  }
  return array
}
const ConfirmReport = ({ history }) => {
  const [reportList, setReportList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/getReportList").then(({ data }) => {
      setReportList(data);
      console.log(reportList);
    });
  }, []);
  const navigate = useNavigate();

  return (
    <Body style={{}}>
      <CardWrapper style={{ textAlign: 'center' }}>
        <Title>신고 게시물 관리</Title>
        <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto' }}>
          <TitleTr>
            <Td>게시물번호 / 이동</Td>
            <Td>신고내용</Td>
            <Td>신고날짜 / 시간</Td>
            <Td>신고자</Td>
            <Td>승인 / 거절</Td>
          </TitleTr>
          {Table(reportList, Object.keys(reportList), navigate)}
        </table>
      </CardWrapper>
    </Body>
  );
};

export default ConfirmReport;
