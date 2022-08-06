import axios from "axios";
export function getNews(category = 'General'){
    const API_KEY = `b7a916ac030441cd9055f4a6ac156c6f`;
    const API_END = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
    return axios.get (`${API_END}&apiKey=${API_KEY}`)
    }