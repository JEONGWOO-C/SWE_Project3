export default (app, connection) => {
  app.get("/categoryPosts", (req, res, next) => {
    const { category } = req.query;
    connection.query(
      "SELECT PO.postnum, PO.postDate, PO.title, PR.price, PR.isSelling, PO.views, PO.fav, PH.photo, PR.category FROM posts PO, product PR, photos PH, users US WHERE category = ? AND PO.postnum = PR.postnum AND PO.postnum = PH.postnum  AND US.id = PR.seller_id AND US.ban = false ORDER BY PO.postDate desc;",
      [category],
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
