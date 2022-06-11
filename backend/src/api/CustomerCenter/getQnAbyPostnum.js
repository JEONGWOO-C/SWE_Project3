export default async (app, connection) => {
  app.use("/getQnAbyPostnum", async (req, res, next) => {
    const { postnum } = req.query;
    await connection.query(
      "SELECT * FROM QnA WHERE postnum = ?;",
      [postnum],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
