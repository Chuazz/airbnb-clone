interface LoginType {
	email: string;
	password: string;
}

interface RegisterType {
	firstName?: string;
	lastName?: string;
	email?: string;
	password: string;
	confirmPassword: string;
}

interface ResetPasswordType {
	token: string;
	password: string;
	confirmPassword: string;
}

export type { LoginType, RegisterType, ResetPasswordType };
