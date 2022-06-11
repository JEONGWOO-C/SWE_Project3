import axios from "axios";
import { getTokenFromCookie } from "../components/Auth";

export const updateView = async (views, postnum) => {
  const res = await axios.post("http://localhost:4000/updateView", {
    views: views,
    postnum: postnum,
  });
  const { result } = res.data;
  return result;
};

export const updateRecentPosts = async (postnum) => {
  const token = getTokenFromCookie();
  const res = await axios.get("http://localhost:4000/updateRecentPosts", {
    headers: { token: token },
    params: { postnum: postnum },
  });
  const { result } = res.data;
  return result;
};

export const updateAgeGroupOfPost = async (postnum) => {
  const token = getTokenFromCookie();
  const res = await axios.get("http://localhost:4000/updateAgeGroupOfPost", {
    headers: { token: token },
    params: { postnum: postnum },
  });
  const { result } = res.data;
  return result;
};
