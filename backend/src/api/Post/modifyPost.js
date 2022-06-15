import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/modifyPost", (req, res, next) => {
    const { postnum, title, category, price, descript } = req.body;
    connection.query(
      "UPDATE posts SET title = ? WHERE postnum = ?;",
      [title, postnum],
      (error) => {
        console.log(error);
        if (error) res.send({ result: false });
        else {
          connection.query(
            "UPDATE product SET category = ?, price = ?, descript = ? WHERE postnum = ?",
            [category, price, descript, postnum],
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
