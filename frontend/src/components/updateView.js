import axios from "axios";

export const updateView = async (views, postnum) => {
  const res = await axios.post("http://localhost:4000/updateView", {
    views: views,
    postnum: postnum,
  });
  const { result } = res.data;
  return result;
};
