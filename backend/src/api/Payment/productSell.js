export default async (app, connection) => {
    app.post("/productSell", async (req, res, next) => {
      const {postnum} = req.body;
      await connection.query(
        "UPDATE product SET isSell = false WHERE postnum = ?",
        [postnum],
        (error, data) => {
          if (error) {console.log(error);return res.send({result:false});}
          return res.send({result:true});
        }
      );
    });
  };