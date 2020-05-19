import axios from "axios";

export const evaluate = async (file, setEvaluation) => {

  const data = new FormData();
  data.append("photo-upload", file);
  
  const result = await axios.post("/evaluate", data, {
    headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}`},
  });
  const { classification, score } = result.data.data;

  setEvaluation({ classification, score });

};
