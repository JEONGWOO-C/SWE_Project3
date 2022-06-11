import express from "express";
import cors from "cors";
import { init } from "./config/db.js";
import login from "./api/User/login.js";
import register, { id_check } from "./api/User/register.js";
//import {kakao_register, naver_register, google_register} from './api/User/register.js';
import todayPopularPosts from "./api/Post/todayPopularPosts.js";
import recentUploadedPosts from "./api/Post/recentUploadedPosts.js";
import userRecentViewedPosts from "./api/Post/userRecentViewedPosts.js";
import userInfo from "./api/User/userInfo.js";
import userProducts from "./api/User/userProducts.js";
import uploadPost from "./api/Post/uploadPost.js";
import wishlist from "./api/User/wishlist.js";
import categoryPosts from "./api/Post/categoryPosts.js";
import getPostData from "./api/Post/getPostData.js";
import getFavorite from "./api/User/getFavorite.js";
import setFavorite from "./api/User/setFavorite.js";
import updateView from "./api/Post/updateView.js";
import updateRecentPosts from "./api/User/updateRecentPosts.js";
import updateAgeGroupOfPost from "./api/Post/updateAgeGroupOfPost.js";
import searchPost from "./api/Post/searchPost.js";
import { addChat, showChat, getSeller } from "./api/Chat/chat.js";
import getFAQ from "./api/CustomerCenter/getFAQ.js";
import getNotice from "./api/CustomerCenter/getNotice.js";
import getQnA from "./api/CustomerCenter/getQnA.js";
import adminRegister, { Adminid_check } from "./api/Admin/adminRegister.js";
import adminLogin from "./api/Admin/adminLogin.js";

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
todayPopularPosts(app, connection);
recentUploadedPosts(app, connection);
id_check(app, connection);
userInfo(app, connection);
userProducts(app, connection);
uploadPost(app, connection);
wishlist(app, connection);
categoryPosts(app, connection);
userRecentViewedPosts(app, connection);
getPostData(app, connection);
getFavorite(app, connection);
setFavorite(app, connection);
updateView(app, connection);
updateRecentPosts(app, connection);
updateAgeGroupOfPost(app, connection);
searchPost(app, connection);
showChat(app, connection);
addChat(app, connection);
getSeller(app, connection);
getFAQ(app, connection);
getNotice(app, connection);
getQnA(app, connection);
adminRegister(app, connection);
Adminid_check(app, connection);
adminLogin(app, connection);

app.listen(app.get("port"), () => {
  console.log("Port : " + app.get("port"));
});
