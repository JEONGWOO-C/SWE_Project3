export default async (app, connection) => {
  app.use("/getFAQ", async (req, res, next) => {
    await connection.query("SELECT * FROM FAQ;", [], (error, data) => {
      if (error) console.log(error);
      const result = data;
      console.log(result);
      return res.send(result);
    });
  });
};
