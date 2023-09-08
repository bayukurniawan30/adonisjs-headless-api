# Headless CMS API using AdonisJS

This is a Backend API for Headless CMS, build with [AdonisJS](https://adonisjs.com/). AdonisJS is a fully featured web framework for Node.js. It's like a Nodejs version of Laravel.

## Features

- Built in CRUD Controller
- Built in Auth

### CRUD Controller

CRUD Controller is a base controller that can be extended by other controller to implement basic CRUD (Create, Read, Update, Delete) operation. It includes `index`, `show`, `create`, `update`, and `delete` method.

Index method support filtering and sorting by query string. Available query strings are:

| Query String | Default Value | Available Value                                    | Example                                                       |
| ------------ | ------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| sort         | created_at    | Use table column as value                          | sort=name                                                     |
| order        | desc          | asc or desc                                        | order=asc                                                     |
| filter       | desc          | JSON object                                        | filter={"field": "name", "value": "John", "operator": "like"} |
| page         | 1             | Any unsigned integer value                         | page=1                                                        |
| limit        | 10            | Any unsigned integer value. Use 0 to show all data | limit=20                                                      |

To use CrudController class, extend it from child controller that will used it as parent

```
export default class UsersController extends CrudController {
  ...
}
```

**Filter**

Basically filter is a JSON object. The type is like below:

```
type Filter = {
  field: string
  value: string
  operator: 'like' | '=' | '<>' | '<' | '>' | '<=' | '>=' | 'in' | 'not in'
}
```

### Auth

Provided with built in Auth, using `@adonisjs/auth` package. Read more about AdonisJS Auth [here](https://docs.adonisjs.com/guides/auth/introduction)
