# Pet Stop

## Getting Started 🐶

This repository uses [TailwindCSS](https://tailwindcss.com/) for styling. For the best developer experience, install the [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for VSCode. Optionally, if you prefer, you may choose to use CSS Modules for a more traditional CSS experience.

### Frontend:

- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)

### Backend:

- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [SQLite3](https://www.sqlite.org/index.html)

### Testing:

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [nock](https://github.com/nock/nock)
- [supertest](https://github.com/visionmedia/supertest)

## Contributing Guide 🐱

To run this project:

```sh
# clone to your local machine
cd pet-stop
npm install
cp .env.example .env # fill in the values
                     # check Discord for the values

npm run db:reset # to run migrations and seeds

# then
npm run dev

# or
# to run the React client (Vite)
npm run dev:client
# will run the React client on http://localhost:5173

# to run the API server (Express)
npm run dev:server
# will run the API server on http://localhost:3000
```

## About the Project 🐩

### DB Schema (for now)

Note that users is not a table in the database, but rather a table in Auth0.

![db diagram](.docs/erd.png)

<details>
<summary>ERD code</summary>

```ts
Table pets as P {
  id integer [primary key]
  userId auth0
  name string
  bio string
  imageUrl url
  animal enum('cat', 'dog')
  points integer
  createdAt timestamp
  updatedAt timestamp
}

Table votes as V {
  petId integer [primary key]
  userId auth0 [primary key]
  createdAt timestamp
  updatedAt timestamp
}

Table comments as C {
  id integer [primary key]
  authorId auth0
  petId integer
  content string
  createdAt timestamp
  updatedAt timestamp
}

Table auth0_users as U {
  id integer [primary key]
}


Ref: "votes"."petId" > "pets"."id"

Ref: "pets"."id" < "comments"."petId"

Ref: "U"."id" < "votes"."userId"

Ref: "comments"."authorId" > "U"."id"

Ref: "U"."id" < "pets"."userId"
```

</details>

---

### Wireframes

Wireframes live on the Miro Board, check Discord for the link!

---

## API design

### Routes

#### GET `/api/v1/pets/leaderboard`

Request:
`GET /api/v1/pets/leaderboard`

Response:

```json
{
  "pets": [
    {
      "id": 1,
      "name": "Giralda",
      "animal": "cat",
      "points": 7
    },
    {
      "id": 2,
      "name": "Buddy",
      "animal": "dog",
      "points": 5
    },
    {
      "id": 3,
      "name": "Mittens",
      "animal": "cat",
      "points": 3
    }
  ]
}
```

#### `/api/v1/pets/:id`

Request:
`GET /api/v1/pets/2`

Response:

```json
{
  "pet": {
    "id": 2,
    "ownerId": "auth0|1234",
    "name": "Giralda",
    "bio": "...",
    "animal": "cat",
    "imageUrl": "...",
    "points": 7
  }
}
```

#### GET /api/v1/owners/:ownerId/pets

Request:
`GET /api/v1/owners/auth0|1234/pets`

Response:

```json
{
  "pets": [
    {
      "id": 1,
      "ownerId": "auth0|1234",
      "name": "Giralda",
      "bio": "...",
      "animal": "cat",
      "imageUrl": "...",
      "points": 7
    },
    {
      "id": 3,
      "ownerId": "auth0|1234",
      "name": "Mittens",
      "bio": "...",
      "animal": "cat",
      "imageUrl": "...",
      "points": 3
    }
  ]
}
```

#### GET /api/v1/pets/random

Request:
`GET /api/v1/pets/random?count=1`

Response:

```json
{
  "pets": [
    {
      "id": 18,
      "ownerId": "auth0|4576",
      "name": "Coco",
      "bio": "...",
      "animal": "dog",
      "imageUrl": "...",
      "points": 124
    }
  ]
}
```

Request:
`GET /api/v1/pets/random?count=2`

Response:

```json
{
  "pets": [
    {
      "id": 18,
      "ownerId": "auth0|4576",
      "name": "Coco",
      "bio": "...",
      "animal": "dog",
      "imageUrl": "...",
      "points": 124
    },
    {
      "id": 24,
      "ownerId": "auth0|4576",
      "name": "Penelope",
      "bio": "...",
      "animal": "dog",
      "imageUrl": "...",
      "points": 124
    }
  ]
}
```

#### POST /api/v1/pets/:id/votes

Request:
`POST /api/v1/pets/1/votes`

Response: `201 Created`

## Snippets 🐈

These are small snippets of code that may help you out. Note that this is not an exhaustive list, and you may need to mix and match concepts.

#### Fetch from Component

<details>
  <summary>Code:</summary>

```ts
// component.tsx
const { data: fruits, isLoading, isError } = useQuery(['fruits'], getFruits)

if (isError) {
  return (/* ... */)
}

if (isLoading) {
  return (/* ... */)
}

return (/* ... */)
```

</details>

#### Fetch with Authentication

<details>
  <summary>Code:</summary>

```ts
// component.tsx
const { getAccessTokenSilently } = useAuth0()

const { data: fruits, isLoading, isError } = useQuery(['fruits'], async () => {
  const token = await getAccessTokenSilently()
  return getForbiddenFruits({ token })
})

if (isError) {
  return (/* ... */)
}

if (isLoading) {
  return (/* ... */)
}

return (/* ... */)
```

</details>

---

### API Client

#### Set Authorization Header for API Requests

<details>
  <summary>Code:</summary>

```ts
// apis/fruits.ts
async function getForbiddenFruits({ token }: { token: string }) {
  const response = await request
    .get('/api/v1/fruits')
    .set('Authorization', `Bearer ${token}`)

  return response.body.fruits
}
```

</details>

### Express Routes

#### Checking for Authentication (server-side)

<details>
  <summary>Code:</summary>

```ts
// server/routes/fruits.ts
router.get('/', checkJwt, (req, res) => {
  // req.auth is available here
  const userId = req.auth?.payload.sub

  try {
    const fruits = await db.getForbiddenFruits(userId)

    // ...
  } catch (error) {
    // ...
  }
})
```

</details>

---

### Database/Knex

#### Database Join

<details>
  <summary>Code:</summary>

```ts
// server/db/fuctions/reviews.ts
async function getFruits(): Promise<FruitWithReview[]> {
  //         table 1
  return (
    db('reviews')
      //     table 2   column 1           column 2
      .join('fruits', 'reviews.fruitId', 'fruits.id')
      .select(
        // make sure column names end up being unique
        'fruits.id',
        'fruits.name',
        'fruits.color',
        'fruits.taste',
        'reviews.tasteRating',
        'reviews.textureRating',
        'reviews.content'
      )
  )
}
```

</details>
