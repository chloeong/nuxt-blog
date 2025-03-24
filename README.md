# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

nuxt-blog/
├── assets/
│   └── css/
├── components/
│   └── ui/
├── composables/
├── layouts/
│   └── default.vue        // Default layout for all pages
│   └── empty.vue          // Empty layout for error pages
├── pages/
│   ├── index.vue           // Main task list page
├── plugins/
│   ├── pinia.ts            // Pinia plugin (if needed, Nuxt module handles most)
│   ├── quasar.ts           // Quasar plugin (if needed, Nuxt module handles most)
├── stores/
├── app.vue                // Root component
├── nuxt.config.ts         // Nuxt configuration file
├── package.json           // Project dependencies
├── tsconfig.json          // TypeScript configuration (if using TypeScript)
└── .gitignore             // Git ignore file

components
navbar
v sidebar - child, default open, toggle
v header - toggle
v breadcrumb
v footer
v go top
filter
table - table, filters, summary, sortable, sort, edit
pagination
form
dialog
file uploads
dialog - confirm delete

plugins
v dayjs
v filters
router
validation

