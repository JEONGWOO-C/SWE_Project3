import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import { Title, SubTitle, InputText } from "./Sell";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { getTokenFromCookie } from "../components/Auth";

export const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const UploadQnA = async (title, body, password, IsOpen) => {
  const token = getTokenFromCookie();
  const res = await axios.get("http://localhost:4000/UploadQnA", {
    headers: { token: token },
    params: { title: title, body: body, password: password, IsOpen: IsOpen },
  });
  if (res.data === true) {
    Swal.fire(
      "Q&A 등록에 성공하였습니다.",
      "Q&A페이지로 이동합니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "Q&A 등록에 실패하였습니다.",
      "제목및 내용, 패스워드를 입력해주세요. ",
      "error"
    );
    return false;
  }
};

const WriteQnA = ({ history }) => {
  let navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Body>
      <CardWrapper>
        <Title>문의사항 등록</Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="문의 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          공개여부
          <div style={{ marginLeft: "200px", marginTop: "-28px" }}>
            {IsOpen ? (
              <div style={{ display: "flex", fontWeight: "500" }}>
                <div
                  style={{
                    height: "28px",
                    width: "80px",
                    textAlign: "center",
                    background: "#033a7a",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    setIsOpen(true);
                  }}
                >
                  공개
                </div>
                <div
                  style={{
                    height: "28px",
                    width: "80px",
                    textAlign: "center",
                    background: "#ddd",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    setIsOpen(false);
                  }}
                >
                  비공개
                </div>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    height: "28px",
                    width: "80px",
                    textAlign: "center",
                    background: "#ddd",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    setIsOpen(true);
                  }}
                >
                  공개
                </div>
                <div
                  style={{
                    height: "28px",
                    width: "80px",
                    textAlign: "center",
                    background: "#033a7a",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    setIsOpen(false);
                  }}
                >
                  비공개
                </div>
              </div>
            )}
          </div>
        </SubTitle>

        {IsOpen ? (
          <div />
        ) : (
          <SubTitle>
            비밀번호
            <div style={{ marginTop: "-28px" }}>
              <InputText
                placeholder="비밀번호 4자를 입력해주세요."
                type="password"
                style={{ height: "25px", width: "20%" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </SubTitle>
        )}

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
              if (await UploadQnA(title, body, password, IsOpen)) {
                navigate("/QnA");
              }
            }}
          >
            등록
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default WriteQnA;
