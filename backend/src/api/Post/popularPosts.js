export default async (app, connection) => {
  app.get("/popularPosts", async (req, res, next) => {
    await connection.query(
      "SELECT PO.postnum, PO.postDate, PO.title, PR.price, PR.isSelling, PO.views, PH.photo FROM posts PO, product PR, photos PH WHERE PO.postnum = PR.postnum AND PO.postnum = PH.postnum ORDER BY PO.views desc",
      [],
      (error, data) => {
        var result = [];
        if (error) console.log(error);
        else {
          const now = new Date();
          const nowYear = now.getFullYear();
          const nowMonth = now.getMonth() + 1;
          const nowDate = now.getDate();
          for (var i = 0; i < data.length; i++) {
            var itemYear = data[i].postDate.getFullYear();
            var itemMonth = data[i].postDate.getMonth() + 1;
            var itemDate = data[i].postDate.getDate();
            if (
              nowYear === itemYear &&
              nowMonth === itemMonth &&
              nowDate === itemDate
            )
              result.push(data[i]);
            if (result.length == 5) break;
          }
        }
        console.log(result);
        return res.send(result);
      }
    );
  });
};
