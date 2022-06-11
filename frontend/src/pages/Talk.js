import React, { useState, useEffect } from 'react';
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
} from '../components/Card';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import axios from 'axios';
import { getInfoFromCookie } from '../components/Auth';
import { Speech } from '../components/speech';
import { CardButton } from './FAQ';

const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;
const Talk = ({ history }) => {
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const info = getInfoFromCookie();

  var [chatContent,setChatContent] = useState([]);
  useEffect(()=>{
    axios
      .get("http://localhost:4000/showChat",{
        headers:{token: info.token},
        params:{postnum:postnum}
      }).then(({data}) =>{console.log(data);console.log(data.length);setChatContent(data);})
    setChatContent()
  },[])

  return(
  
    <Body style={{}}>
      <CardWrapper>
        {chatContent && chatContent.map((item)=>(<Speech item={item}/>))}

        <div style={{ paddingLeft: "40px",paddingLeft: "64px",paddingRight: "64px",display: "flex" }}>
          <CardInput
            placeholder="이곳에 하고싶은 말을 쓰세요."
            type="text"
            onChange={(e) => {}}
          ></CardInput>
          <CardButton
            style={{ width: "200px" }}
            type="button"
            onClick={async (e) => {
            }}
          >
            전송
          </CardButton>
        </div>
      </CardWrapper>
      
    </Body>
  )
}

export default Talk;
