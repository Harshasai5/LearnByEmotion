import axios from "axios";

const API = "http://127.0.0.1:8000/games";

export const getMatchFlow = () => axios.get(`${API}/match-flow`);
export const getSelectSet = () => axios.get(`${API}/select-set`);
export const getFillBlanks = () => axios.get(`${API}/fill-blanks`);