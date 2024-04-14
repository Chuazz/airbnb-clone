import AuthImage from '@asset/images/img-auth.jpg';
import { Flex } from '@chakra-ui/react';
import { PageType } from '@type/page';

const AuthLayout = async ({ params: { lng }, children }: PageType) => {
	return (
		<Flex
			minHeight='100vh'
			p={6}
			alignItems='center'
			background={`url('${AuthImage.src}')`}
		>
			{children}
		</Flex>
	);
};

export default AuthLayout;
