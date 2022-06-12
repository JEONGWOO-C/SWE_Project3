import auth from "../modules/auth.js";

export default (app, connection) => {
    app.post("/getChatList", auth, async (req, res, next) => {
        var result = [], line = {};
        const { id } = req.query;
        connection.query(
        "SELECT roomNumber seller_id, buyer_id FROM chatRoom WHERE seller_id = ? OR buyer_id = ?",
        [id,id],
        (error,data)=>{
            if(error) throw error;
            console.log(data)
            if(data.length == 0)
                res.send({result:false});
            else{
                var oppenent_id;
                for(var i = 0; i < data.length; i++){

                    oppenent_id = data[i].seller_id === id ? data[i].buyer_id:data[i].seller_id;
                    connection.query(
                    "SELECT username FROM users WHERE id = ?",
                    [oppenent_id],
                    (error,data2)=>{
                        if(error) throw error;
                        if(data2.length != 0 && data[i].roomNumber !== undefined){
                            connection.query(
                            "SELECT chatDate, msg FROM chats WHERE roomNumber = ? ORDER BY chatDate DESC limit 1",
                            [data[i].roomNumber],
                            (error,data3)=>{
                                if(error) throw error;
                                line = {
                                    roomNumber: data[i].roomNumber,
                                    username: data2[0].username,
                                    chatDate: data3[0].chatDate,
                                    msg:data3[0].msg
                                };
                                result.push(line); 
                            });
                        }
                    });
                }
            }
            res.send({result:true,list:result});
        });
    });
};
