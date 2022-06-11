export default async (app, connection) => {
  app.use("/getFAQbyPostnum", async (req, res, next) => {
    const { postnum } = req.query;
    console.log("postnum : " + postnum);
    await connection.query(
      "SELECT * FROM FAQ WHERE postnum = ?;",
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
