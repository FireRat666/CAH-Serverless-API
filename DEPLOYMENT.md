# CAH API - Serverless Deployment Guide

Your API is now ready to deploy to Vercel and/or Netlify! Both platforms offer free tiers with 100GB bandwidth monthly.

## Configuration

The API automatically fetches the card data from:

```code
https://raw.githubusercontent.com/FireRat666/json-against-humanity/latest/cah-all-compact.json
```

**To use a different JSON URL**, set the `CAH_JSON_URL` environment variable:

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `CAH_JSON_URL` = `https://your-url/to/cah-all-compact.json`
4. Redeploy

### Netlify

1. Go to Site settings → Build & deploy → Environment
2. Add: `CAH_JSON_URL` = `https://your-url/to/cah-all-compact.json`
3. Trigger a new deploy

The API will cache the data on first request for performance.

## Endpoints

Once deployed, your API will be available at:

```code
GET /api/sets                      → List all card packs
GET /api/sets/:id                  → Get full pack
GET /api/sets/:id?n=5              → Get 5 random white cards
GET /api/multi?sets=0,1            → Get multiple packs
```

### Example Responses

**GET /api/sets**

```json
[
  {"id": "0", "name": "2016 Election Game", "official": false, "sheetName": "Stand Alone Games"},
  {"id": "1", "name": "Achievement Hunter Cards Against Humanity", "official": false, "sheetName": "Fan Expansions"}
]
```

**GET /api/sets/0?n=3**

```json
["#BlackLivesMatter.", "Lines of Koch.", "Canadians (i.e. Ted Cruz)."]
```

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your CAH-API repository
5. Click "Import" → Auto-detects Other
6. Click "Deploy" (Default settings should work)

Your API will be live at: `https://your-project.vercel.app/api/sets`

## Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Select "Connect to Git"
4. Choose GitHub and your CAH-API repository
5. Settings should auto-populate - just click "Deploy site"

Your API will be live at: `https://your-project.netlify.app/api/sets`

## Features

- **No server to maintain** - Fully managed infrastructure
- **No rate limiting needed** - Automatically scales
- **Always available** - Global CDN with auto-failover
- **Free** - Both platforms offer generous free tiers
- **Auto-deploys** - Push to GitHub → Auto-deployed
- **Production URLs** - Real HTTP endpoints (no JavaScript required)
- **Supports both platforms** - Single codebase works everywhere
- **Configurable data source** - Change JSON URL via environment variable

## Local Testing

Test before deployment:

```bash
# Test sets endpoint
curl http://localhost:3000/api/sets

# Test random cards (5 cards from pack 0)
curl "http://localhost:3000/api/sets/0?n=5"

# Test multiple packs
curl "http://localhost:3000/api/multi?sets=0,1"
```

## Costs

| Service | Free Tier          | Cost                   |
|---------|-----------         |------                  |
| Vercel  | 100GB bandwidth/mo | $0 (for most projects) |
| Netlify | 100GB bandwidth/mo | $0 (for most projects) |

## Next Steps

1. (Optional) Set `CAH_JSON_URL` environment variable if using custom JSON
2. Push to GitHub (already done)
3. Deploy to Vercel and/or Netlify using links above
4. Update any client code pointing to old API URLs
5. Test endpoints from your deployed URL

Questions? Check your deployed URL status in the platform dashboard.
