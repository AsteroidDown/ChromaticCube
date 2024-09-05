import axios, { AxiosResponse } from "axios";
import { ScryfallURL } from "../constants/urls";

function getHeaders() {
  return {
    // "User-Agent": "ChromaticCube/1.0",
    Accept: "*/*",
  };
}

async function handleResponse(response: AxiosResponse<any, any>) {
  try {
    return response.data;
  } catch (e) {
    console.error("Error retrieving data:", e);
  }
}

async function Get(url: string, query?: Record<string, any>) {
  const headers = getHeaders();

  return handleResponse(
    await axios.get(`${ScryfallURL}/${url}`, {
      headers,
      params: query,
    })
  );
}

const Api = {
  get: Get,
};

export default Api;
