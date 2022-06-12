export default async (app, connection) => {
  app.post("/getAdminList", async (req, res, next) => {
    await connection.query(
      "SELECT * FROM admins",
      [],
      (error, data) => {
        if (error) console.log(error);
        console.log(data);
        var result = []
        for(var i=0;i<data.length;i++){
           result.push({
             id : data[i].id,
             name : data[i].name,
             phoe : data[i].phone,
             email : data[i].email,
             confirm : data[i].isApproved
           });
        }
        return res.send(result);
      }
    );
  });
};