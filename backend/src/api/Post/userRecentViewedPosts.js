import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/userRecentViewedPosts", auth);
  app.use("/userRecentViewedPosts", async (req, res, next) => {
    const { id } = req.query;
    connection.query(
      "SELECT PO.postnum, PO.title, PR.price, PR.isSelling, PO.views, PH.photo FROM posts PO, product PR, photos PH, recentPosts RC WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum AND PO.postnum = RC.postnum AND RC.id = ? ORDER BY RC.viewDate desc LIMIT 10",
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
