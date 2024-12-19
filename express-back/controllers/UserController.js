const bcrypt = require("bcrypt")

const genderService = require("../services/GenderService")
const userService = require("../services/UserService")

async function getAllUsers(req, res) {
    try {
        const users = await userService.findAllUsers()
        const user = await userService.findUserByEmail(req.auth.email)

        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.findUserById(req.params.id)

        if (user)
            res.json(user)
        else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserByCompany(req, res) {
    const user = await userService.findUserByCompany(req.params.company)

    if (user)
        res.json(user)
    else
        res.status(404).json({ message: "User not found !" })
}

async function getUserByEmail(req, res) {
    try {
        const user = await userService.findUserByEmail(req.params.email)

        if (user)
            res.json(user)
        else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function createUser(req, res) {
    try {
        const user = req.body
        const pass = user.password
        const gender = await genderService.getGenderByTitle(user.gender)

        if (!gender)
            throw { message: "Gender not found !" }

        const hash = await bcrypt.hash(pass, 10)

        let hashedUser = { ...user, id_role: 1, id_gender: gender.id_gender }
        hashedUser.password = hash
        hashedUser.id_gender = gender.dataValues.id_gender

        const newUser = await userService.createUser(hashedUser)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: "Erreur interne.", error })
    }
}

async function updateUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const updatedUser = await userService.editUser(id, req.body)

        if (updatedUser)
            res.json(updatedUser)
        else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await userService.findUserById(id)

        if (user) {
            await userService.removeUser(id)
            res.status(204).send()
        } else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByCompany,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}