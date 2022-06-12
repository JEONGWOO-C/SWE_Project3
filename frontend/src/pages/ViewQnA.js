import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper, CardInput } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import Swal from "sweetalert2";

export const Body = styled.div`
  display: flex;
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  padding-left: 64px;
  font-size: 40px;
  font-weight: bold;
`;

export const CardButton = styled.button`
  float: right;
  display: block;
  width: 100px;
  height: 36px;
  padding: 0px 0;
  margin: 0px 12px;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #033a7a;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: 0;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
  }
`;

const uploadComment = async (postnum, postComment) => {
  const res = await axios.post("http://localhost:4000/UploadQnAComment", {
    postnum: postnum,
    postComment: postComment,
  });
  if (res.data === true) {
    Swal.fire(
      "답변 등록에 성공하였습니다.",
      "게시글 페이지로 이동합니다.",
      "success"
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    return true;
  } else {
    Swal.fire("답변 등록에 실패하였습니다.", "내용을 입력해주세요. ", "error");
    return false;
  }
};

const ViewQnA = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const [QnAdata, setQnAdata] = useState([]);
  const [pw, setPW] = useState("");
  const [pass, setPass] = useState(false);
  var [comment, setComment] = useState("");
  console.log(comment);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getQnAbyPostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setQnAdata(data));
  }, []);

  const info = getInfoFromCookie();

  let admin = false;
  if (info) if (info.token) admin = info.token.type == "admin";

  return (
    <Body>
      {QnAdata[0] ? (
        <CardWrapper>
          {QnAdata[0].pw && !pass && !admin ? (
            <div>
              <Title>비밀글입니다. 비밀번호를 입력하세요.</Title>
              <div style={{ display: "flex", paddingLeft: "100px" }}>
                <div style={{ width: "100px", fontSize: "20px" }}>
                  비밀번호:
                </div>
                <CardInput
                  style={{ width: "100px" }}
                  placeholder="4자리 비밀번호"
                  type="password"
                  onChange={(e) => {
                    setPW(e.target.value);
                  }}
                />
                <CardButton
                  onClick={(e) => {
                    if (pw === QnAdata[0].pw) {
                      Swal.fire("비밀번호가 일치합니다", "success");
                      setPass(true);
                    } else {
                      Swal.fire("비밀번호가 일치하지 않습니다", "error");
                    }
                  }}
                >
                  확인
                </CardButton>
              </div>
            </div>
          ) : (
            <div>
              <div className="View">
                <div className="top_title">
                  <div id="title_txt">{QnAdata[0].title}</div>
                  <div className="date_div">
                    작성자 ID: {QnAdata[0].writerID} /{" "}
                    {QnAdata[0].postDate.split("T")[0]}
                  </div>
                </div>

                <div>
                  <div className="content">{QnAdata[0].postBody}</div>
                </div>
              </div>

              <div className="admin">
                {QnAdata[0].postComment === "" ? (
                  <div>➡ 관리자 답변 대기중입니다.</div>
                ) : (
                  <div>답변➡ {QnAdata[0].postComment}</div>
                )}
              </div>

              {admin ? (
                !QnAdata[0].isAnswered ? (
                  <div className="comment">
                    <hr />
                    답변하기
                    <p />
                    <textarea
                      className="review-input"
                      placeholder="답변을 입력해주세요."
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <CardButton
                      onClick={async (e) => {
                        if (await uploadComment(postnum, comment)) {
                          navigate("/viewQnA/" + postnum, {
                            state: { postnum: postnum },
                          });
                        }
                      }}
                    >
                      등록하기
                    </CardButton>
                  </div>
                ) : (
                  <div className="comment">
                    <hr />
                    답변수정하기
                    <p />
                    <textarea
                      className="review-input"
                      defaultValue={
                        QnAdata[0].postComment.length
                          ? QnAdata[0].postComment
                          : ""
                      }
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <CardButton
                      onClick={async (e) => {
                        if (await uploadComment(postnum, comment)) {
                          navigate("/viewQnA/" + postnum, {
                            state: { postnum: postnum },
                          });
                        }
                      }}
                    >
                      수정하기
                    </CardButton>
                  </div>
                )
              ) : null}
            </div>
          )}
        </CardWrapper>
      ) : null}
    </Body>
  );
};

export default ViewQnA;
