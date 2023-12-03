# Mongoose Homework

## API Reference

Certainly! Here's the updated API reference with the word "(Optional) added to the descriptions where parameters are not required:

## API Reference

### Users

#### Get all users

```http
  GET /api/v1/users
```

**Parameters:**

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `Users[]` | Returns an array of users |

---

#### Get user by ID

```http
  GET /api/v1/users/:id
```

**Parameters:**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user to fetch |

---

#### Create a new user

```http
  POST /api/v1/users
```

**Parameters:**

| Parameter    | Type     | Description                                            |
| :----------- | :------- |:-------------------------------------------------------|
| `firstName`  | `string` | **Required**. First name of the user                   |
| `lastName`   | `string` | **Required**. Last name of the user                    |
| `email`      | `string` | **Required**. Email of the user                        |
| `role`       | `string` | (Optional) Role of the user (admin, writer, guest)     |
| `age`        | `number` | (Optional) Age of the user                             |
| `numberOfArticles` | `number` | (Optional) Number of articles associated with the user |

---

#### Update user by ID

```http
  PUT /api/v1/users/:id
```

**Parameters:**

| Parameter    | Type     | Description                            |
| :----------- | :------- |:---------------------------------------|
| `id`         | `string` | **Required**. ID of the user to update |
| `firstName`  | `string` | (Optional) First name of the user      |
| `lastName`   | `string` | (Optional) Last name of the user       |
| `age`        | `number` | (Optional) Age of the user             |

---

#### Delete user by ID

```http
  DELETE /api/v1/users/:id
```

**Parameters:**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user to delete |

---

### Articles

#### Authentication Middleware
The authentication middleware (auth.middleware.js) safeguards certain routes by checking for a valid user-id header in incoming requests. If the header is missing or invalid, the middleware responds with a 401 Unauthorized status, restricting access to protected routes. The extracted user ID is then attached to req.user for subsequent route handling.

#### Get all articles

```http
  GET /api/v1/articles
```

**Parameters:**

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `Articles[]` | Returns an array of articles |

---

#### Get article by ID

```http
  GET /api/v1/articles/:id
```

**Parameters:**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the article to fetch |

---

#### Create a new article

```http
  POST /api/v1/articles
```

**Parameters:**

| Parameter    | Type     | Description                                                |
| :----------- | :------- |:-----------------------------------------------------------|
| `title`      | `string` | **Required**. Title of the article                         |
| `subtitle`   | `string` | (Optional) Subtitle of the article                         |
| `description`| `string` | **Required**. Description of the article                   |
| `owner`      | `string` | **Required**. ID of the article owner                      |
| `category`   | `string` | (Optional) Category of the article (sport, games, history) |

---

#### Update article by ID

```http
  PUT /api/v1/articles/:id
```

**Parameters:**

| Parameter    | Type     | Description                               |
| :----------- | :------- |:------------------------------------------|
| `id`         | `string` | **Required**. ID of the article to update |
| `title`      | `string` | (Optional) Title of the article           |
| `subtitle`   | `string` | (Optional) Subtitle of the article        |
| `description`| `string` | (Optional) Description of the article     |
| `category`   | `string` | (Optional) Category of the article        |

---

#### Delete article by ID

```http
  DELETE /api/v1/articles/:id
```

**Parameters:**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the article to delete |

---