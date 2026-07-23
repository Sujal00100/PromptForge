# PromptForge — Database

This directory contains database documentation, schemas, and seed scripts for the PromptForge application.

## Structure

```
database/
├── schemas/
│   └── prompt.schema.json   # JSON Schema documentation of the Prompt model
├── seed/
│   └── seed.js              # Seed script to populate sample data
└── README.md                # This file
```

## Schema Overview

### Prompt Collection

Stores optimized prompt history entries. Each document contains:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `task` | String | ✅ | What the prompt is intended to accomplish |
| `originalPrompt` | String | ✅ | The user's original unoptimized prompt |
| `rewrittenPrompt` | String | ✅ | AI-optimized version of the prompt |
| `score` | Object | ✅ | Multi-dimensional quality score (clarity, specificity, context, structure, overall) |
| `improvements` | Array | ❌ | Specific improvements made (category, before, after, explanation) |
| `versions` | Array | ❌ | Alternative style versions (id, style, prompt, score, rationale) |
| `createdAt` | Date | Auto | Mongoose timestamps |
| `updatedAt` | Date | Auto | Mongoose timestamps |

### Indexes

- `createdAt: -1` — Descending index for fast sorted history queries

## Connecting to MongoDB

### Local Development

1. Install [MongoDB Community](https://www.mongodb.com/try/download/community) or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name promptforge-mongo mongo:7
   ```

2. Set the connection string in `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/promptforge
   ```

### MongoDB Atlas (Production / AWS)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP or set `0.0.0.0/0` for EC2
3. Get the connection string and set it in your environment:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/promptforge?retryWrites=true&w=majority
   ```

## Seeding Data

To populate the database with sample entries for testing:

```bash
cd backend
npm run seed
```

This clears existing data and inserts 3 sample prompt optimization entries.

## Migrations

No migration framework is currently needed — Mongoose handles schema evolution gracefully. If you add new fields:

1. Add them to `backend/models/Prompt.js` with sensible defaults
2. Existing documents will use the defaults when queried
3. For backfilling, write a one-off script in this directory
