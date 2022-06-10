export default async (app, connection) => {
  app.get("/recentPosts", async (req, res, next) => {
    await connection.query(
      "SELECT PO.postnum, PO.title, PR.price, PR.isSelling, PO.views, PH.photo FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum ORDER BY PO.postDate desc LIMIT 5",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(process.env)
        for(var i=0;i<result.length;i++){
          result[i].photo = req.protocol + '://' +req.get('host') + result[i].photo;
        }
        console.log(result);
        return res.send(result);
      }
    );
  });
};
