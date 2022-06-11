import { sign } from "../modules/jwt.js";

export default (app, connection) => {
  app.post("/adminLogin", (req, res, next) => {
    const { id, pw } = req.body;
    connection.query(
      "SELECT id, adminname, isApproved FROM admins WHERE id = ? and pw = ?;",
      [id, pw],
      async (error, data) => {
        if (error) throw error;
        const result = data[0] && data[0].id ? true : false;

        if (result === true) {
          const jwtToken = await sign(id, pw);
          jwtToken.name = data[0].name;
          jwtToken.type = "admin";
          // console.log(jwtToken);
          res.send({ token: jwtToken, isApproved: data[0].isApproved });
        } else {
          console.log("fail");
          res.send(null);
        }
      }
    );
  });
};
