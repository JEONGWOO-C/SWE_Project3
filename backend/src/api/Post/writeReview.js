export default async (app, connection) => {
  app.post("/writeReview", async (req, res, next) => {
    const { postnum, score, buyer_id, review } = req.body;

    if (review === "")
      return res.send({ result: false, msg: "후기를 작성해 주세요." });

    connection.query(
      "UPDATE users AS U, product AS P SET U.score = (score + ?)/2 AND P.review = ? WHERE U.id = ? AND P.postnum = ?",
      [score, review, buyer_id, postnum],
      (error, data) => {
        if (error) {
          console.log(error);
          res.send({ result: false, msg: "QUERY ERROR" });
        } else {
          connection.query(
            "UPDATE product SET review = ? WHERE postnum = ?;",
            [review, postnum],
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
