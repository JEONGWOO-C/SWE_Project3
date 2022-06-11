import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import { Title, SubTitle, InputText } from "./Sell";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

export const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const modifynotice = async (title, body, postnum) => {
  const res = await axios.post("http://localhost:4000/ModifyNotice", {
    title: title,
    body: body,
    postnum: postnum,
  });
  if (res.data === true) {
    Swal.fire(
      "공지사항 수정에 성공하였습니다.",
      "공지사항 페이지로 이동합니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "공지사항 등록에 실패하였습니다.",
      "제목및 내용을 입력해주세요. ",
      "error"
    );
    return false;
  }
};

const ModifyNotice = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  var [title, setTitle] = useState([]);
  var [body, setBody] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getNoticebyPostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => {
        setNoticeData(data);
        setTitle(data.title);
        setBody(data.postBody);
      });
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>공지사항 수정</Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="게시글 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              defaultValue={noticeData.length ? noticeData[0].title : ""}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="게시글 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              defaultValue={noticeData.length ? noticeData[0].postBody : ""}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </SubTitle>

        <hr />
        <div style={{ textAlign: "center" }}>
          <button
            type="reset"
            style={{
              margin: "16px",
              height: "50px",
              width: "120px",
              backgroundColor: "#c4c4c4",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              margin: "16px",
              height: "50px",
              width: "120px",
              backgroundColor: "#033a7a",
              color: "#fff",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={async (e) => {
              if (title === undefined) title = noticeData[0].title;
              if (body === undefined) body = noticeData[0].postBody;
              if (await modifynotice(title, body, postnum)) {
                navigate("/notice");
              }
            }}
          >
            수정
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default ModifyNotice;
