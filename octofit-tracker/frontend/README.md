# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier application.

## Environment Variables

`VITE_CODESPACE_NAME` must be defined for Codespaces API URLs.

1. Copy `.env.local.example` to `.env.local`.
2. Set the value:

```
VITE_CODESPACE_NAME=<your-codespace-name>
```

When `VITE_CODESPACE_NAME` is set, the app calls:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

When it is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`

## Run

```
npm run dev
```
