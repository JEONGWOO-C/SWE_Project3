import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getPurchasedProducts", auth);
  app.use("/getPurchasedProducts", async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await connection.query(
      "SELECT PR.buyer_id, PO.postnum, PO.title, PR.isSelling, PO.views, PO.fav, PO.postDate, PR.price, PH.photo, PR.review FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.buyer_id = ? AND PR.isSelling = false;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
