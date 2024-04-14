import { Image as ChakraImage, ImageProps as ChakraImageProps } from '@chakra-ui/react';
import { customApi } from '@config/api/custom-api';
import { imageConfig } from '@config/image-config';

type ImageProps = ChakraImageProps & {
	src: keyof typeof imageConfig;
	placeholder?: string;
};

const Image = ({ src, ...props }: ImageProps) => {
	const placeholder = props.placeholder || 'https://placehold.co/500';

	const source = (() => {
		let result = '';

		if (src === 'server') {
			return process.env.NEXT_PUBLIC_DIRECTUS_PROJECT_URL + customApi.files + '/' + props.id;
		}

		if (imageConfig[src]) {
			return imageConfig[src].src;
		}

		if (src) {
			return src;
		}

		return result;
	})();

	return (
		<ChakraImage
			{...props}
			src={source}
			fallbackSrc={placeholder}
		/>
	);
};

export { Image };
export type { ImageProps };
