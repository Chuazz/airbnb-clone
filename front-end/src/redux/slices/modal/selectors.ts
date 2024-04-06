import { ReduxState } from '@redux/store';

const selectMenu = (state: ReduxState) => state.menu;

export { selectMenu };
