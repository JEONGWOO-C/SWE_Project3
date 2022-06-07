export default async (app, connection) => {
  app.get("/popularPosts", async (req, res, next) => {
    await connection.query(
      "SELECT PO.postnum, PO.title, PR.price, PR.isSelling, PO.views FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum ORDER BY PO.views desc LIMIT 5",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
