import React, { useState, useEffect } from 'react';
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
} from '../components/Card';
import { BiUser, BiCog } from "react-icons/bi";
import styled from 'styled-components';
import { useLocation } from 'react-router';
import axios from 'axios';
import { getInfoFromCookie } from '../components/Auth';
import { Speech } from '../components/speech';
import { CardButton } from './FAQ';
import { ChatSelect } from '../components/TalkList.js';
import Swal from "sweetalert2";

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
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
  const postnum = navigateState && navigateState.postnum
  const info = getInfoFromCookie();
  const [value, setValue] = useState([0]);
  const [money, setMoney] = useState(0);
  useEffect(()=>{
    axios.get("http://localhost:4000/userInfo",{
      headers:{token:info.token}
    }).then(({data})=>{console.log(data);setMoney(data[0].mileage);})
  }, [])
  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(typeof postnum === 'number')
      axios.get("http://localhost:4000/getPrice",{
        headers:{token:info.token}
      }).then(({data})=>setPrice(data))
  }, [])
  
  console.log(info.token)
  /*var [chatList,setChatList] = useState([]);
  useEffect(()=>{
    axios
    .post("http://localhost:4000/getChatList",{},{
      headers:{token: info.token},
    }).then(({data}) =>setChatList(data.list))
  })*/

  // var [roomNum,setRoomNum] = useState([]);
  // useEffect(()=>{
  //   axios
  //   .post("http://localhost:4000/lastChat",{},{
  //     headers:{token: info.token},
  //   }).then(({data}) =>setRoomNum(data.last))
  // })

  // var [msg,setMsg] = useState([]);
  // var [chatContent,setChatContent] = useState([]);
  // useEffect(()=>{
  //   axios
  //     .post("http://localhost:4000/showChat",{postnum:postnum},{
  //       headers:{token: info.token},
  //     }).then(({data}) =>{setChatContent(data);})
  // },[])

  // var [seller_id,setSellerID] = useState([]);
  // useEffect(()=>{
  //   if(typeof postnum === 'number'){
  //     axios
  //       .post("http://localhost:4000/getSeller",{
  //         postnum:postnum,roomNumber:roomNum})
  //       .then(({data}) =>{
  //         console.log(data.token);setSellerID(data.token);})
  //   }
  // },[])

  // var [buyer_id,setBuyerID] = useState([]);
  // useEffect(()=>{
  //   if(typeof postnum === 'number')
  //     setBuyerID(info.token);
  //   else{
  //     axios
  //       .post("http://localhost:4000/getBuyer",{
  //         roomNumber:roomNum})
  //       .then(({data}) =>{
  //         console.log(data)
  //         setBuyerID(data.token);
  //       })
  //   }
  // },[])

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
        <SubTitle style={{ display: 'flex' }}>
          <div style={{ marginRight: '60px' }}>보유 마일리지 :</div>
          <div>{money}원</div>
        </SubTitle>
        <SubTitle style={{ display: 'flex' }}>
          <div style={{ marginRight: '36px' }}>충전 후 마일리지 :</div>
          <div>{(parseInt(money) + parseInt(value)) ? (parseInt(money) + parseInt(value)) : 0}원</div>
        </SubTitle>
        <CardButton style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={()=>{
            Swal.fire({
              title: '충전 확인',
              text: '마일리지를 충전하시겠습니까?',
              icon: 'question',

              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '충전',
              cancelButtonText: '취소',
              reverseButtons: true,
            })
            .then(result => {
              if (result.isConfirmed) {
                // 마일리지가 구매하는 상품의 개수보다 적다면
                if(price>value+money)
                  Swal.fire('충전량이 부족합니다.', '필요 마일리지: '+(parseInt(price) - parseInt(value))+'원', 'Error');
                // 아니라면 구매 완료
                else{
                  axios.post("http://localhost:4000/charging",{
                    value:value+money
                  },{headers:{token:info.token}})
                  .then(({data})=>{
                    console.log(data);
                    Swal.fire('충전이 완료되었습니다.', '보유 마일리지: '+(parseInt(money) + parseInt(value))+'원', 'success');
                  })
                  window.location.reload()
                }
                //구매 완료시 마일리지 차감 후 상품 상태 바꾸기
                // 구매자의 구매 내역 및 판매자의 판매 내역에 상품 추가
             }
            });
            }}>
          충전하기</CardButton>
        {/* <div>
          <div className='chat_list'>
            <ChatSelect item={{username:'AAA'}} onClick={(e)=>{}} />
          </div>

          <div className='chat_detail'>
            <div style={{ borderBottom: 'solid 1px #ababab' }}>
              <div style={{ width: '40%' }}>
                <div style={{ width: '30%', height: '60px', float: 'left' }}>
                  <BiUser style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <div style={{ width: '70%', float: 'left', fontSize: '19px', fontWeight: 'bold' }}>
                    김광운
                  </div>
                  <div style={{ paddingTop: '35px', marginBottom: '12px' }}>
                    포켓몬빵
                  </div>
                </div>
              </div>
            </div>

            <div className='chat_comment'>
              {chatContent && chatContent.map((item) => (<Speech item={item} />))}  
            </div>

            <div style={{display: "flex" }}>
              <CardInput
                placeholder="상대방에게 보내고 싶은 내용을 입력하세요."
                type="text"
                onChange={(e) => setMsg(e.target.value)}
                style={{width: '100%', paddingLeft: '10px'}}
              ></CardInput>
              <CardButton
                style={{marginLeft: '20px', marginTop: '10px', width: "100px" }}
                type="button"
                onClick={async (e) => {
                  axios.post("http://localhost:4000/addChat",{msg:msg,postnum:postnum},{
                    headers:{token:info.token, token2:seller_id, token3:buyer_id},
                  })
                    .then(()=>{
                      axios
                        .post("http://localhost:4000/showChat",{postnum:postnum},{
                          headers:{token: info.token},
                        }).then(({data}) =>{setChatContent(data);})
                    } )
                }}
              >
                전송
              </CardButton>
            </div>
          </div>
        </div> */}
      </CardWrapper>
    </Body>
  )
}

export default Payment;
