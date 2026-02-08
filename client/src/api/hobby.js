import axios from "./axios";

export const getHobbies = () => {
  return axios.get("/hobbies");
};

export const createHobby = (data) => {
  return axios.post("/hobbies", data);
};
