import { DataTypes } from "sequelize"
import sequelize from "../database/mysql.js"

const UserModel = sequelize.define(
    "User",
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            field: "email",
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["Female", "Male"],
            defaultValue: "Male"
        },
        ip_address: {
            type: DataTypes.STRING,
        },
        company: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.TEXT
        },
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name} ${this.last_name}`
            }
        }
    },
    {
        paranoid: true,
        timestamps: true
    }
)

export default UserModel
