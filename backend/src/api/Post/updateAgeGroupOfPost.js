import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/updateAgeGroupOfPost", auth);
  app.use("/updateAgeGroupOfPost", async (req, res, next) => {
    const { id } = req.query;
    const { postnum } = req.query;

    connection.query(
      "SELECT age FROM users WHERE id = ?;",
      [id],
      (error, result) => {
        const age = result[0].age;
        if (error) console.log(error);
        else {
          connection.query(
            "SELECT * FROM posts WHERE postnum = ?;",
            [postnum],
            (error, data) => {
              if (error) console.log(error);
              else {
                console.log(age);
                var age10 = data[0].teens;
                var age20 = data[0].twenties;
                var age30 = data[0].thirties;
                var age40 = data[0].fourties;
                var age50 = data[0].fifties;
                var ageover60 = data[0].overSixties;
                if (age < 20) age10 += 1;
                else if (age < 30) age20 += 1;
                else if (age < 40) age30 += 1;
                else if (age < 50) age40 += 1;
                else if (age < 60) age50 += 1;
                else ageover60 += 1;
                connection.query(
                  "UPDATE posts SET teens=?, twenties=?, thirties=?, fourties=?, fifties=?, overSixties=? WHERE postnum = ?;",
                  [age10, age20, age30, age40, age50, ageover60, postnum],
                  (error) => console.log(error)
                );
              }
            }
          );
          return res.send({ result: true });
        }
      }
    );
  });
};
