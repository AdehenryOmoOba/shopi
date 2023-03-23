This is a fullstack project powered by 
- NextJS 13.2 (new app directory)  [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Prisma
- PostgresQL

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

- To connect nextJS to prisma we need to install two packages:

1. Prisma: Needed in dev mode or CI/CD pipeline. It helps manage the database by creating and executing migration, pulling/pushing from/to database. It is hoever not needed in production 
2. Prisma client: It is used to connect the postgresQL database to the NextJS application and also executes the sequel queries. It is required in production

- After installing those two packages, initialize prisma with command: "npx prisma init"

- Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run "npx prisma db pull" to turn your database schema into a Prisma schema.
4. Run "npx prisma generate dev --name <migration name>" to generate the Prisma Client. You can then start querying your database.

NB: Prisma client stores all the type definitions inside node_modules directory, so, when building and deploying the application to vercel or CI/CD 
pipeline, we need to re-install all the node_modules and re-generate the prisma client type definitions as part of the build process or post-installation generate them.
This can be done by modifying the build script inside the package.json file as: "build": "npx prisma generate && next build"

Seeding: create a "seed.ts" file and seed your database with some default data for testing

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
