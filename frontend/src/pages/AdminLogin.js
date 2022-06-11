import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
} from "../components/Card";
import Swal from "sweetalert2";
import { handleAdminLogin, logout } from "../components/Auth";

const adminlogin = async (id, pw) => {
  const { result, isApproved } = await handleAdminLogin(id, pw);
  console.log(isApproved);
  if (result === true) {
    if (isApproved) {
      Swal.fire("로그인이 성공하였습니다.", "환영합니다.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    } else {
      logout();
      Swal.fire(
        "로그인이 성공하였습니다.",
        "관리자 승인 대기중입니다.",
        "error"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  } else {
    Swal.fire(
      "아이디 또는 비밀번호가 틀립니다.",
      "회원가입 또는 계정찾기를 진행해주세요.",
      "error"
    );
  }

  return result;
};

const AdminLogin = ({}) => {
  const [id, setID] = useState("");
  const [pw, setPassword] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>관리자 로그인</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="아이디"
              type="text"
              onChange={(e) => setID(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              placeholder="비밀번호"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await adminlogin(id, pw)) {
                  navigate("/");
                }
              }}
            >
              로그인
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/adminregister">관리자 회원가입</CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/login">관리자가 아닙니다.</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default AdminLogin;
