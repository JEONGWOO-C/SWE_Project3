import React, { useState } from 'react';
import {
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardFieldset,
    CardInput,
    CardButton,
    CardLink
} from "../components/Card";
import Swal from 'sweetalert2'
import axios from 'axios';

const login = async(id, pw) => {
    const res = await axios.post('http://localhost:4000/login', {
        id: id,
        pw: pw
    })
    if(res.data===true)
    {
        Swal.fire(
            '로그인이 성공하였습니다.',
            'success'
          )
    }else{
        Swal.fire(
            '아이디 또는 비밀번호가 틀립니다.',
            '회원가입 또는 계정찾기를 진행해주세요.',
            'error'
          )
    }

    return res.data;
}

const Login = ({history}) => {
    const [id, setId] = useState('');
    const [pw, setPassword] = useState('');

    return (
        <div>
            <CardWrapper>
                <CardHeader>
                <CardHeading>로그인</CardHeading>
                </CardHeader>

                <CardBody>
                    <CardFieldset>
                        <CardInput placeholder="이메일" type="text" onChange={e => setId(e.target.value)} />
                    </CardFieldset>

                    <CardFieldset>
                        <CardInput placeholder="비밀번호" type="password"  onChange={e => setPassword(e.target.value)}  />
                    </CardFieldset>

                    <CardFieldset>
                        <CardButton type="button" onClick={async(e)=> {if(await login(id, pw)) {history.push('/');}}}>로그인</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardLink to="/register">계정이 없으신가요?</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
        </div>
    );
};

export default Login; 