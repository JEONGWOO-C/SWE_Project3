export const kakao_register = (app, connection) => {
  const apiKey = "c7a9b9859afe2c34985625025e4b14a0";
  const redirect_uri = "http://localhost:3000/register";
  const hostUrl = "https://kauth.kakao.com";
  const subUrl = 
    "/oauth/authorize?client_id=${" 
    + apiKey 
    + "}&redirect_uri=${" 
    + redirect_uri 
    + "}&response_type=code";
};

export const id_check = (app, connection) => {
  app.post("/idCheck", (req, res, next) => {
    const { id } = req.body;
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      async (error, data) => {
        if (error) {
          throw error;
        } else if (data.length == 0) {
          res.send({ result: true, msg: "OK" });
        } else {
          res.send({ result: true, msg: "EXIST" });
        }
      }
    );
  });
};

export default (app, connection) => {
  app.post("/register", (req, res, next) => {
    const { id, pw, name, phone, email, age } = req.body;
    connection.query(
      "INSERT into users(id, pw, name, phone, email, age) values(?,?,?,?,?,?)",
      [id, pw, name, phone, email, age],
      (error, data) => {
        if (error) {
          if (error.errno == 1062)
            res.send({ result: false, msg: "해당 아이디가 이미 존재합니다." });
          else res.send({ result: false, msg: error.sqlMessage });
        } else {
          res.send({
            result: true,
            msg: "로그인을 진행해 주세요.",
          });
        }
      }
    );
  });
};
