import styled from "styled-components";
import { useNavigate } from "react-router";
import { updateView } from "./clickPost";

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
export const Product = ({ item }) => {
  const navigate = useNavigate();

  // 3자리 마다 , 추가
  let price =
    item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

  // 화면을 채울 정도의 개수보다 작을경우 데이터가 없을 수 있음
  if (item.name === "없음") {
    // 데이터가 없으면
    return <div></div>;
  }
  return (
    <ProducBody
      onClick={() => {
        updateView(item.views, item.postnum);
        navigate("/post", { state: { postnum: item.postnum } });
      }}
    >
      <div>
        <img src={item.photo} width={128} height={128} alt="이미지없음" />
      </div>
      {item.title}
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{price}</div>
      <div>
        찜{item.fav}, 조회{item.views}
      </div>
    </ProducBody>
  );
};
export function PrintProduct(list, start, num) {
  let array = [];
  for (let i = start; i < start + num; i++) {
    array.push(<Product item={list[i]} />);
  }
  return array;
}

export function PrintProducts(list, length, num) {
  let array = [];
  let i = 0;
  console.log(parseInt(length / num));
  for (; i < parseInt(length / num); i++) {
    array.push(
      <ProductWrapper>{PrintProduct(list, num * i, num)}</ProductWrapper>
    );
  }
  if (length % num) {
    array.push(
      <ProductWrapper>
        {PrintProduct(list, i * num, length % num)}
      </ProductWrapper>
    );
  }
  return array;
}
