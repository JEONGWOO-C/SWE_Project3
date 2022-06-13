export default async (app, connection) => {
  app.post("/productSell", async (req, res, next) => {
    const { postnum, buyer_id } = req.body;
    console.log(buyer_id);
    await connection.query(
      "UPDATE product SET isSelling = false, buyer_id = ? WHERE postnum = ?",
      [buyer_id, postnum],
      (error, data) => {
        if (error) {
          console.log(error);
          return res.send({ result: false });
        }
        return res.send({ result: true });
      }
    );
  });
};
