import auth from "../modules/auth.js";
import { toSqlDatetime } from "../modules/util.js";

export default (app, connection) => {
  app.get("/UploadQnA", auth);
  app.post("/UploadQnA", (req, res, next) => {
    const { title, postBody, isAnswered, password } = req.body;
    const { id } = req.query;
    var postDate = toSqlDatetime(new Date());
    console.log(postDate);
    connection.query(
      "INSERT into QnA(writerID, title, postDate, postBody, isAnswered, password) values(?,?,?,?,?,?)",
      [id, title, postBody, isAnswered, password],
      (error, data) => {
        if (error) return false;
        else {
          console.log(data);
          return true;
        }
      }
    );
  });
};
