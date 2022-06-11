import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/UploadFAQ", (req, res, next) => {
    const { title, body } = req.body;
    var postDate = toSqlDatetime(new Date());
    console.log("title : " + title + "body : " + body);
    if (title === "" || body === "") {
      res.send(false);
      return;
    }
    connection.query(
      "INSERT into FAQ(title, postDate, postBody) values(?,?,?)",
      [title, postDate, body],
      (error, data) => {
        if (error) res.send(false);
        else {
          console.log("1231242");
          res.send(true);
        }
      }
    );
  });
};
