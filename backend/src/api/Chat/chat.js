import auth, { chatInfo } from "../modules/auth.js";
import { id_protect } from "../modules/jwt.js";
import {toSqlDatetime} from "../modules/util.js";

export const showChat = async (app, connection) => {
  app.post("/showChat", auth, async (req, res, next) => {
    const {id} = req.query;
    const {postnum} = req.body;
    connection.query(
      "SELECT * FROM chatRoom CR, chats CH WHERE CR.roomNumber = CH.roomNumber AND CR.postnum = ? AND (CR.seller_id = ? OR CR.buyer_id = ?)",
      [postnum,id,id],
      (error, data) => {
        if (error) console.log(error);
        var result = [];
        for(var i=0; i<data.length; i++){
          result.push({
            position : data[i].writer===id? 'right':'left',
            msg : data[i].msg,
            dates : data[i].chatDate,
            oppenent : id_protect(data[i].seller_id)
          });
        }
        console.log("OK");
        return res.send(result);
      }
    );
  });
};

export const addChat = (app, connection) => {
  app.post("/addChat", auth, chatInfo, async (req, res, next) => {
    const { id } = req.query;
    const {seller_id, buyer_id, postnum, msg} = req.body;
    var chatDate = toSqlDatetime(new Date());
    var roomNumber;

    console.log(id, seller_id, buyer_id, postnum, msg);
    connection.query(
      "SELECT roomNumber FROM chatRoom WHERE seller_id = ? AND buyer_id = ? AND postnum = ?",
      [seller_id, buyer_id,postnum],
      (error, data) => {
        if (error) throw error;
        if (data.length == 0){
          console.log('New Chat');
          connection.query(
            "INSERT chatRoom(seller_id, buyer_id, postnum) value(?,?,?)",
            [seller_id, buyer_id, postnum],
            (error, data2) => {
              if (error) throw error;
              connection.query(
                "SELECT roomNumber FROM chatRoom WHERE seller_id = ?, buyer_id = ?, postnum = ?",
                [seller_id, buyer_id, postnum],
                (error, data3) => {
                  if (error) throw error;
                  console.log(data3)
                  roomNumber = data3[0].roomNumber
                });
            });
        }else{
          console.log(data)
          roomNumber = data[0].roomNumber;
        }
        console.log('Add Start');
        connection.query(
          "INSERT chats(writer, msg, chatDate, roomNumber) value(?,?,?,?)",
          [id, msg, chatDate, roomNumber],
          (error, data) => {
            if (error) throw error;
            console.log('Chat add success');
            res.send({result:true});
          }
        );
      }
    );
          
  });
};

export const getSeller = (app, connection) => {
  app.post("/getSeller", async (req, res, next) => {
    const {postnum} = req.body;
    connection.query(
      "SELECT seller_id FROM product WHERE postnum = ?",
      [postnum],
      (error, data) => {
        if (error) console.log(error);
        res.send(id_protect(data[0].seller_id));
      }
    );
  });
};

export const getBuyer = (app, connection) => {
  app.post("/getBuyer", async (req, res, next) => {
    const {roomNumber} = req.body;
    if(roomNumber){
      res.send({result:false});
    }else{
      connection.query(
        "SELECT buyer_id FROM chatRoom WHERE roomNumber = ?",
        [roomNumber],
        (error, data) => {
          if(error) throw error;
          else if(data.length == 0 ) res.send({result:false})
          else{
            res.send({result:true,token:id_protect(data[0])});
          }
        }
      );
    }
  });
};