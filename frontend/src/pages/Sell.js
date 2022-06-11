import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { getInfoFromCookie } from "../components/Auth";

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

export const ImageUpload = styled.button`
  margin-left: 15px;
  width: 100px;
  height: 100px;
`;

export const InputText = styled.input`
  margin-left: 200px;
  type: text;
  padding-left: 10px;
`;

export const StateButton = styled.button`
  margin-left: 15px;
  height: 30px;
  width: 70px;
  text-align: center;
`;

const upload = async (img, title, category, price, description) => {
  console.log(
    "img : " +
      img +
      "\ntitle : " +
      title +
      "\ncategory : " +
      category +
      "\nprice : " +
      price +
      "\ndescription : " +
      description
  );
  var info = getInfoFromCookie();
  var uploadData = new FormData();
  uploadData.append("title", title);
  uploadData.append("category", category);
  uploadData.append("price", price);
  uploadData.append("description", description);
  uploadData.append("img_file", img);
  const res = await axios.post("http://localhost:4000/sell_write", uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
      token : info.token
    },
  });
  console.log("결과");
  console.log(res);

  return res.data;
};

const Sell = ({}) => {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  let navigate = useNavigate();

  const handleClick = () => {
    imgRef.current.click();
  };

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      console.log("이미지주소", reader.result);
    };

    setImg(file);
  };

  return (
    <Body>
      <CardWrapper>
        <Title>상품 등록</Title>

        <SubTitle>
          상품사진
          <div style={{ marginTop: "-27px", marginLeft: "200px" }}>
            <img
              src={imageUrl ? imageUrl : "/image.PNG"}
              onClick={handleClick}
            />
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg"
              ref={imgRef}
              onChange={onChangeImage}
              style={{ display: "none" }}
            />
          </div>
        </SubTitle>

        <SubTitle>
          상품제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="상품 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          카테고리
          <div style={{ marginTop: "-28px" }}>
            <select
              name="selectCategory"
              style={{
                marginLeft: "200px",
                paddingLeft: "10px",
                width: "150px",
                height: "28px",
              }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option hidden selected>
                카테고리 선택
              </option>
              <option value={"여성의류"}>여성의류</option>
              <option value={"남성의류"}>남성의류</option>
              <option value={"여성잡화"}>여성잡화</option>
              <option value={"남성잡화"}>남성잡화</option>
              <option value={"시계/쥬얼리"}>시계/쥬얼리</option>
              <option value={"디지털/가전"}>디지털/가전</option>
              <option value={"스포츠/레저"}>스포츠/레저</option>
              <option value={"가구/인테리어"}>가구/인테리어</option>
              <option value={"유아동/유아도서"}>유아동/유아도서</option>
              <option value={"생활/가공식품"}>생활/가공식품</option>
              <option value={"게임/취미"}>게임/취미</option>
              <option value={"도서/티켓/음반"}>도서/티켓/음반</option>
              <option value={"반려동물용품"}>반려동물용품</option>
              <option value={"기타 중고물품"}>기타 중고물품</option>
            </select>
          </div>
        </SubTitle>

        <SubTitle>
          상품가격
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="가격을 입력해주세요."
              style={{ height: "25px", width: "30%", marginRight: "10px" }}
              onChange={(e) => setPrice(e.target.value)}
            />
            원
          </div>
        </SubTitle>

        <SubTitle>
          상품설명
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="상품 설명을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              onChange={(e) => setDescription(e.target.value)}
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
            onClick={async (e)=>{
              navigate(-1)
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
              if (img === "")
                Swal.fire(
                  "이미지를 추가해주세요.",
                  "상품 등록에 실패하였습니다.",
                  "error"
                );
              else if (title === "")
                Swal.fire(
                  "상품제목을 입력하세요.",
                  "상품 등록에 실패하셨습니다.",
                  "error"
                );
              else if (category === "")
                Swal.fire(
                  "카테고리를 선택하세요.",
                  "상품 등록에 실패하셨습니다.",
                  "error"
                );
              else if (price === "")
                Swal.fire(
                  "상품가격을 입력하세요.",
                  "상품 등록에 실패하셨습니다.",
                  "error"
                );
              else if (description === "")
                Swal.fire(
                  "상품설명을 입력하세요.",
                  "상품 등록에 실패하셨습니다.",
                  "error"
                );
              else {
                if (await upload(img, title, category, price, description)) {
                  Swal.fire({
                    title: "상품 등록에 성공하셨습니다.",
                    icon: "success",
                  });
                  navigate("/");
                }
              }
            }}
          >
            상품등록 완료
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default Sell;
