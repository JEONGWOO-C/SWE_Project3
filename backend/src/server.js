import express from "express";
import cors from "cors";
import { init } from "./config/db.js";
import login from "./api/User/login.js";
import register, { id_check } from "./api/User/register.js";
//import {kakao_register, naver_register, google_register} from './api/User/register.js';
import popularPost from "./api/Post/popularPosts.js";
import recentPosts from "./api/Post/recentPosts.js";
import userRecentPosts from "./api/Post/userRecentPosts.js";
import myShopInfo from "./api/User/myShopInfo.js";
import userProducts from "./api/User/userProducts.js";
import uploadPost from "./api/Post/uploadPost.js";
import wishlist from "./api/User/wishlist.js";
import categoryPosts from "./api/Post/categoryPosts.js";
import getPostData from "./api/Post/getPostData.js";

const connection = init();
const app = express();

let corsOption = {
  origin: "http://localhost:3000", // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption)); // CORS 미들웨어 추가
app.use(
  express.json({
    limit: "1000mb",
  })
);

app.use(express.static("public"));

const router = express.Router();

app.set("port", process.env.PORT || 4000);

login(app, connection);
register(app, connection);
popularPost(app, connection);
recentPosts(app, connection);
id_check(app, connection);
myShopInfo(app, connection);
userProducts(app, connection);
uploadPost(app, connection);
wishlist(app, connection);
categoryPosts(app, connection);
userRecentPosts(app, connection);
getPostData(app, connection);

app.listen(app.get("port"), () => {
  console.log("Port : " + app.get("port"));
});
