export default async (app, connection) => {
  app.post("/deleteReportbyPostnum", async (req, res, next) => {
    const { postnum } = req.body;
    await connection.query(
      "DELETE FROM reports WHERE postnum = ?;",
      [postnum],
      (error, data) => {
        if (error) console.log(error);
        console.log(data);
        return res.send(true);
      }
    );
  });
};
