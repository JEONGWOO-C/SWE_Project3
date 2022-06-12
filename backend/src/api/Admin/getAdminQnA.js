import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.use("/getAdminQnA", async (req, res, next) => {
    await connection.query(
      "SELECT * FROM QnA ORDER BY postnum;",
      [],
      (error, data) => {
        if (error) res.send(false);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
