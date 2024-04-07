import { LoginType, RegisterType, ResetPasswordType } from '@type/auth';
import { TFunction } from 'i18next';
import { z } from 'zod';

const defaultLoginValues: LoginType = {
	email: '',
	password: '',
};

const defaultRegisterValues: RegisterType = {
	email: '',
	firstName: '',
	lastName: '',
	confirmPassword: '',
	password: '',
};

const defaultResetPasswordValues: ResetPasswordType = {
	token: '',
	password: '',
	confirmPassword: '',
};

const getLoginSchema = (t: TFunction) =>
	z.object({
		email: z.string().email({
			message: t('validation:required', { attribute: t('common:email') }),
		}),
		password: z.string().min(1, {
			message: t('validation:required', { attribute: t('auth:password') }),
		}),
	});

const getRegisterSchema = (t: TFunction) =>
	z
		.object({
			email: z
				.string()
				.min(1, {
					message: t('validation:required', { attribute: t('common:email') }),
				})
				.email({
					message: t('validation:invalid_format', { attribute: t('common:email') }),
				}),
			firstName: z.string().min(1, {
				message: t('validation:required', { attribute: t('common:first_name') }),
			}),
			lastName: z.string().min(1, {
				message: t('validation:required', { attribute: t('common:last_name') }),
			}),
			password: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
			confirmPassword: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('validation:password_not_match'),
			path: ['confirmPassword'],
		});

const getResetPasswordSchema = (t: TFunction) =>
	z.object({
		email: z
			.string()
			.min(1, {
				message: t('validation:required', { attribute: t('common:email') }),
			})
			.email({
				message: t('validation:invalid_format', { attribute: t('common:email') }),
			}),
	});

const getNewPasswordSchema = (t: TFunction) =>
	z
		.object({
			password: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
			confirmPassword: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('validation:password_not_match'),
			path: ['confirmPassword'],
		});

export {
	defaultLoginValues,
	defaultRegisterValues,
	defaultResetPasswordValues,
	getLoginSchema,
	getNewPasswordSchema,
	getRegisterSchema,
	getResetPasswordSchema,
};
