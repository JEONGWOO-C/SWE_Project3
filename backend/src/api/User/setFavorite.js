export default async (app, connection) => {
  app.post("/setFavorite", async (req, res, next) => {
    const { id } = req.body;
    const { postnum } = req.body;
    const { isFavorite } = req.body;
    console.log(req.body);
    if (isFavorite) {
      connection.query(
        "DELETE FROM favorite WHERE id = ? AND postnum = ?;",
        [id, postnum],
        (error, data) => {
          if (error) console.log(error);
          else res.send({ result: true, msg: "찜 목록에서 해제되었습니다." });
        }
      );
    } else {
      connection.query(
        "INSERT into favorite(id, postnum) values(?,?);",
        [id, postnum],
        (error, data) => {
          if (error) console.log(error);
          else res.send({ result: true, msg: "찜 목록에 추가되었습니다." });
        }
      );
    }
  });
};
