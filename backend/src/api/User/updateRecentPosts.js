export default async (app, connection) => {
  app.post("/updateRecentPosts", async (req, res, next) => {
    const { id } = req.body;
    const { postnum } = req.body;

    connection.query(
      "DELETE FROM favorite WHERE id = ? AND postnum = ?;",
      [id, postnum],
      (error, data) => {
        console.log(data);
        if (error) console.log(error);
        else {
          connection.query(
            "UPDATE posts SET fav = ? WHERE postnum = ?;",
            [fav - 1, postnum],
            (error) => {
              if (error) console.log(error);
            }
          );
        }
        res.send({ result: true, msg: "찜 목록에서 해제되었습니다." });
      }
    );
  });
};
