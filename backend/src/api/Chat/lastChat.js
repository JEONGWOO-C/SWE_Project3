import auth from "../modules/auth.js";

export default (app, connection) => {
    app.post("/lastChat", auth, async (req, res, next) => {
        const { id } = req.query;
        connection.query(
        "SELECT CH.roomNumber FROM chats CH, chatRoom CR WHERE CH.roomNumber = CR.roomNumber AND (seller_id = ? OR buyer_id = ?) ORDER BY CH.chatDate limit 1",
        [id,id],
        (error,data)=>{
            if(error) throw error;
            if(data.length == 0)
                res.send({result:false});
            else
                res.send({result:true,last:data[0].roomNumber});
        });
    });
  };