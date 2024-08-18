# CarpoolNext

CarpoolNext is a carpooling search application built with Next.js. It allows users to enter coordinates and search for carpooling options. The search results can be sorted by departure, price, or the fastest option, and are displayed on a map.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## Project Pages

### Homepage

The homepage displays a search form for the user to enter coordinates and search for carpooling options.

### Search Page

The search page displays a list of carpooling options based on the following API call: https://public-api.blablacar.com/api/v3/

On the search page, there is a map displaying the trip, and it is possible to order the list of trips by departure, price, or the fastest option.

## Environment Variables

To make the project work, ensure you have a .env.local file with the following content:

```env
BLABLACAR_API_KEY=your_blablacar_api_key
MAPS_API_KEY=your_google_maps_api_key
```

## Scripts

The project includes the following scripts:

- `dev`: Start the development server
- `build`: Build the application
- `prettify`: Run Prettier to format the code
- `start`: Start the production server
- `lint`: Run ESLint to check for linting errors
- `test`: Run Jest to execute tests
