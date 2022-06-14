export default async (app, connection) => {
  app.post("/getAdminList", async (req, res, next) => {
    await connection.query(
      "SELECT * FROM admins",
      [],
      (error, data) => {
        if (error) console.log(error);
        var result = []
        for(var i=0;i<data.length;i++){
           result.push({
             adminname : data[i].adminname,
             id : data[i].id,
             name : data[i].name,
             phone : data[i].phone,
             email : data[i].email,
             confirm : data[i].isApproved
           });
        }
        return res.send(result);
      }
    );
  });
};