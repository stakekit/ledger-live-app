This is a [Vite](https://vite.dev/) + React project.

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the app.

## Environment Variables

The app reads either Vite-prefixed or legacy Next-prefixed public env vars:

```bash
VITE_API_KEY=...
VITE_BASE_URL=...
VITE_MIX_PANEL_TOKEN=...
```

Legacy `NEXT_PUBLIC_*` names are also supported during the migration.