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
import { Link } from 'react-router-dom';
import { useNavigate, withRouter } from 'react-router';

const Body = styled.div`
  //position: fixed;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  justify-content: center;
`;
const Sel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: #e5195f;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const UnSel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: white;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

//홈페이지 로고, 통계, 마이페이지, 로그인
const Nav = ({ history }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(window.location.pathname);
  return (
    <Body>
      <CardWrapper style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <TitleWrapper>
            <CardHeading
              style={{
                color: '#1b5ac2',
                paddingLeft: '20px',
                paddingTop: '4px',
                paddingRight: '20px'
              }}
              onClick={()=>{
                navigate("/");
              }}
            >
              OO마켓
            </CardHeading>
            <CardFieldset style={{
              paddingLeft: '20px',
              width: '400px'
            }}>
              <CardInput
                placeholder="검색어를 입력하세요"
                type="text"
              />
            </CardFieldset>
            <CardBody>
              <CardFieldset style={{ marginLeft: '20px' }}>
                <CardLink to = '/register'>
                  로그인 / 회원가입
                </CardLink>
              </CardFieldset>
            </CardBody>
          </TitleWrapper>
        </CardHeader>
        <TitleWrapper style={{
          paddingBottom: '20px'
        }}>
          <CardBody>카테고리</CardBody>

          <TitleWrapper style={{
            width: '700px'
          }}>
            <CardBody>
              <CardLink to = '/myshop'>
                  내상점
              </CardLink>
            </CardBody>
            <CardBody>
              <CardLink to = '/wish'>
                  찜목록
              </CardLink>
            </CardBody><CardBody>
              <CardLink to = '/viewed'>
                  최근본상품
              </CardLink>
            </CardBody><CardBody>
              <CardLink to = '/talk'>
                  OO톡
              </CardLink>
            </CardBody>
            <CardBody>
              <CardLink to = '/faq'>
                  고객센터
              </CardLink>
            </CardBody>
            
          </TitleWrapper>
          <CardBody>
              <CardLink to = '/sell'>
                  판매하기
              </CardLink>
            </CardBody>
        </TitleWrapper>
      </CardWrapper>

    </Body>
  );
};

export default Nav;
