import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getQnA", auth);
  app.use("/getQnA", async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await connection.query(
      "SELECT Q.postnum, Q.title, Q.postDate, Q.isAnswered, U.username, Q.pw FROM QnA Q, users U WHERE (U.id = Q.writerID AND Q.pw='') OR (U.id = ? AND Q.writerID = ?)ORDER BY postnum;",
      [id, id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
