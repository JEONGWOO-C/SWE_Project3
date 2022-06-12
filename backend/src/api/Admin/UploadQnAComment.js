export default async (app, connection) => {
  app.use("/UploadQnAComment", async (req, res, next) => {
    const { postnum, postComment } = req.body;
    console.log("postnum : " + postnum + " postComment : " + postComment);
    if (postComment == "") return res.send(false);
    await connection.query(
      "UPDATE Qna SET postComment = ?, isAnswered = true WHERE postnum = ?;",
      [postComment, postnum],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
