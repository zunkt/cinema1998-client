import { v4 as uuidv4 } from 'uuid';
export default ({ app }) => {
	const anonymousId = app.$cookiz.get('anonymous-id');
	if (!anonymousId) {
		app.$cookiz.set('anonymous-id', uuidv4(), {
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
	}
};
