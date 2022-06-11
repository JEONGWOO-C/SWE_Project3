import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/ModifyNotice", (req, res, next) => {
    const { title, body, postnum } = req.body;
    var postDate = toSqlDatetime(new Date());
    if (title === "" || body === "") {
      res.send(false);
      return;
    }
    console.log(title, body, postnum);

    connection.query(
      "UPDATE NOTICE SET title=?, postDate=?, postBody = ? WHERE postnum = ?",
      [title, postDate, body, postnum],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
