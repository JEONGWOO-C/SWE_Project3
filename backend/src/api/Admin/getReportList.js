export default async (app, connection) => {
  app.use("/getReportList", async (req, res, next) => {
    await connection.query(
      "SELECT * FROM reports ORDER BY postnum;",
      [],
      (error, data) => {
        if (error) console.log(error);
        var result = {};
        for (var i = 0; i < data.length; i++) {
          if (result[data[i].postnum] === undefined)
            result[data[i].postnum] = [];
          result[data[i].postnum].push(data[0]);
        }
        return res.send(result);
      }
    );
  });
};
