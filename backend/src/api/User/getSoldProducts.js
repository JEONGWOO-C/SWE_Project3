import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getSoldProducts", auth);
  app.use("/getSoldProducts", async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await connection.query(
      "SELECT * FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.seller_id = ? AND PR.isSelling = false ORDER BY PO.postDate;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
