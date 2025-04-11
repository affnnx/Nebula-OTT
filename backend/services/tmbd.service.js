import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
    }
  };

export const fetchFromTMBD =async (url)=>{

    const response = await axios.get(url, options);       //remember to await for API calls, DB queries, file ops, auths stuffs

    if (response.status!==200) {
        throw new Error("Failed to fetch data" + response.statusText)
    }

    return response.data
}

export const fetchTrailersById = async (url) => {
    const response = await axios.get(url, options);

    if (response.status!==200) {
        throw new Error("Failed to fetch data" + response.statusText)
    }

    return response.data
}

export const fetchDetailsById = async (url) => {
    const response = await axios.get(url, options);

    if (response.status!==200) {
        throw new Error("Failed to fetch data" + response.statusText)
    }

    return response.data
}

export const fetchSimilarContentById = async (url) => {
    const response = await axios.get(url, options);

    if (response.status!==200) {
        throw new Error("Failed to fetch data" + response.statusText)
    }

    return response.data
}

export const fetchContentByCategory = async (url) => {
    const response = await axios.get(url, options);

    if (response.status!==200) {
        throw new Error("Failed to fetch data" + response.statusText)
    }

    return response.data
}