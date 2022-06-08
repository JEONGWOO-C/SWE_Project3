import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/myShopInfo", auth);
  app.use("/myShopInfo", async (req, res, next) => {
    console.log(req.query);
    const { id } = req.query;
    await connection.query(
      "SELECT info, score FROM users WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      }
    );
  });
};
