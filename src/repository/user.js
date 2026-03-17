import sequelize from "../database/mysql.js"
import UserModel from "../model/user.js"

const UserRepository = {}

/**
 * Get all users with pagination
 * 
 * @param {*} page 
 * @param {*} pageSize 
 * @returns Users
 */
UserRepository.getAll = async (page, pageSize) => {
    let queryOptions = {}

    if (page && pageSize) {
        const limit = parseInt(pageSize)
        queryOptions.limit = limit
        queryOptions.offset = (parseInt(page) - 1) * limit
    }

    return await UserModel.findAndCountAll(queryOptions)
}

/**
 * Find User by Primary key
 * 
 * @param {*} id 
 * @returns User
 */
UserRepository.findById = async (id) => {
    return await UserModel.findByPk(id)
}

/**
 * Bulk Create with batching
 * 
 * @param {*} users 
 * @param {*} batchSize 
 * @returns {
 *   success
 *   totalInserted
 * }
 */
UserRepository.bulkCreate = async (users, batchSize = 100) => {
    let totalInserted = 0;

    for (let i = 0; i < users.length; i += batchSize) {
        const batch = users.slice(i, i + batchSize)

        const transaction = await sequelize.transaction()

        try {
            await UserModel.bulkCreate(batch, { transaction })

            await transaction.commit()

            totalInserted += batch.length

        } catch (error) {
            await transaction.rollback()
            console.error(error)
            throw error
        }
    }

    return {
        success: true,
        totalInserted
    }
}

export default UserRepository
