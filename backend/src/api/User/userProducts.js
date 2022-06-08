import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/userProducts", auth);
  app.use("/userProducts", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT PO.postnum, PO.title, PR.isSelling, PO.postDate, PR.price FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.seller_id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
