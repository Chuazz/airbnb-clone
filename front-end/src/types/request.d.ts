type MetaType = {};

type ResponseWithArray<T = any> = {
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
