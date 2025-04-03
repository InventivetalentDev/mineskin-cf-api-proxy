# MineSkin Cloudflare Workers API Proxy

A simple proxy for the [MineSkin](https://mineskin.org) API on [Cloudflare Workers](https://workers.cloudflare.com/) to
proxy authorized requests without exposing your API key.

## Prerequisites
- Get a [MineSkin API Key](https://account.mineskin.org/keys)
- Create a [Cloudflare Workers](https://workers.cloudflare.com/) account

## Setup - via Wrangler (Recommended)
1. Install [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/)
2. Clone this repository `git clone https://github.com/InventivetalentDev/mineskin-cf-api-proxy.git`
3. Change directory to the cloned repository `cd mineskin-cf-api-proxy`
4. Install dependencies `yarn install`
5. For **local testing**:
  - Create a `.dev.vars` file in the root directory and add your API key:
	```env
	MINESKIN_API_KEY=your_api_key
	```
  - Run `npx wrangler dev` to start the local server. The proxy will be available at `http://localhost:8787`.
6. For **deployment**:
  - Run `npx wrangler secret put MINESKIN_API_KEY` and enter your API key when prompted. This will store your API key as a secret in Cloudflare Workers.
  - Run `yarn deploy` to deploy the worker. The proxy will be available at `https://your-worker-name.your-subdomain.workers.dev/`.


## Setup - via Cloudflare Dashboard
1. Go to the [Cloudflare Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages) and create a new Worker.
2. Under "Import a repository" click "Clone a repository via Git URL" and enter the URL of this repository.
3. Save & Deploy the Worker. **NOTE**: This wil create a new repository on GitHub. Use the Wrangler method above for more control over the deployment.
4. In the "Settings" tab, go to "Variables and Secrets" and edit the `MINESKIN_API_KEY` variable:
  - Type: `Secret`
  - Name: `MINESKIN_API_KEY`
  - Value: Your API key from [account.mineskin.org](https://account.mineskin.org/keys)
