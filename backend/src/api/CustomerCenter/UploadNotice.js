import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/UploadNotice", (req, res, next) => {
    const { title, body } = req.body;
    var postDate = toSqlDatetime(new Date());
    if (title === "" || body === "") {
      res.send(false);
      return;
    }

    connection.query(
      "INSERT into NOTICE(title, postDate, postBody) values(?,?,?)",
      [title, postDate, body],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
