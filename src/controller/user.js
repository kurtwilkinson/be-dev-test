import UserRepository from "../repository/user.js"

const User = {}

/**
 * Get all users with pagination
 * 
 * @param {*} req 
 * @param {*} res 
 */
User.getAll = async (req, res) => {
    const {page, pageSize} = req.query
    const users = await UserRepository.getAll(page, pageSize)

    res.status(200).send(users)
}

/**
 * Find a user by primary key
 * 
 * @param {*} req 
 * @param {*} res 
 */
User.findById = async (req, res) => {
    const {id} = req.params
    const user = await UserRepository.findById(id)

    res.status(200).send(user)
}

export default User
