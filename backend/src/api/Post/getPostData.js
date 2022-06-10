export default async (app, connection) => {
  app.get("/getPostData", async (req, res, next) => {
    const { postnum } = req.query;
    await connection.query(
      "SELECT * FROM posts PO, product PR, photos PH WHERE PO.postnum = ? AND PO.postnum = PR.postnum AND PO.postnum = PH.postnum",
      [postnum],
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
