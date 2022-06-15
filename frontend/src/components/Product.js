import styled from "styled-components";
import { useNavigate } from "react-router";
import {
  updateView,
  updateRecentPosts,
  updateAgeGroupOfPost,
} from "./clickPost";
import { CardButton } from "./Card"
import Swal from "sweetalert2";

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
    <ProducBody style={{ width: '128px' }}
      onClick={() => {
        updateView(item.views, item.postnum);
        updateRecentPosts(item.postnum);
        updateAgeGroupOfPost(item.postnum);
        navigate("/post", { state: { postnum: item.postnum } });
      }}
    >
      <div>
        <img src={item.photo} width={128} height={128} alt="이미지없음"></img>
      </div>
      {item.isSelling ? item.title : <div><span style={{ fontWeight: "bold" }}>[거래완료] </span>{item.title}</div>}
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{price}</div>
      <div>
        찜{item.fav}, 조회{item.views}
      </div>

    </ProducBody>
  );
};
export function PrintProduct(list, start, num, setScore) {
  let array = [];

  for (let i = start; i < start + num; i++) {
    array.push(
      setScore ?

        <div>
          <Product item={list[i]} />
          <CardButton style={{ marginLeft: '64px', width: '128px', marginTop: '-48px' }}
            onClick={(e) => {
              const score = [];
              Swal.fire({
                title: "평점 등록",
                text: "평점을 등록해주세요.(1~5)",
                input: "range",
                inputAttributes: {
                  min: 1,
                  max: 5
                }
              }).then(
                ((result) => {
                  score.push(result.value);
                  Swal.fire({
                    title: "후기 등록",
                    text: "후기를 입력하세요.",
                    input: "text",
                    inputPlaceholder: "후기 입력..",
                  }).then((result) => {
                    score.push(result.value);
                  })
                }))
                console.log(score)
            }}>
            후기등록
          </CardButton>
        </div>
        :
        <Product item={list[i]} />

    );
  }
  return array;
}

export function PrintProducts(list, length, num, viewIsSelling, setScore) {
  let array = [];
  let i = 0;
  if (viewIsSelling) {
    let temp = 0;
    let newList = [];
    for (let j = 0; j < length; j++)
      if (list[j].isSelling)
        newList[temp++] = list[j];
    console.log(newList)
    for (; i < parseInt(newList.length / num); i++) {
      array.push(
        <ProductWrapper>{PrintProduct(newList, num * i, num, setScore)}</ProductWrapper>
      );
    }
    if (newList.length % num) {
      array.push(
        <ProductWrapper>
          {PrintProduct(newList, i * num, newList.length % num, setScore)}
        </ProductWrapper>
      );
    }
  }
  else {
    for (; i < parseInt(length / num); i++) {
      array.push(
        <ProductWrapper>{PrintProduct(list, num * i, num, setScore)}</ProductWrapper>
      );
    }
    if (length % num) {
      array.push(
        <ProductWrapper>
          {PrintProduct(list, i * num, length % num, setScore)}
        </ProductWrapper>
      );
    }
  }
  return array;
}
