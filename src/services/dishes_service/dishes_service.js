import { instance } from "..";

export const getDishes = async () => {
  const response = await instance.get("/dishes");
  return response.data;
};
