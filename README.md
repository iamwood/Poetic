# Poetic
This web app seeks to unite a community of both aspiring and seasoned poets to collaboratively work on a poem together.

## About

### Overview

Poetic is a web app designed as part of ACM Projects' Fall 2021 season, a 6-week program where teams of 4 students develop apps assigned to them at the beginning. The primary goal of this project was to develop a site that would operate as a collaborative poem-writing tool and help match compatible poets together. It is built using MongoDB and React.

### Features

- Synchronous poem editing
- Matching algorithm to suggest new collaboraters to work with

## Set-up

This project requires working Node.js and NPM installations. Once you've cloned the project, simply run `npm install` in both the `/backend` and `/frontend` directories.

### Config

For the backend to function properly, you must add a file called `db.config.js` to `/backend/app/config` with the contents

```
module.exports = {
    url: [your mongodb database link here]
}
```

For the frontend to function properly, you must add a file called `config.json` to `/frontend/src` with the contents

```
{
  "SERVER_URL": "http://localhost:[PORT variable set in server.js]/api"
}
```

## Running

To start the backend, run `node server.js` in the `/backend` directory.

To start the frontend, run `npm start` in the `/frontend` directory.
