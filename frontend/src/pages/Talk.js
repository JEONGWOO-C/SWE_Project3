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

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

const Talk = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum
  const info = getInfoFromCookie();

  /*var [chatList,setChatList] = useState([]);
  useEffect(()=>{
    axios
    .post("http://localhost:4000/getChatList",{},{
      headers:{token: info.token},
    }).then(({data}) =>setChatList(data.list))
  })*/

  var [roomNum,setRoomNum] = useState([]);
  useEffect(()=>{
    axios
    .post("http://localhost:4000/lastChat",{},{
      headers:{token: info.token},
    }).then(({data}) =>setRoomNum(data.last))
  })

  var [msg,setMsg] = useState([]);
  var [chatContent,setChatContent] = useState([]);
  useEffect(()=>{
    axios
      .post("http://localhost:4000/showChat",{postnum:postnum},{
        headers:{token: info.token},
      }).then(({data}) =>{setChatContent(data);})
  },[])

  var [seller_id,setSellerID] = useState([]);
  useEffect(()=>{
    if(typeof postnum === 'number'){
      axios
        .post("http://localhost:4000/getSeller",{
          postnum:postnum,roomNumber:roomNum})
        .then(({data}) =>{
          console.log(data.token);setSellerID(data.token);})
    }
  },[])

  var [buyer_id,setBuyerID] = useState([]);
  useEffect(()=>{
    if(typeof postnum === 'number')
      setBuyerID(info.token);
    else{
      axios
        .post("http://localhost:4000/getBuyer",{
          roomNumber:roomNum})
        .then(({data}) =>{
          console.log(data)
          setBuyerID(data.token);
        })
    }
  },[])

  return (

    <Body style={{}}>
      <CardWrapper>

        <div>
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
                  {/* 사용자 닉네임 */}
                  <div style={{ width: '70%', float: 'left', fontSize: '19px', fontWeight: 'bold' }}>
                    김광운
                  </div>
                  {/* 게시물 제목 */}
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
        </div>
      </CardWrapper>
    </Body>
  )
}

export default Talk;
