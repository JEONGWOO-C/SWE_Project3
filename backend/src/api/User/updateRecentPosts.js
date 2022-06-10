import auth from "../modules/auth.js";
import userRecentViewedPosts from "../Post/userRecentViewedPosts.js";
export default async (app, connection) => {
  app.get("/updateRecentPosts", auth);
  app.use("/updateRecentPosts", async (req, res, next) => {
    const { id } = req.query;
    const { postnum } = req.query;

    const dateWithOffest = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    );
    const viewDate = dateWithOffest
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(viewDate);

    connection.query(
      "SELECT * FROM recentPosts WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        else {
          for (var i = 0; i < data.length; i++) {
            if (data[i].postnum == postnum) {
              connection.query(
                "DELETE FROM recentPosts WHERE id = ? AND postnum = ?;",
                [id, postnum]
              );
            }
          }
          connection.query(
            "INSERT into recentposts(id, postnum, viewDate) VALUES(?,?,?);",
            [id, postnum, viewDate],
            (error, data) => {
              if (error) console.log(error);
            }
          );
          res.send({ result: true });
        }
      }
    );
  });
};
