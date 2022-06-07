import React, { useState, useEffect, useRef } from 'react';
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
import '../dropdown.css';
import { getInfoFromCookie, logout } from '../components/Auth';


const Body = styled.div`
  //position: fixed;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  //flex-direction: horizontal;
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
  const info = getInfoFromCookie();
  const navigate = useNavigate();
  const [page, setPage] = useState(window.location.pathname);

  //카테고리 드롭다운
  const dropdownRef = useRef(null);
  const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const pageClickEvent = (e) => {
        if (el.current !== null && !el.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      };

      if (isActive) {
        window.addEventListener('click', pageClickEvent);
      }

      return () => {
        window.removeEventListener('click', pageClickEvent);
      }

    }, [isActive, el]);

    return [isActive, setIsActive];
  }

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const [catList, setCatList] = useState([
    '여성의류', '남성의류', '여성잡화', '남성잡화', '시계/쥬얼리', '디지털/가전',
    '스포츠/레저', '가구/인테리어', '유아동/유아도서', '생활/가공식품', '게임/취미',
    '도서/티켓/음반', '반려동물용품', '기타 중고물품'
  ]);

  return (
    <Body>
      <CardWrapper style={{ paddingTop: 0, paddingBottom: 0, overflow: 'visible' }}>
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <TitleWrapper>
            <CardHeading
              style={{
                color: '#033a7a',
                paddingLeft: '20px',
                paddingTop: '4px',
                paddingRight: '20px',
                fontSize: '36px'
              }}
              onClick={() => {
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
            {info ? (
              <TitleWrapper>
                <CardBody
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  로그아웃
                </CardBody>
                <CardBody
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate("/mypage");
                  }}
                >
                  마이페이지
                </CardBody>
              </TitleWrapper>
            ) :
              <TitleWrapper>
                <CardBody
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  로그인 / 회원가입
                </CardBody>
              </TitleWrapper>
            }
          </TitleWrapper>
        </CardHeader>
        <TitleWrapper style={{
          paddingBottom: '20px'
        }}>

          <div className='menu-container'>
            <button onClick={onClick} className='menu-trigger'>
              <span><CardBody>카테고리</CardBody></span>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <ul>
                <li><a href='#'>{catList[0]}</a></li>
                <li><a href='#'>{catList[1]}</a></li>
                <li><a href='#'>{catList[2]}</a></li>
                <li><a href='#'>{catList[3]}</a></li>
                <li><a href='#'>{catList[4]}</a></li>
                <li><a href='#'>{catList[5]}</a></li>
                <li><a href='#'>{catList[6]}</a></li>
                <li><a href='#'>{catList[7]}</a></li>
                <li><a href='#'>{catList[8]}</a></li>
                <li><a href='#'>{catList[9]}</a></li>
                <li><a href='#'>{catList[10]}</a></li>
                <li><a href='#'>{catList[11]}</a></li>
                <li><a href='#'>{catList[12]}</a></li>
                <li><a href='#'>{catList[13]}</a></li>
              </ul>
            </nav>
          </div>

          <TitleWrapper style={{
            width: '700px'
          }}>
            <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/myshop"); }}>
              내상점
            </CardBody>
            <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/wish"); }}>
              찜목록
            </CardBody>
            <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/viewed"); }}>
              최근본상품
            </CardBody>
            <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/talk"); }}>
              OO톡
            </CardBody>
            <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/FAQ"); }}>
              고객센터
            </CardBody>

          </TitleWrapper>
          <CardBody style={{ cursor: 'pointer' }}
              onClick={() => {navigate("/sell"); }}>
              판매하기
            </CardBody>
        </TitleWrapper>
      </CardWrapper>
    </Body>
  );
};

export default Nav;
