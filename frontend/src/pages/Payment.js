import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardInput,
  CardFieldset,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import styled from "styled-components";
import { useLocation } from "react-router";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import { CardButton } from "./FAQ";
import Swal from "sweetalert2";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;
export const SubTitle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 250px;
  font-size: 20px;
  font-weight: bold;
`;
export const InputText = styled.input`
  margin-left: 200px;
  type: text;
  padding-left: 10px;
`;
const Payment = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const info = getInfoFromCookie();
  const [value, setValue] = useState([0]);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/userInfo", {
        headers: { token: info.token },
      })
      .then(({ data }) => {
        console.log(data);
        setMoney(data[0].mileage);
      });
  }, []);

  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (typeof postnum === "number")
      axios
        .get("http://localhost:4000/getPrice", {
          headers: { token: info.token },
        })
        .then(({ data }) => setPrice(data));
  }, []);

  console.log(info.token);

  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>마일리지 충전</Title>

        <SubTitle>
          충전 마일리지 :
          <div style={{ marginTop: "-28px" }}>
            <InputText
              style={{ height: "25px", width: "52%" }}
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </SubTitle>
        <SubTitle style={{ display: "flex" }}>
          <div style={{ marginRight: "60px" }}>보유 마일리지 :</div>
          <div>{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</div>
        </SubTitle>
        <SubTitle style={{ display: "flex" }}>
          <div style={{ marginRight: "36px" }}>충전 후 마일리지 :</div>
          <div>
            {parseInt(money) + parseInt(value)
              ? (parseInt(money) + parseInt(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
              : parseInt(money).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
          </div>
        </SubTitle>
        <CardButton
          style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto" }}
          onClick={() => {
            Swal.fire({
              title: "충전 확인",
              text: "마일리지를 충전하시겠습니까?",
              icon: "question",

              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "충전",
              cancelButtonText: "취소",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                axios
                  .post(
                    "http://localhost:4000/setMileage",
                    {
                      value: parseInt(money) + parseInt(value),
                    },
                    { headers: { token: info.token } }
                  )
                  .then(({ data }) => {
                    if (data.result === true) {
                      Swal.fire(
                        "충전이 완료되었습니다.",
                        "보유 마일리지: " +
                        (parseInt(money) + parseInt(value)) .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
                        "success"
                      ).then((result) => {
                        if (result.isConfirmed) window.location.reload();
                      });
                    }
                  });
              }
            });
          }}
        >
          충전하기
        </CardButton>
      </CardWrapper>
    </Body>
  );
};

export default Payment;
