import "dotenv/config"
import fs from "fs"
import csvParser from "csv-parser"
import sequelize from "../database/mysql.js"
import UserRepository from "../repository/user.js"

const fileLoc = "data/customers.csv"
const BATCH_SIZE = 100

/**
 * Upload CSV located in data/customers.csv to Sequelize DB with batch upload
 * 
 * Run this by using the command npm run csv-upload
 */
const uploadCSV = async () => {
    try {
        await sequelize.sync()
        const results = []

        fs.createReadStream(fileLoc)
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                try {
                    const response = await UserRepository.bulkCreate(results, BATCH_SIZE)
                    console.log("Done:", response)
                } catch (err) {
                    console.error("CSV Upload failed:", err)
                }
            })
    } catch (error) {
        console.error('Error in CSV Upload:', error)
    }
}

uploadCSV()
