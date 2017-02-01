![](https://raw.githubusercontent.com/ctoid/api-express-mongo-boilerplate/master/public/logo.png)

# API with Express and Mongodb (Mongoose ORM)

## Install

### Prerequisites
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MongoDB - Download and Install [MongoDB](http://www.mongodb.org/) - Make sure it's running on the default port.
  - all Mongodb models its using [Mongoosee](https://www.npmjs.org/package/mongoose)
- Redis - Download and Install [Redis](http://redis.io/download) - Make sure it's running on port 6379

```
  $
  $ git@github.com:ctoid/api-express-mongo-boilerplate.git
  $ cd api-express-mongo-boilerplate
  $ nvm use
  $ npm install
  $ cp .env.sample .env
  $ npm start
```

This project uses [JavaScript Standard Style](https://github.com/feross/standard) - if the name or style choices bother you,
you're gonna have to get over it :) If `standard` is good enough for `npm`, it's good enough for us.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

We use Git `pre-commit` hook

Current tools we using is npm module [`pre-commit`](https://www.npmjs.com/package/pre-commit), **pre-commi** is a pre-commit hook installer for git. It will ensure that your npm test (or other specified scripts) passes before you can commit your changes. This all conveniently configured in your **package.json**
