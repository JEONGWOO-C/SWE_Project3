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
import { handleLogin } from "../components/Auth";

const login = async (id, pw) => {
  const result = await handleLogin(id, pw);
  console.log(result);
  if (result === 'isBanned') {
    Swal.fire(
      "해당 아이디는 차단된 아이디입니다.",
      "관리자에게 문의 바랍니다.",
      "error"
    );
  } else if (result === true) {
    Swal.fire("로그인이 성공하였습니다.", "환영합니다.", "success").then(
      (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }
    );
  } else {
    Swal.fire(
      "아이디 또는 비밀번호가 틀립니다.",
      "회원가입 또는 계정찾기를 진행해주세요.",
      "error"
    );
  }

  return result;
};

const Login = ({}) => {
  const [id, setID] = useState("");
  const [pw, setPassword] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>사용자 로그인</CardHeading>
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
                if (await login(id, pw)) {
                  navigate("/");
                }
              }}
            >
              로그인
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/register">회원가입</CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/adminlogin">관리자 이신가요?</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Login;
