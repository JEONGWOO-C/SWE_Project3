export default async (app, connection) => {
  app.get("/recentUploadedPosts", async (req, res, next) => {
    await connection.query(
      "SELECT PO.postnum, PO.postDate, PO.title, PR.price, PR.isSelling, PO.views, PO.fav, PH.photo FROM posts PO, product PR, photos PH, users US WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.seller_id = US.id AND US.ban = false AND PR.isSelling = true ORDER BY PO.postDate desc LIMIT 5",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          result[i].photo =
            req.protocol + "://" + req.get("host") + result[i].photo;
        }
        return res.send(result);
      }
    );
  });
};
