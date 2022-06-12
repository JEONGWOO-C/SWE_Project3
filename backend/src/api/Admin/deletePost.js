export default async (app, connection) => {
  app.post("/deletePost", async (req, res, next) => {
    const { postnum } = req.body;
    await connection.query(
      "DELETE FROM PO,PR,PH USING posts AS PO NATURAL JOIN product AS PR NATURAL JOIN photos AS PH WHERE A.postnum = ?;",
      [postnum],
      (error, data) => {
        if (error) console.log(error);
        console.log(data);
        return res.send(true);
      }
    );
  });
};
