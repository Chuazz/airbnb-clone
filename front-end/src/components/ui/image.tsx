import { apiConfig } from '@config/api-config';
import { imageConfig } from '@config/image-config';
import { baseURL } from '@config/routes';
import { Image as PrimeImage, ImageProps as PrimeImageProps } from 'primereact/image';
import { classNames } from 'primereact/utils';

type ImageProps = PrimeImageProps & {
	src: keyof typeof imageConfig;
	placeholder?: string;
};

const Image = ({ src, ...props }: ImageProps) => {
	const placeholder = props.placeholder || 'https://placehold.co/500';
	const source = (() => {
		let result = '';

		if (src === 'server') {
			return process.env.NEXT_PUBLIC_DIRECTUS_PROJECT_URL + apiConfig.files + '/' + props.id;
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
		<PrimeImage
			{...props}
			alt={props.alt}
			src={source || placeholder}
			className='flex align-items-end justify-content-center'
			imageClassName={classNames(props.imageClassName)}
		/>
	);
};

export { Image };
export type { ImageProps };
