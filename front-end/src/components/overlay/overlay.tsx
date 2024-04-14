import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { OverlayType } from '@type/overlay/overlay';

const Overlay = ({ children, content, ...props }: OverlayType) => {
	return (
		<Popover {...props}>
			<PopoverTrigger>
				<button>{children}</button>
			</PopoverTrigger>

			<PopoverContent
				width='fit-content'
				overflow='hidden'
			>
				{content}
			</PopoverContent>
		</Popover>
	);
};
export { Overlay };
