import { OverlayContext } from '@component/overlay';
import { useContext } from 'react';

const useOverlay = () => {
	const context = useContext(OverlayContext);

	return context;
};

export { useOverlay };
