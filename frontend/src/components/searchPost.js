import axios from "axios";

export const searchPost = async (searchWord) => {
  const res = await axios.get("http://localhost:4000/searchPost", {
    params: { searchWord: searchWord },
  });
  const result = res.data;
  console.log(result);
  return result;
};
