import { OverlayContext } from '@provider/overlay-provider';
import { useContext } from 'react';

const useOverlay = () => {
	const context = useContext(OverlayContext);

	return context;
};

export { useOverlay };
