# Cards Against Humanity API

A serverless, database-free REST API that serves card data for the popular party game **Cards Against Humanity**. This API is optimized for serverless platforms like Vercel and Netlify. It fetches the card data once, caches it in memory, and provides high-performance access to packs and cards.

## Features

- **Blazing Fast**: Responses are cached and served instantly.
- **Serverless**: Zero server maintenance, auto-scaling, and deployed to global CDNs.
- **Zero Database Setup**: Card data is loaded directly from a highly optimized compact JSON source.
- **Flexible Data Source**: Easily swap the card database via the `CAH_JSON_URL` environment variable.

---

## Quick Start

You can query the API using standard HTTP client tools like `curl`, `fetch`, or any HTTP client library.

### Example: Get 5 random white cards from the Base game pack (ID: `0`)

```bash
curl "https://cah-api.firer.at/api/sets/0?n=5"
```

**Response:**

```json
[
  "Not feeling a thing.",
  "Throwing a car at someone.",
  "A bunch of scary, alcoholic bums.",
  "Stanky pirate snatch",
  "The Big Rip."
]
```

---

## Endpoints

| Endpoint | Method | Description | Query Parameters | Example |
| --- | --- | --- | --- | --- |
| `/api/sets` | `GET` | List all available card packs with their names and metadata. | None | `/api/sets` |
| `/api/sets/:id` | `GET` | Get a specific card pack including all its black and white cards. | `n` *(optional)*: Number of random white cards to return. | `/api/sets/0` or `/api/sets/0?n=5` |
| `/api/multi` | `GET` | Retrieve multiple card packs by their IDs. | `sets` *(required)*: Comma-separated list of pack IDs. | `/api/multi?sets=0,1` |

---

## Cards Against Humanity Rules

The game is simple and played similarly to *Apples to Apples*.

1. **Setup**: The game requires 3 or more players. One player is selected as the first **Card Czar**.
2. **Dealing**: The Card Czar deals **10 white cards** (response cards) to each player.
3. **The Prompt**: The Card Czar flips over **one black card** (prompt card) and reads it aloud.
4. **Playing**: All other players choose the funniest white card(s) from their hand that answer the prompt or fill in the blank, and slide them face down to the Card Czar.
5. **Judging**: The Card Czar shuffles all the received white cards, reads them aloud, and chooses the funniest combination.
6. **Winning a Round**: The player who submitted the winning card gets the black card as an "Awesome Point".
7. **Next Round**: All players draw back up to 10 white cards. The role of Card Czar rotates to the next player, and a new round begins.

---

## Setup & Deployment

For instructions on how to run this project locally, configure environment variables, and deploy to platforms like Vercel and Netlify, please refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) guide.

## Credits

Credits to [github.com/spglancy/CAH-API](https://github.com/spglancy/CAH-API) for the inspiration and endpoint structure.
