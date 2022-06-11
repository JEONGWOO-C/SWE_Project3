export default async (app, connection) => {
  app.get("/searchPost", async (req, res, next) => {
    const { searchWord } = req.query;

    await connection.query(
      "SELECT * FROM posts PO, product PR, photos PH, users U WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PR.seller_id = U.id AND (PO.title LIKE " +
        connection.escape("%" + searchWord + "%") +
        " OR PR.descript LIKE " +
        connection.escape("%" + searchWord + "%") +
        ");",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
