import auth from "../modules/auth.js";
import { toSqlDatetime } from "../modules/util.js";

export default (app, connection) => {
  app.get("/UploadQnA", auth);
  app.use("/UploadQnA", (req, res, next) => {
    const { title, body, password, IsOpen } = req.query;
    const { id } = req.query;

    var postDate = toSqlDatetime(new Date());
    if (
      title == "" ||
      body == "" ||
      (IsOpen == "false" && (password == "" || password.length != 4))
    ) {
      res.send(false);
      return;
    }

    connection.query(
      "INSERT into QnA(writerID, title, postDate, postBody, pw) values(?,?,?,?,?)",
      [id, title, postDate, body, password],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
