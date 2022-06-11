export const Adminid_check = (app, connection) => {
  app.post("/Adminid_check", (req, res, next) => {
    const { id } = req.body;
    connection.query(
      "SELECT * FROM admins WHERE id = ?",
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
  app.post("/adminRegister", (req, res, next) => {
    const { id, pw, name, phone, email } = req.body;
    connection.query(
      "INSERT into admins(id, pw, adminname, phone, email) values(?,?,?,?,?)",
      [id, pw, name, phone, email],
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
