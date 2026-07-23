# PromptForge — AI Prompt Optimization Platform

A full-stack AI-powered prompt engineering toolkit. Analyze, score, rewrite, and optimize your AI prompts with intelligent suggestions. Generate multiple versions, compare outputs, and track improvement history.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB, Mongoose ODM |
| **AI** | Groq SDK (Llama 3.3 70B) |

## Project Structure

```
promptforge/
├── frontend/       # Next.js React application
├── backend/        # Express.js REST API server
├── database/       # Schema docs, seed scripts
└── package.json    # Root workspace scripts
```

## Prerequisites

- **Node.js** ≥ 18
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Groq API Key** — get one at [console.groq.com](https://console.groq.com)

## Quick Start

### 1. Install dependencies

```bash
npm install            # installs root devDeps (concurrently)
npm run install:all    # installs frontend + backend deps
```

### 2. Configure environment

**Backend** — create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/promptforge
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend** — the existing `frontend/.env.local` already has the Groq API key.

### 3. Seed sample data (optional)

```bash
npm run seed
```

### 4. Run locally

```bash
npm run dev
```

This starts both:
- **Frontend** → http://localhost:3000
- **Backend** → http://localhost:5000

## API Endpoints

### Prompt History (Backend — Express)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/prompts` | Save optimized prompt |
| `GET` | `/api/prompts` | List all prompts |
| `GET` | `/api/prompts/:id` | Get single prompt |
| `PUT` | `/api/prompts/:id` | Update prompt |
| `DELETE` | `/api/prompts/:id` | Delete prompt |
| `DELETE` | `/api/prompts` | Clear all history |
| `GET` | `/api/health` | Health check |

### AI Processing (Frontend — Next.js API Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/optimize` | Optimize a prompt |
| `POST` | `/api/analyze` | Analyze prompt quality |
| `POST` | `/api/versions` | Generate style variants |
| `POST` | `/api/compare` | Compare prompts |

## AWS Deployment

The project is structured for easy deployment on AWS:

1. **Frontend** → AWS Amplify, Vercel, or EC2
2. **Backend** → EC2, Elastic Beanstalk, or ECS
3. **Database** → MongoDB Atlas (network-peered with AWS VPC)

Set `MONGODB_URI`, `CORS_ORIGIN`, and `BACKEND_URL` environment variables on your deployment platform. No code changes needed.

## License

Private
