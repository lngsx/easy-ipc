import { ipcRenderer } from 'electron';

export const sendActions = (actionTypes = []) => () => next => action => {
	const result = next(action);

	if (actionTypes.indexOf(action.type) !== -1) {
		ipcRenderer.send('xproc-redux', action);
	}

	return result;
};

export const receiveActions = dispatch => {
	ipcRenderer.on('xproc-redux', (event, arg) => {
		dispatch(arg);
	});
};
