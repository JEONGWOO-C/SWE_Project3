import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/userProducts", auth);
  app.use("/userProducts", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT PO.postnum, PO.title, PR.isSelling, PO.views, PO.fav, PO.postDate, PR.price, PH.photo FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.seller_id = ? AND PR.isSelling = true;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        for (var i = 0; i < result.length; i++) {
          result[i].photo =
            req.protocol + "://" + req.get("host") + result[i].photo;
        }
        return res.send(result);
      }
    );
  });
};
