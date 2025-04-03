export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (!env.MINESKIN_API_HOST || env.MINESKIN_API_HOST === '') {
			return new Response('MINESKIN_API_HOST not set', { status: 500 });
		}
		if (!env.MINESKIN_API_KEY || env.MINESKIN_API_KEY === '' || env.MINESKIN_API_KEY === 'replace me') {
			return new Response('MINESKIN_API_KEY not set', { status: 500 });
		}

		const mineSkinBaseUrl = new URL(env.MINESKIN_API_HOST);

		// merge the request url with the base url
		const url = new URL(request.url);
		url.host = mineSkinBaseUrl.host;
		url.protocol = mineSkinBaseUrl.protocol;
		url.port = mineSkinBaseUrl.port;

		const headers = new Headers(request.headers);

		// apply generic headers
		headers.set('X-Forwarded-For', request.headers.get('CF-Connecting-IP') || request.headers.get('X-Real-IP') || request.headers.get('X-Forwarded-For') || '');
		headers.set('X-MineSkin-CF-Proxy', 'true');
		headers.set('User-Agent', request.headers.get('User-Agent') || 'MineSkin-CF-Proxy');
		headers.set('Content-Type', request.headers.get('Content-Type') || 'application/json');
		headers.set('Accept', request.headers.get('Accept') || 'application/json');

		// add api key
		headers.set('Authorization', `Bearer ${ env.MINESKIN_API_KEY }`);

		// clone request init
		const newRequestInit = {
			method: request.method,
			body: request.body,
			headers: headers,
			redirect: 'follow'
		};

		try {
			// run request
			return await fetch(url, newRequestInit);
		} catch (e) {
			return new Response(JSON.stringify({ error: (e as any).message || 'unknown error' }), {
				status: 500
			});
		}
	}
} satisfies ExportedHandler<Env>;
