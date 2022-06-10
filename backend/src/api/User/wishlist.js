import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/wishlist", auth);
  app.use("/wishlist", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT PO.postnum, PO.title, PR.isSelling, PO.views, PO.fav, PO.postDate, PR.price, PH.photo FROM favorite F, posts PO, product PR, photos PH WHERE id = 'test2' AND F.postnum = PO.postnum AND F.postnum = PR.postnum AND F.postnum = PH.postnum ORDER BY PO.postDate desc;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        for (var i = 0; i < result.length; i++) {
          result[i].photo =
            req.protocol + "://" + req.get("host") + result[i].photo;
        }
        console.log(result);
        return res.send(result);
      }
    );
  });
};
