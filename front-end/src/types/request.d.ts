import { AxiosResponse } from "axios";

type MetaType = {};

type ResponseWithArray<T = any> = AxiosResponse & {
	data: T[];
};

type DirectusErrorType = {
	errors: {
		extensions: {
			code: string;
		};
		message: string;
	}[];
};

export type { MetaType, ResponseWithArray, DirectusErrorType };
