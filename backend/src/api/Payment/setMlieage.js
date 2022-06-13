import auth from "../modules/auth.js";

export default async (app, connection) => {
  app.post("/setMileage", auth, async (req, res, next) => {
    const { id } = req.query;
    const { value } = req.body;
    await connection.query(
      "UPDATE users SET mileage = ? WHERE id = ?",
      [value, id],
      (error, data) => {
        if (error) console.log(error);
        return res.send({ result: true });
      }
    );
  });
};
