import styled from "styled-components";
import { useNavigate } from "react-router";
import {
  updateView,
  updateRecentPosts,
  updateAgeGroupOfPost,
} from "./clickPost";
export const SpeechWrapper = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: left;
  justify-content: left;
`;
export const SpeechBody = styled.div`
  padding-right: 64px;
  padding-left: 64px;
  padding-top: 8px;
`;
export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  padding-left: 64px;
  font-size: 40px;
  font-weight: bold;
`;
export const Msg = styled.strong`
  font-size:20px;
  padding-left:8px;
  padding-right:8px;
  padding-top:4px;
  padding-bottom:4px;
  border-radius: 25px;
  border: 2px;
`;


export const Speech = ({ item }) => {

  // 화면을 채울 정도의 개수보다 작을경우 데이터가 없을 수 있음
  if (item.name === "없음") {
    // 데이터가 없으면
    return <div></div>;
  }
  console.log(item)
  const color = item.position=='right'?'#FFBB00':'#FAED7D';
  console.log(item.dates);
  console.log(item.dates.split(/[TZ]/));
  const date_split = item.dates.split(/[TZ]/);
  const dates = date_split[0].split(/-/);
  const times = date_split[1].split(/\./);
  console.log("date: ",dates,"time: ",times);
  const printDate = dates[0]+"년 "+dates[1]+"월 "+dates[2]+"일 "+times[0];
  return (
    <SpeechBody>
        {item.position=='right'?
          <div align={item.position}>
            <font style={{fontSize:'5px'}}>{printDate}</font>
            &nbsp;&nbsp;<Msg style={{backgroundColor:color}}>{item.msg}</Msg>
          </div>
          :
          <div align={item.position}>
            <Msg style={{backgroundColor:color}}>{item.msg}</Msg>
            &nbsp;&nbsp;<font style={{fontSize:'5px'}}>{printDate}</font>
          </div>
        }
    </SpeechBody>
  );
};
export function PrintSpeech(list, start, num) {
  let array = [];
  for (let i = start; i < start + num; i++) {
    array.push(<Speech item={list[i]} />);
  }
  return array;
}
export function PrintSpeechs(list, length, num) {
  let array = [];
  let i = 0;
  console.log(parseInt(length / num));
  for (; i < parseInt(length / num); i++) {
    array.push(
      <SpeechWrapper>{PrintSpeech(list, num * i, num)}</SpeechWrapper>
    );
  }
  if (length % num) {
    array.push(
      <SpeechWrapper>
        {PrintSpeech(list, i * num, length % num)}
      </SpeechWrapper>
    );
  }
  return array;
}

