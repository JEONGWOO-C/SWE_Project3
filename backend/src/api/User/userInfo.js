import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/userInfo", auth);
  app.use("/userInfo", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT * FROM users WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
