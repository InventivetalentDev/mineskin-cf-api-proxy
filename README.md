# MineSkin Cloudflare Workers API Proxy

A simple proxy for the [MineSkin](https://mineskin.org) API on [Cloudflare Workers](https://workers.cloudflare.com/) to
proxy authorized requests without exposing your API key.

## Prerequisites
- get a [MineSkin API Key](https://account.mineskin.org/keys)
- get a [Cloudflare Workers](https://workers.cloudflare.com/) account

## Setup - via Cloudflare Dashboard
1. Go to the [Cloudflare Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages) and create a new Worker.
2. Under "Import a repository" click "Clone a repository via Git URL" and enter the URL of this repository.
3. TODO

## Setup - via Wrangler
1. Install [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/)
2. Clone this repository `git clone TODO`
3. Change directory to the cloned repository `cd TODO`
4. Install dependencies `yarn install`
5. For local testing:
  - Create a `.dev.vars` file in the root directory and add your API key:
	```env
	MINESKIN_API_KEY=your_api_key
	```
  - Run `npx wrangler dev` to start the local server. The proxy will be available at `http://localhost:8787`.
6. For deployment
  - Run `npx wrangler secret put MINESKIN_API_KEY` and enter your API key when prompted. This will store your API key as a secret in Cloudflare Workers.
  - Run `yarn deploy` to deploy the worker. The proxy will be available at `https://your-worker-name.your-subdomain.workers.dev/`.
