import "dotenv/config"
import assert from "assert"
import UserRepository from "../repository/user.js"
import UserModel from "../model/user.js"
import sequelize from "../database/mysql.js"


UserModel.findAndCountAll = async (options) => {
    return {
        count: 2,
        rows: [{ id: 1 }, { id: 2 }],
        options
    }
}

UserModel.findByPk = async (id) => {
    return { id, name: "Test User" }
}

UserModel.bulkCreate = async (batch, { transaction }) => {
    return batch
}

sequelize.transaction = async () => {
    return {
        commit: async () => {},
        rollback: async () => {}
    }
}

const runTests = async () => {

    // Test getAll with pagination
    const result = await UserRepository.getAll(2, 10)
    assert.strictEqual(result.options.limit, 10)
    assert.strictEqual(result.options.offset, 10)
    console.log("getAll pagination test passed")

    // Test findById
    const user = await UserRepository.findById(1)
    assert.strictEqual(user.id, 1)
    assert.strictEqual(user.name, "Test User")
    console.log("findById test passed")

    // Test bulkCreate
    const users = [{ name: "A" }, { name: "B" }, { name: "C" }]
    const bulkResult = await UserRepository.bulkCreate(users, 2)

    assert.strictEqual(bulkResult.success, true)
    assert.strictEqual(bulkResult.totalInserted, 3)
    console.log("bulkCreate test passed")

    console.log("All tests passed!")
}

runTests().catch(err => {
    console.error("Test failed:", err)
})
