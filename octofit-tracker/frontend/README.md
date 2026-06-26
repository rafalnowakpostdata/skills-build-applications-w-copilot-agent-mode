# OctoFit Tracker Frontend

The React 19 presentation tier uses `react-router-dom` to navigate between API-backed views for activities, leaderboard data, teams, users, and workouts.

## Environment

Define `VITE_CODESPACE_NAME` so the frontend can call the backend on port 8000 through the GitHub Codespaces URL pattern.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The application builds API URLs in this format:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is missing, the frontend avoids generating `https://undefined-8000...` URLs by first trying to infer the codespace name from the current host and otherwise skipping the request with a visible configuration warning.

## Scripts

- `npm run dev -- --host 0.0.0.0 --port 5173`
- `npm run build`
- `npm run preview -- --host 0.0.0.0 --port 4173`
