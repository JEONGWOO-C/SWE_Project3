import auth, { chatInfo } from "../modules/auth.js";
import { id_protect } from "../modules/jwt.js";
import {toSqlDatetime} from "../modules/util.js";

export const showChat = async (app, connection) => {
  app.get("/showChat", auth, async (req, res, next) => {
    const {id , postnum} = req.query;
    connection.query(
      "SELECT * FROM chats WHERE postnum = ? AND (seller_id = ? OR buyer_id = ?)",
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
  app.post("/addChat", chatInfo, async (req, res, next) => {
    const {seller_id, buyer_id, writer, postnum, msg} = req.body;
    var chatDate = toSqlDatetime(new Date());
    connection.query(
      "INSERT chats(seller_id, buyer_id, writer, postnum, msg, chatDate) value(?,?,?,?,?,?)",
      [seller_id, buyer_id, writer, postnum, msg, chatDate],
      (error, data) => {
        if (error) console.log(error);
        res.send({result:true});
      }
    );
  });
};

export const getSeller = (app, connection) => {
  app.get("/getSeller", async (req, res, next) => {
    const {postnum} = req.query;
    connection.query(
      "SELECT seller_id FROM product WHERE postnum = ?",
      [postnum],
      (error, data) => {
        if (error) console.log(error);
        res.send(id_protect(data[0]));
      }
    );
  });
};