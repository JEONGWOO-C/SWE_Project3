import React, { useState, useEffect } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
  CardTitle,
  CardSelect,
  CardSelectOption,
} from '../components/Card';
import Swal from 'sweetalert2';
import { CheckID } from '../components/Auth';
const id_check = async (id) => {
  const result = await CheckID(id);
  console.log(result);
  if (result == true) {
    Swal.fire(
      '아이디 사용 가능 합니다.',
      'success',
    );
  } else {
    Swal.fire(
      '아이디가 이미 사용 중 입니다.',
      'error',
    );
  }

  return result;
};

const Register = ({ history }) => {
  const [id, setID] = useState('');
  return(
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>회원가입</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardTitle>아이디</CardTitle>
            <div style={{display: 'flex'}}>
            <CardInput
              placeholder='5~15 영문 및 숫자를 포함'
              type='text'
              onChange={(e) => setID(e.target.value)}>
            </CardInput>
            <CardButton style={{width: '350px'}}
              type="button"
              onClick={async (e) => {
                console.log("id: ",id)
                if (await id_check(id)) {
                }
              }}
            >아이디 중복확인
            </CardButton>
            </div>
          </CardFieldset>

          <CardFieldset>
            <CardTitle>비밀번호</CardTitle>
            <CardInput
              placeholder='6자리 이상'
              type='password'
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>휴대폰번호</CardTitle>
            <CardInput
              placeholder='숫자만 입력 ex) 01012345678'
              type='text'
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>이메일</CardTitle>
            <CardInput
              placeholder='id@site.com'
              type='e-mail'
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>닉네임</CardTitle>
            <CardInput
              placeholder='5~10자'
              type='text'
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>나이</CardTitle>
            <CardInput
              placeholder='숫자로만 입력 ex) 23'
              type='text'
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="submit"
            >
              회원가입
            </CardButton>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Register;