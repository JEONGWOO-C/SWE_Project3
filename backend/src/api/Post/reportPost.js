import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/reportPost", (req, res, next) => {
    const { writer, postnum, reason } = req.body;
    var reportDate = toSqlDatetime(new Date());
    if (reason === "") {
      res.send(false);
      return;
    }
    connection.query(
      "INSERT into reports(writer, postnum, reason, reportDate) values(?,?,?,?)",
      [writer, postnum, reason, reportDate],
      (error, data) => {
        if (error) res.send(false);
        else {
          res.send(true);
        }
      }
    );
  });
};
