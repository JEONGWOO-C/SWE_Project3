export default async (app, connection) => {
  app.post("/updateView", async (req, res, next) => {
    const { views } = req.body;
    const { postnum } = req.body;
    connection.query(
      "UPDATE posts SET views = ? WHERE postnum = ?;",
      [views + 1, postnum],
      (error, data) => {
        if (error) console.log(error);
        else return res.send({ result: true });
      }
    );
  });
};
