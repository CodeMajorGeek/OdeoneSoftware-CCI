const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const genderService = require("../services/GenderService")
const roleService = require("../services/RoleService")
const userService = require("../services/UserService")
const sessionService = require("../services/SessionService")

const TOKEN_SECRET = process.env.TOKEN_SECRET

async function getAllUsers(req, res) {
    try {
        const users = await userService.findAllUsers()

        if (!users)
            throw { message: "No users found !" }

        const usersMask = await Promise.all(users.map(async (user) => {
            const gender = await genderService.findGenderById(user.id_gender)
            const role = await roleService.findRoleById(user.id_role)
            return {
                id_user: user.id_user,
                lastname: user.lastname,
                firstname: user.firstname,
                main_email: user.main_email,
                secondary_email: user.secondary_email,
                company: user.company,
                telephone: user.telephone,
                gender: gender.title,
                role: role.title
            }
        }))

        res.json(usersMask)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.findUserById(req.params.id)
        const gender = await genderService.findGenderById(user.id_gender)
        const role = await roleService.findRoleById(user.id_role)

        const userMask = {
            id_user: user.id_user,
            lastname: user.lastname,
            firstname: user.firstname,
            main_email: user.main_email,
            secondary_email: user.secondary_email,
            company: user.company,
            telephone: user.telephone,
            gender: gender.title,
            role: role.title
        }

        if (user)
            res.json(userMask)
        else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserByToken(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, TOKEN_SECRET)

    const user = await userService.findUserByEmail(decoded.email)
    const gender = await genderService.findGenderById(user.id_gender)
    const role = await roleService.findRoleById(user.id_role)

    const userMask = {
        id_user: user.id_user,
        lastname: user.lastname,
        firstname: user.firstname,
        main_email: user.main_email,
        secondary_email: user.secondary_email,
        company: user.company,
        telephone: user.telephone,
        gender: gender.title,
        role: role.title
    }
    if (user)
        res.json(userMask)
    else
        res.status(404).json({ message: "User not found !" })
}

async function getUserByCompany(req, res) {
    try {
        const users = await userService.findUserByCompany(req.params.company)
        
        if (!users || users.length === 0)
            return res.status(404).json({ message: "User not found !" })

        const usersMask = await Promise.all(users.map(async (user) => {
            const gender = await genderService.findGenderById(user.id_gender)
            const role = await roleService.findRoleById(user.id_role)
            return {
                id_user: user.id_user,
                lastname: user.lastname,
                firstname: user.firstname,
                main_email: user.main_email,
                secondary_email: user.secondary_email,
                company: user.company,
                telephone: user.telephone,
                gender: gender.title,
                role: role.title
            }
        }))

        res.json(usersMask)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await userService.findUserByEmail(req.params.email)
        const gender = await genderService.findGenderById(user.id_gender)
        const role = await roleService.findRoleById(user.id_role)

        const userMask = {
            id_user: user.id_user,
            lastname: user.lastname,
            firstname: user.firstname,
            main_email: user.main_email,
            secondary_email: user.secondary_email,
            company: user.company,
            telephone: user.telephone,
            gender: gender.title,
            role: role.title
        }

        if (user)
            res.json(userMask)
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
        const role = await roleService.findRoleById(newUser.id_role)
        
        const newUserMask = {
            id_user: newUser.id_user,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            main_email: newUser.main_email,
            secondary_email: newUser.secondary_email,
            company: newUser.company,
            phone: newUser.phone,
            gender: gender.title,
            role: role.title
        }

        res.status(201).json(newUserMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur interne.", error })
    }
}

async function updateUser(req, res) {
    try {
        const id = parseInt(req.params.id)

        const data = req.body
        const gender = await genderService.getGenderByTitle(data.gender)

        if (!gender)
            throw { message: "Wrong data !" }

        await userService.editUser(id, {
            ...data,
            id_gender: gender.id_gender
        })

        const updatedUser = await userService.findUserById(id)
        const role = await roleService.findRoleById(updatedUser.id_role)
        const updatedUserMask = {
            id_user: updatedUser.id_user,
            lastname: updatedUser.lastname,
            firstname: updatedUser.firstname,
            main_email: updatedUser.main_email,
            secondary_email: updatedUser.secondary_email,
            company: updatedUser.company,
            telephone: updatedUser.telephone,
            gender: gender.title,
            role: role.title
        }

        if (updatedUser)
            res.json(updatedUserMask)
        else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function updateUserByToken(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, TOKEN_SECRET)

        const newUser = req.body
        if (newUser.password) {
            newUser.password = await bcrypt.hash(newUser.password, 10)
        }

        const gender = await genderService.getGenderByTitle(newUser.gender)
        await userService.editUserByEmail(decoded.email, {
            ...newUser,
            id_gender: gender.id_gender
        })

        const updatedUser = await userService.findUserByEmail(decoded.email)
        const role = await roleService.findRoleById(updatedUser.id_role)
        
        const updatedUserMask = {
            id_user: updatedUser.id_user,
            lastname: updatedUser.lastname,
            firstname: updatedUser.firstname,
            main_email: updatedUser.main_email,
            secondary_email: updatedUser.secondary_email,
            company: updatedUser.company,
            telephone: updatedUser.telephone,
            gender: gender.title,
            role: role.title
        }

        res.json(updatedUserMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur interne.", error })
    }
}

async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await userService.findUserById(id)

        if (user) {
            await sessionService.removeSessionByUserId(id)
            await userService.removeUser(id)
            res.status(204).send()
        } else
            res.status(404).json({ message: "User not found !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteOwnUser(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, TOKEN_SECRET)
        const user = await userService.findUserByEmail(decoded.email)

        if (user) {
            await sessionService.removeSessionByUserId(user.id_user)
            await userService.removeUser(user.id_user)
            res.status(204).send()
        } else
            res.status(404).json({ message: "Utilisateur non trouvé !" })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByToken,
    getUserByCompany,
    getUserByEmail,
    createUser,
    updateUser,
    updateUserByToken,
    deleteUser,
    deleteOwnUser
}