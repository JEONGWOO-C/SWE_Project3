import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import { CardButton } from "./ViewFAQ";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";

export const Body = styled.div`
  display: flex;
  width: 100%;
`;

const ViewNotice = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const [noticeData, setNoticeData] = useState([]);
  console.log(noticeData);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getNoticebyPostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setNoticeData(data));
  }, []);

  const info = getInfoFromCookie();

  let admin = false;
  if (info)
    if (info.token)
      admin = (info.token.type == 'admin')

  return (
    <Body>
      <CardWrapper>
        {noticeData[0] ?
          <div className="View">
            <div className="top_title">
              <div id="title_txt">{noticeData[0].title}</div>
              <div className="date_div">{noticeData[0].postDate.split('T')[0]}</div>
            </div>

            <div>
              <div className="content">{noticeData[0].postBody}</div>
            </div>
          </div>
          : null}
        {admin ? <CardButton onClick={() => navigate("/modifyNotice",{state:{noticeData:noticeData[0]}})}>수정하기</CardButton> : null}

        <CardButton onClick={() => navigate(-1)}>목록</CardButton>

      </CardWrapper>
    </Body>
  );
};

export default ViewNotice;
