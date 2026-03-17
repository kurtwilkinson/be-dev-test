import { Sequelize } from "sequelize"


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB,
    host: process.env.DB_HOST
})

sequelize.authenticate()
.then(() => {
    console.log("DB Connected")
})
.catch((err) => {
    console.log("DB Connection error", err)
})

sequelize.sync({force:false})
.then(() => {
    console.log("DB Sync models")
})
.catch((err) => {
    console.log("DB Sync error", err)
})

export default sequelize
