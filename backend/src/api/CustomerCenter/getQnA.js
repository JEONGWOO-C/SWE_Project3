import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getQnA", auth);
  app.use("/getQnA", async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await connection.query(
      "SELECT Q.postnum, Q.title, Q.postDate, Q.isAnswered, U.username FROM QnA Q, users U WHERE Q.writerID = ? AND U.id = Q.writerID;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
