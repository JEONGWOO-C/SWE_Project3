export default async (app, connection) => {
  app.use("/getNotice", async (req, res, next) => {
    await connection.query(
      "SELECT postnum, title, postDate FROM NOTICE;",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
