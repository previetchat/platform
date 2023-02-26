import axios from 'axios';

const url = process.env.AGENT_URL || 'http://localhost:4000'


export const getPublicKey = async () => {
  const response = await axios.get(`${url}/n`);
  console.log(response.data);
  return response.data;
};

export const encrypt = async (m: string, p: string, q: string) => {
  const response = await axios
    .post(`${url}/encrypt`, {
      m,
      n: "",
      p,
      q,
    })
    .catch((e) => {
      console.log(e);
      return { data: "XXX" };
    });
  return response.data.toString();
};

export const decrypt = async (c: string, p: string, q: string) => {
  const response = await axios
    .post(`${url}/decrypt`, {
      c,
      p,
      q,
    })
    .catch((e) => {
      console.log(e);
      return { data: c };
    });
  return response.data;
};