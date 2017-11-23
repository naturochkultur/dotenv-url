# DOTENV-URL

Dotenv-url is a module that loads environment variables from a .env file into process.env. The .env file can loaded from the filesystem or a url. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

## Usage

As early as possible in your application, require and configure dotenv-url.

```javascript
require('dotenv-url').config()
```

Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
For example:

```dosini
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

That's it.

`process.env` now has the keys and values you defined in your `.env` file.

```javascript
var db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```
## Advanced usage 

Use the options object to configure dotenv-url to load environment variables from a non-default location and/or specify encoding.

### Load from file

```javascript
require('dotenv-url').config({path: 'some-directory/.env', encoding: 'utf8'})
```

### Load from URL

```javascript
require('dotenv-url').config({path: 'https://example.com/test/test.env', encoding: 'utf8'})
```


