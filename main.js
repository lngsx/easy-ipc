import { ipcMain } from 'electron';

export const sendActions = (actionTypes = [], wins = []) => () => next => action => {
	const result = next(action);

	if (actionTypes.indexOf(action.type) !== -1) {
		wins
			.map(w => w.webContents)
			.forEach(wc => wc.send('xproc-redux', action));
	}

	return result;
};

export const receiveActions = dispatch => {
	ipcMain.on('xproc-redux', (event, arg) => {
		dispatch(arg);
	});
};
