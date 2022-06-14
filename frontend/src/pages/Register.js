import React, { useState, useEffect } from "react";
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
  CardTitle,
  CardSelect,
  CardSelectOption,
} from "../components/Card";
import Swal from "sweetalert2";
import { CheckID } from "../components/Auth";
import axios from "axios";

const id_check = async (id) => {
  const result = await CheckID(id);
  console.log(result);
  if (result === true) {
    Swal.fire(
      "해당ID는 사용 가능 합니다.",
      "계속 회원가입을 진행해 주세요.",
      "success"
    );
  } else {
    Swal.fire(
      "해당ID가 이미 사용 중 입니다.",
      "다른 ID로 진행해주세요.",
      "error"
    );
  }

  return result;
};

const register = async (id, pw, phoneNum, email, name, age) => {
  if (id === "") {
    Swal.fire("회원가입에 실패했습니다.", "ID를 입력해주세요.", "error");
    return false;
  } else if (pw === "") {
    Swal.fire("회원가입에 실패했습니다.", "패스워드를 입력해주세요.", "error");
    return false;
  } else if (name === "") {
    Swal.fire("회원가입에 실패했습니다.", "닉네임을 입력해주세요.", "error");
    return false;
  } else if (age === "") {
    Swal.fire("회원가입에 실패했습니다.", "나이를 입력해주세요.", "error");
    return false;
  }
  const res = await axios.post("http://localhost:4000/register", {
    id: id,
    pw: pw,
    phone: phoneNum,
    email: email,
    name: name,
    age: age,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire("회원가입에 성공하였습니다.", msg, "success");
  } else {
    Swal.fire("회원가입에 실패했습니다.", msg, "error");
  }

  return result;
};

const Register = ({}) => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>회원가입</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardTitle>아이디</CardTitle>
            <div style={{ display: "flex" }}>
              <CardInput
                placeholder="5~15 영문 및 숫자를 포함"
                type="text"
                onChange={(e) => setID(e.target.value)}
              ></CardInput>
              <CardButton
                style={{ width: "350px" }}
                type="button"
                onClick={async (e) => {
                  console.log("id: ", id);
                  if (await id_check(id)) {
                  }
                }}
              >
                아이디 중복확인
              </CardButton>
            </div>
          </CardFieldset>

          <CardFieldset>
            <CardTitle>비밀번호</CardTitle>
            <CardInput
              placeholder="문자,숫자를 포함 8자리 이상 입력"
              type="password"
              onChange={(e) => setPW(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>휴대폰번호</CardTitle>
            <CardInput
              placeholder="숫자만 입력 ex) 01012345678"
              type="text"
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>이메일</CardTitle>
            <CardInput
              placeholder="id@site.com"
              type="e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>닉네임</CardTitle>
            <CardInput
              placeholder="2~16자"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>나이</CardTitle>
            <CardInput
              placeholder="숫자로만 입력 ex) 23"
              type="text"
              onChange={(e) => setAge(e.target.value)}
            />
          </CardFieldset>
          <div style={{ padding: "32px", textAlign: "center" }}>
            이미 계정이 있습니다.{" "}
            <a
              onClick={() => navigate("/login")}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              로그인 페이지
            </a>
            로 이동.
          </div>
          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await register(id, pw, phoneNum, email, name, age))
                  navigate("/login");
              }}
            >
              회원가입
            </CardButton>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Register;
