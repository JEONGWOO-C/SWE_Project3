import auth from "../modules/auth.js";

export default async (app, connection) => {
  app.get("/getFavorite", auth);
  app.use("/getFavorite", async (req, res, next) => {
    const { postnum } = req.query;
    const { id } = req.query;
    console.log(req);
    console.log("postnum : " + postnum + " id : " + id);
    await connection.query(
      "SELECT postnum FROM favorite WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(data);
        for (var i = 0; i < data.length; i++)
          if (data[i].postnum == postnum) return res.send(true);
        return res.send(false);
      }
    );
  });
};
