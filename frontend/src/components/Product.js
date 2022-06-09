import styled from "styled-components";
import { useNavigate } from "react-router";

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: left;
  justify-content: left;
`;
export const ProducBody = styled.div`
  padding-right: 64px;
  padding-left: 64px;
  padding-bottom: 64px;
  padding-top: 8px;
`;
export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  padding-left: 64px;
  font-size: 40px;
  font-weight: bold;
`;
export const Product = ({ img, name, price }) => {
  const navigate = useNavigate();

  // 화면을 채울 정도의 개수보다 작을경우 데이터가 없을 수 있음
  if (name === "없음") {
    // 데이터가 없으면
    return <div></div>;
  }
  return (
    <ProducBody
      onClick={() => {
        navigate("/post");
      }}
    >
      <div>
        <img src={img} width={128} height={128} alt="이미지없음" />
      </div>
      <div>{name}</div>
      <div>{price}</div>
    </ProducBody>
  );
};
export function PrintProduct(list, start, num, img) {
  let array = [];
  for (let i = start; i < start + num; i++) {
    array.push(
      <Product
        key={list[i].title}
        img={img}
        name={list[i].title}
        price={list[i].price}
      />
    );
  }
  return array;
}

export function PrintProducts(list, length, num, img) {
  let array = [];
  let i = 0;
  for (; i < parseInt(length / num); i++) {
    array.push(
      <ProductWrapper>{PrintProduct(list, num * i, num, img)}</ProductWrapper>
    );
  }
  if (length % num) {
    array.push(
      <ProductWrapper>
        {PrintProduct(list, i * num, length % num, img)}
      </ProductWrapper>
    );
  }
  return array;
}
