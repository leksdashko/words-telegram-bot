import axios from "axios";

export function useAxios() {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL
	});

	return instance;
}