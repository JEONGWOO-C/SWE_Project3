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

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
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
        <button onClick={()=>{approveReport(item.postnum);refuseReport(item.postnum);}}>승인</button>
        <button onClick={()=>{refuseReport(item.postnum); }}>거절</button>
        </div>
      );
    }
  }
  return array;
}

const ConfirmReport = ({ history }) => {
  const [reportList, setReportList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/getReportList").then(({ data }) => {
      setReportList(data);
    });
  }, []);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title style={{ textAlign: "center" }}>신고 게시물 관리</Title>
        {reportList.length === 0
          ? null
          : printList(reportList, Object.keys(reportList))}
      </CardWrapper>
    </Body>
  );
};

export default ConfirmReport;
