export default (app, connection) => {
  app.post('/register', (req, res, next) => {
    const { id, pw, name, phone, email } = req.body;
    console.log("id : ", id, "password : ", pw, "name : ", name, "phone : ", phone ,"email : ", email);
    connection.query(
      'INSERT into users(id, pw, name, phone, email) values(?,?,?,?,?)',
      [id, pw, name, phone, email],
      async (error, data) => {
        if (error) {
          res.send({result:false,error:error,msg:"회원가입에 성공했습니다. 로그인페이지로 가서 로그인하십시요."})
        }
        else{
          res.send({result:true,msg:"회원가입에 성공했습니다. 로그인페이지로 가서 로그인하십시요."})
        }
      },
    );
  });
};
