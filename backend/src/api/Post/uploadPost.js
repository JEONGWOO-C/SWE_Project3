import fs from "fs";
import multer from "multer";
import auth from "../modules/auth.js";

function toSqlDatetime(date){
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest.toISOString().slice(0, 19).replace("T", " ");
};

function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var up_path = "public/imgs/" + Date.now() + "/";
    mkdir(up_path);
    cb(null, up_path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.jpg');
  },
});
var upload = multer({ storage: storage });

function FileUpload(req, res, next) {
  if (req.file === undefined) {
    upload.array("img_file")(req, res, next);
  } else {
    next();
  }
}

export default async (app, connection) => {
  app.post("/sell_write", auth);
  app.use("/sell_write", FileUpload, function (req, res, next) {
    var postDate_obj = new Date();
    const postDate = toSqlDatetime(postDate_obj);
    const { id } = req.query;
    const { title, price, category, description } = req.body;
    var img_file = "";

    console.log("file : ", req.file);
    console.log("body : ", req.body);
    if (req.file !== undefined)
      img_file = req.file.destination.replace("public", "") + req.file.filename;

    var postDatas = [title, postDate];
    console.log("post datas : ", postDatas);

    var sqlForPostList = "INSERT INTO posts(title, postDate) value(?,?);";
    connection.query(sqlForPostList, postDatas, async (err, rows) => {
      if (err) console.error("err: " + err);
      else {
        var sqlForSelectList =
          "SELECT postnum FROM posts ORDER BY postnum DESC LIMIT 1;";
        connection.query(sqlForSelectList, async (err, data) => {
          if (err) console.error("err: " + err);
          else {
            var postnum = data[0].postnum;
            console.log("postnum : ", postnum);
            var productDatas = [
              postnum,
              price,
              category,
              description,
              id,
            ];
            console.log("product datas : ", productDatas);

            var sqlForProductList =
              "INSERT INTO product(postnum, price, category, descript, seller_id) value(?,?,?,?,?)";
            connection.query(
              sqlForProductList,
              productDatas,
              async (err, rows) => {
                if (err) console.error("err: " + err);
                else {
                  var photoDatas = [postnum, 1, img_file];
                  console.log("product datas : ", photoDatas);

                  var sqlForImageList =
                    "INSERT INTO photos(postnum, imgnum, photo) value(?,?,?)";
                  connection.query(
                    sqlForImageList,
                    photoDatas,
                    async (err, rows) => {
                      if (err) console.error("err: " + err);
                    }
                  );
                  res.send(true);
                }
              }
            );
          }
        });
      }
    });
  });
};
