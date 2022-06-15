export default async (app, connection) => {
  app.post("/writeReview", async (req, res, next) => {
    const { postnum, score, seller_id, review } = req.body;

    if (review === "")
      return res.send({ result: false, msg: "후기를 작성해 주세요." });

    connection.query(
      "UPDATE users SET score = (score + ?)/2 WHERE id = ?",
      [score, seller_id],
      (error, data) => {
        if (error) res.send({ result: false, msg: "QUERY ERROR" });
        else {
          connection.query(
            "UPDATE product SET review = ?, score = ? WHERE postnum = ?;",
            [review, score, postnum],
            (error) => {
              if (error) res.send({ result: false, msg: "QUERY ERROR" });
            }
          );
          res.send({
            result: true,
            msg: "후기 작성 및 판매자 평점 업데이트가 완료되었습니다.",
          });
        }
      }
    );
  });
};
