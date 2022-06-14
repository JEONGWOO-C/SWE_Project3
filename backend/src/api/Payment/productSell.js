export default async (app, connection) => {
  app.post("/productSell", async (req, res, next) => {
    const { postnum, buyer_id, seller_id, price } = req.body;
    console.log(price);
    await connection.query(
      "UPDATE product SET isSelling = false, buyer_id = ? WHERE postnum = ?",
      [buyer_id, postnum],
      (error, data) => {
        console.log(data)
        if (error) {
          console.log(error);
          return res.send({ result: false });
        }
        connection.query(
          "UPDATE users SET mileage = mileage + ? WHERE id = ?",
          [price,seller_id],
          (error, data2) => {
            console.log(data2)
            if (error) {
              console.log(error);
              return res.send({ result: false });
            }
            return res.send({ result: true });
        })
      }
    );
  });
};
