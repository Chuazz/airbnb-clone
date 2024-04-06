import AuthImage from '@asset/images/im_auth.jpg';
import { PageType } from '@type/page-type';

const AuthLayout = async ({ params: { lng }, children }: PageType) => {
	return (
		<div
			className='min-h-screen sm:p-4 md:p-6 flex align-items-center justify-content-center'
			style={{ background: `url('${AuthImage.src}')` }}
		>
			{children}
		</div>
	);
};

export default AuthLayout;
