# Backend Developer Test
written in NodeJS and express with nodemon, csv-parser, mysql and sequelize

## Getting Started

### Prerequisites
- node

### Installation

1. Clone repo

2. ```npm i```

3. create mysql DB named "csv"

4. create .env base on .env.example and supply "DB_PASSWORD"

5. run ```npm run dev``` in terminal


### Steps to upload csv

1. run ```npm run csv-upload``` in terminal

```sh
NOTE: This is a batch upload and BATCH_SIZE can be updated in src/scripts/csvUpload.js
```
Steps to run test

1. run ```npm run test``` in terminal

URLs:

GET - localhost:8000/api/v1/user - Returns All users

GET - localhost:8000/api/v1/user/:id - Find User by ID

