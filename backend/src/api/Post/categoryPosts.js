export default (app, connection) => {
  app.get("/categoryPosts", (req, res, next) => {
    const { category } = req.query;
    console.log(req.query);
    console.log(category);
    connection.query(
      "SELECT PO.postnum, PO.title, PO.postDate, PR.price, PH.photo, PR.category FROM posts PO, product PR, photos PH WHERE category = ? AND PO.postnum = PR.postnum AND PO.postnum = PH.postnum ORDER BY PO.postDate desc;",
      [category],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
