export default async (app, connection) => {
  app.post("/writeReview", async (req, res, next) => {
    const { postnum, score, buyer_id, review } = req.body;

    connection.query(
      "UPDATE users SET score = (score + ?)/2 WHERE id = ?",
      [score, buyer_id],
      (error, data) => {
        if (error) {
          console.log(error);
          res.send({ result: false });
        } else {
          connection.query(
            "UPDATE product SET review = ? WHERE postnum = ?;",
            [review, postnum],
            (error) => {
              if (error) console.log(error);
            }
          );
          res.send({ result: true });
        }
      }
    );
  });
};
