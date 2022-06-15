import React, { useDispatch } from "react";
import Cookie from "universal-cookie";
import axios from "axios";

const cookies = new Cookie();

export const setTokenToCookie = (token) => {
  cookies.set("token", token, { sameSite: "strict" });
};
export const setInfoToCookie = (info) => {
  cookies.set("info", info, { sameSite: "strict" });
};

export const getTokenFromCookie = () => {
  return cookies.get("token");
};
export const getInfoFromCookie = () => {
  return cookies.get("info");
};

export const logout = () => {
  console.log("localStorage set logout!");
  window.localStorage.setItem("logout", Date.now());
  cookies.remove("token");
  cookies.remove("info");
};

export const handleLogin = async (id, pw) => {
  const res = await axios.post("http://localhost:4000/login", {
    id: id,
    pw: pw,
  });
  if (res.data) {
    console.log("RESDATA : " + res.data);
    if (res.data === "isBanned") {
      return "isBanned";
    }
    console.log("로그인 성공!");
    setTokenToCookie(res.data.token); // cookie에 refresh_token 저장
    setInfoToCookie(res.data); // cookie에 refresh_token 저장
    return true;
  } else {
    console.log("로그인 실패");
    return false;
  }
};

export const handleAdminLogin = async (id, pw) => {
  const res = await axios.post("http://localhost:4000/adminLogin", {
    id: id,
    pw: pw,
  });
  console.log(res.data);
  if (res.data) {
    console.log("로그인 성공!");
    setTokenToCookie(res.data.token); // cookie에 refresh_token 저장
    setInfoToCookie(res.data); // cookie에 refresh_token 저장
    return { result: true, isApproved: res.data.isApproved };
  } else {
    console.log("로그인 실패");
    return { result: false, isApproved: false };
  }
};

export const CheckID = async (id) => {
  console.log("CheckID: ", id);
  const res = await axios.post("http://localhost:4000/idCheck", {
    id: id,
  });
  console.log("res:", res);
  if (res.data.msg === "EIXST") {
    console.log("아이디 이미 존재");
    return false;
  } else if (res.data.msg === "OK") {
    console.log("사용 가능");
    return true;
  }
};

export const CheckAdminID = async (id) => {
  console.log("CheckID: ", id);
  const res = await axios.post("http://localhost:4000/Adminid_check", {
    id: id,
  });
  console.log("res:", res);
  if (res.data.msg === "EIXST") {
    console.log("아이디 이미 존재");
    return false;
  } else if (res.data.msg === "OK") {
    console.log("사용 가능");
    return true;
  }
};
