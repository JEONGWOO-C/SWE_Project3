import React, { useState, useEffect, useRef } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardInput,
  CardBody,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import { BsList, BsCameraFill } from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate, withRouter } from "react-router";
import "../dropdown.css";
import { getInfoFromCookie, logout } from "../components/Auth";
import { searchPost } from "../components/searchPost";
import Swal from "sweetalert2";

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
  const [searchWord, setSearchWord] = useState("");
  const onKeyPress = async (e) => {
    if (e.key === "Enter") {
      const result = await searchPost(searchWord);
      console.log(result);
      navigate("/search", { state: { search: searchWord, result: result } })
    }
  };

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
        window.addEventListener("click", pageClickEvent);
      }

      return () => {
        window.removeEventListener("click", pageClickEvent);
      };
    }, [isActive, el]);

    return [isActive, setIsActive];
  };

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const [catList, setCatList] = useState([
    "여성의류",
    "남성의류",
    "여성잡화",
    "남성잡화",
    "시계/쥬얼리",
    "디지털/가전",
    "스포츠/레저",
    "가구/인테리어",
    "유아동/유아도서",
    "생활/가공식품",
    "게임/취미",
    "도서/티켓/음반",
    "반려동물용품",
    "기타 중고물품",
  ]);

  function list() {
    var array = [];
    for (let i = 0; i < 14; i++) {
      array.push(
        <li>
          <div
            onClick={() => {
              navigate("/category", { state: { category: catList[i] } });
              window.location.reload();
              onClick();
            }}
          >
            {catList[i]}
          </div>
        </li>
      );
    }
    return array;
  }
  // admin값이 true면 admin 네비게이션
  let admin = false;
  if (info)
    if (info.token)
      admin = (info.token.type == 'admin')
  return (
    <Body>
      <CardWrapper
        style={{ paddingTop: 0, paddingBottom: 0, overflow: "visible" }}
      >
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <TitleWrapper>
            <CardHeading
              style={{
                color: "#033a7a",
                paddingLeft: "20px",
                paddingTop: "4px",
                paddingRight: "20px",
                fontSize: "36px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              OO마켓
            </CardHeading>
            <CardFieldset
              style={{
                paddingLeft: "20px",
                width: "400px",
              }}
            >
              <CardInput
                placeholder="검색어를 입력하세요"
                type="text"
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyPress={onKeyPress}
              />
            </CardFieldset>
            {info ? (
              <TitleWrapper>
                {admin ? 
                <CardBody>관리자님 환영합니다!</CardBody> 
                : 
                <CardBody>{info.name} 님 환영합니다!</CardBody>

                <CardBody className="select"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <input type='radio' id='logout' name="navButton"/>
                  <label for='logout'>로그아웃</label>
                </CardBody>
                {admin ? null : (
                  <CardBody className="select"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/mypage");
                    }}
                  >
                    <input type='radio' id='mypage' name="navButton"/>
                    <label for='mypage'>마이페이지</label>
                  </CardBody>
                )}
              </TitleWrapper>
            ) : (
              <TitleWrapper>
                <CardBody className="select"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <input type='radio' id='login' name="navButton"/>
                    <label for='login'>로그인 / 회원가입</label>
                </CardBody>
              </TitleWrapper>
            )}
          </TitleWrapper>
        </CardHeader>

        <TitleWrapper
          style={{
            paddingBottom: "20px",
          }}
        >
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <span>
                <CardBody>카테고리</CardBody>
              </span>
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              {isActive ? <ul>{list()}</ul> : null}
            </nav>

        {admin ?
          <div>
            <TitleWrapper style={{paddingBottom:'20px'}}>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  <div>{navigate("/membermanagement")}</div>;
                }}
              >
                <input type='radio' id='manage1' name="navButton"/>
                    <label for='manage1'>회원 관리</label>
              </CardBody>

              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  <div>{navigate("/adminmanagement")}</div>;
                }}
              >
                <input type='radio' id='manage2' name="navButton"/>
                    <label for='manage2'>관리자 관리</label>
              </CardBody>

              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  <div>{navigate("/confirmreport")}</div>;
                }}
              >
                <input type='radio' id='confirm' name="navButton"/>
                    <label for='confirm'>신고 게시물</label>
              </CardBody>
              
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {navigate("/custcenter")}}
              >
                <input type='radio' id='center' name="navButton"/>
                    <label for='center'>고객센터</label>
              </CardBody>
            </TitleWrapper>
          </div>
          :
          <TitleWrapper
            style={{
              paddingBottom: "20px",
            }}
          >
            <div className="menu-container">
              <button onClick={onClick} className="menu-trigger">
                <span>
                  <BsList style={{paddingRight: '8px'}} />카테고리
                </span>
              </button>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                {isActive ? <ul>{list()}</ul> : null}
              </nav>
            </div>

            <TitleWrapper
              style={{
                width: "700px",
              }}
            >
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/myshop")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
                <input type='radio' id='myshop' name="navButton"/>
                    <label for='myshop'>내상점</label>
              </CardBody>

              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/wish")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
                <input type='radio' id='favorite' name="navButton"/>
                    <label for='favorite'>찜목록</label>
              </CardBody>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/viewed")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
                <input type='radio' id='viewed' name="navButton"/>
                    <label for='viewed'>최근본상품</label>
              </CardBody>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/talk")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
                <input type='radio' id='talk' name="navButton"/>
                    <label for='talk'>OO톡</label>
              </CardBody>
              <CardBody className="select"
              style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/custcenter")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
              <input type='radio' id='center' name="navButton"/>
                    <label for='center'>고객센터</label>
              </CardBody>
              
            <CardBody className="select"
              style={{ cursor: "pointer" }}
              onClick={() => {
                info ? (
                  <div>{navigate("/sell")}</div>
                ) : (
                  <div>
                    {Swal.fire(
                      "로그인이 필요합니다.",
                      "로그인 창으로 이동합니다."
                    )}
                    {navigate("/login")}
                  </div>
                );
              }}
            >
              <input type='radio' id='sell' name="navButton"/>
                <label for='sell'>
                  <BsCameraFill style={{paddingRight: '5px'}}/>판매하기</label>
            </CardBody>

          </TitleWrapper>
        }
      </CardWrapper>
    </Body>
  );
};

export default Nav;
