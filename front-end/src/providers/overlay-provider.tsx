import { overlayConfig } from '@config/overlay-config';
import { overlaySlice } from '@redux/slices/overlay-slice';
import { useDispatch, useSelector } from '@redux/store';
import { OpenOverlayType, OverlayContextType } from '@type/context/overlay-context';
import { OverlayPanel } from 'primereact/overlaypanel';
import { createContext, PropsWithChildren, useRef, useState } from 'react';

const OverlayContext = createContext<OverlayContextType>({
	close() {},
	open() {},
});

const OverlayProvider = ({ children }: PropsWithChildren) => {
	const { active } = useSelector((state) => state.overlay);
	const ref = useRef<OverlayPanel>(null);
	const dispatch = useDispatch();
	const OverlayContent = active ? overlayConfig[active] : () => <></>;
	const [props, setProps] = useState<any>();

	const open = ({ name, overlayProps, target }: OpenOverlayType) => {
		dispatch(overlaySlice.actions.open(name));

		setProps(overlayProps);

		ref.current?.toggle(target);
	};

	const close = () => {
		dispatch(overlaySlice.actions.close());
	};

	const value: OverlayContextType = {
		open,
		close,
	};

	return (
		<OverlayContext.Provider value={value}>
			{children}

			<OverlayPanel ref={ref}>
				<OverlayContent {...props} />
			</OverlayPanel>
		</OverlayContext.Provider>
	);
};

export { OverlayContext, OverlayProvider };
