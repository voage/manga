import axios from "axios";
import { MANGADEX_API } from "../constants/api";

export async function getMangaCover(limit = 10) {
  try {
    const response = await axios.get(`${MANGADEX_API}/cover`, {
      params: {
        limit: limit,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching manga covers:", error);
    throw error;
  }
}