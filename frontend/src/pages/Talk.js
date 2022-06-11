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

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;
<<<<<<< Updated upstream

const Talk = ({ history }) => {
  return(
  
    <Body style={{}}>
      <CardWrapper>
        OO톡
      </CardWrapper>
=======

const Talk = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const info = getInfoFromCookie();

  var [chatContent, setChatContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/showChat", {
        headers: { token: info.token },
        params: { postnum: postnum }
      }).then(({ data }) => { console.log(data); console.log(data.length); setChatContent(data); })
    setChatContent()
  }, [])

  return (

    <Body style={{}}>
      <CardWrapper>
        {chatContent && chatContent.map((item) => (<Speech item={item} />))}

        <div>
          <div className='chat_list'>
            <div onClick={(e) => { }} /* 클릭하면 오른쪽에 chat_detail 띄워주기 */
              style={{
                borderBottom: 'solid 1px #ababab',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '30%', height: '60px', float: 'left' }}>
                <BiUser style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <div>
                  {/* 사용자 닉네임 */}
                  <div style={{ width: '50%', float: 'left', fontSize: '19px', fontWeight: 'bold' }}>
                    김광운
                  </div>
                  {/* 마지막 채팅 시간 */}
                  <div style={{ color: '#ababab', fontWeight: 'lighter' }}>
                    4분전
                  </div>
                </div>
                {/* 마지막 채팅 내용 */}
                <div style={{ paddingTop: '15px', marginBottom: '12px' }}>
                  아아아아아아아아
                </div>
              </div>
            </div>
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
              여기는 채팅 내용 보여주는 컨테이너
            </div>

            <div style={{display: "flex" }}>
              <CardInput
                placeholder="상대방에게 보내고 싶은 내용을 입력하세요."
                type="text"
                onChange={(e) => { }}
                style={{width: '100%', paddingLeft: '10px'}}
              ></CardInput>
              <CardButton
                style={{marginLeft: '20px', marginTop: '10px', width: "100px" }}
                type="button"
                onClick={async (e) => {
                }}
              >
                전송
              </CardButton>
            </div>
          </div>
        </div>
      </CardWrapper>

>>>>>>> Stashed changes
    </Body>
  )
}

export default Talk;
