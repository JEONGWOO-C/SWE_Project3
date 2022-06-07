export const kakao_register = (app, connection) => {
  const apiKey = 'c7a9b9859afe2c34985625025e4b14a0';
  const redirect_uri = 'http://localhost:3000/register';
  const hostUrl= 'https://kauth.kakao.com';
  const subUrl = '/oauth/authorize?client_id=${'+apiKey+'}&redirect_uri=${'+redirect_uri+'}&response_type=code';
}

export const id_check = (app, connection) => {
  app.post('/idCheck', (req, res, next) => {
    const { id } = req.body;
    connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id],
      async (error, data) => {
        if (error) {
          throw error;
        }else if(data.length==0){
          res.send({result:true,msg:"OK"});
        }else{
          res.send({result:true,msg:"EXIST"});
        }
      },
    );
  });
}


export default (app, connection) => {
  app.post('/register', (req, res, next) => {
    const { id, pw, name, phone, email } = req.body;
    console.log("id : ", id, "password : ", pw, "name : ", name, "phone : ", phone ,"email : ", email);
    connection.query(
      'INSERT into users(id, pw, name, phone, email) values(?,?,?,?,?)',
      [id, pw, name, phone, email],
      async (error, data) => {
        if (error) {
          res.send({result:false, error:error, msg:data})
        }
        else{
          res.send({result:true, msg:"회원가입에 성공했습니다. 로그인페이지로 가서 로그인하십시요."})
        }
      },
    );
  });
};
