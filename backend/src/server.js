import express, { application } from "express";
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
import { addChat, showChat, getSeller, getBuyer } from "./api/Chat/chat.js";
import getFAQ from "./api/CustomerCenter/getFAQ.js";
import getNotice from "./api/CustomerCenter/getNotice.js";
import getQnA from "./api/CustomerCenter/getQnA.js";
import adminRegister, { Adminid_check } from "./api/Admin/adminRegister.js";
import adminLogin from "./api/Admin/adminLogin.js";
import getFAQbyPostnum from "./api/CustomerCenter/getFAQbyPostnum.js";
import getNoticebyPostnum from "./api/CustomerCenter/getNoticebyPostnum.js";
import UploadQnA from "./api/CustomerCenter/UploadQnA.js";
import UploadFAQ from "./api/CustomerCenter/UploadFAQ.js";
import UploadNotice from "./api/CustomerCenter/UploadNotice.js";
import ModifyNotice from "./api/CustomerCenter/ModifyNotice.js";
import ModifyFAQ from "./api/CustomerCenter/ModifyFAQ.js";
import getQnAbyPostnum from "./api/CustomerCenter/getQnAbyPostnum.js";
import {
  passwordUpdate,
  privateUpdate,
  profileUpdate,
} from "./api/User/userUpdate.js";
import getMemberList from "./api/Admin/getMemberList.js";
import getAdminMemberList from "./api/Admin/getAdminMemberList.js";
import { releaseBan, setBan } from "./api/Admin/banControl.js";
import {
  delAdmin,
  releaseApproved,
  setApproved,
} from "./api/Admin/ApproveControl.js";
import getAdminQnA from "./api/Admin/getAdminQnA.js";

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
getBuyer(app, connection);
getFAQ(app, connection);
getNotice(app, connection);
getQnA(app, connection);
adminRegister(app, connection);
Adminid_check(app, connection);
adminLogin(app, connection);
getFAQbyPostnum(app, connection);
getNoticebyPostnum(app, connection);
UploadQnA(app, connection);
UploadFAQ(app, connection);
UploadNotice(app, connection);
ModifyNotice(app, connection);
ModifyFAQ(app, connection);
getQnAbyPostnum(app, connection);
profileUpdate(app, connection);
privateUpdate(app, connection);
passwordUpdate(app, connection);
getMemberList(app, connection);
getAdminMemberList(app, application);
setBan(app, connection);
releaseBan(app, connection);
setApproved(app, connection);
releaseApproved(app, connection);
delAdmin(app, connection);
getAdminQnA(app, connection);

app.listen(app.get("port"), () => {
  console.log("Port : " + app.get("port"));
});
