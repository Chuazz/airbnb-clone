import { imageConfig } from '@config/image-config';
import { Image as PrimeImage, ImageProps as PrimeImageProps } from 'primereact/image';
import { classNames } from 'primereact/utils';

type ImageProps = PrimeImageProps & {
	src: keyof typeof imageConfig;
};

const Image = ({ src, ...props }: ImageProps) => {
	return (
		<PrimeImage
			{...props}
			alt={props.alt}
			src={imageConfig[src] ? imageConfig[src].src : 'https://placehold.co/500'}
			className='flex align-items-end justify-content-center'
			imageClassName={classNames(props.imageClassName)}
		/>
	);
};

export { Image };
export type { ImageProps };
