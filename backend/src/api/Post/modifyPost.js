import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/modifyPost", (req, res, next) => {
    const { title, category, price, descript } = req.body;
    var postDate = toSqlDatetime(new Date());
    if (title === "" || category === "" || descript === "") {
      res.send({ result: false });
      return;
    }
    console.log(title, category, price, descript);

    connection.query(
      "UPDATE posts SET title = ? WHERE postnum = ?;"[title],
      (error, data) => {
        if (error) res.send({ result: false });
        else {
          connection.query(
            "UPDATE product SET category = ?, price = ?, descript = ? WHERE postnum = ?",
            [postnum],
            (error, data) => {
              if (error) res.send({ result: false });
              else res.send({ result: true });
            }
          );
        }
      }
    );
  });
};
