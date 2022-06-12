export default async (app, connection) => {
    app.post("/getPrice", async (req, res, next) => {
      const {postnum} = req.body;
      await connection.query(
        "SELECT price FROM product WHERE postnum = ?",
        [postnum],
        (error, data) => {
          if (error) console.log(error);
          return res.send(data[0].price);
        }
      );
    });
  };