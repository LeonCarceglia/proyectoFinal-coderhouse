import userModel from "../../models/user.js"
import { createHash, isValidPassword } from "../../../utils.js"

export default class UsersManager {
    constructor() {
    }

    getUsers = () => {
        return userModel.find().lean()
    }

    getUser = (id) => {
        return userModel.findById(id).lean()
    }

    createUser = (user) => {
        return userModel.create(user)
    }

    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, user)
    }

    deleteUser = (id) => {
        return userModel.findByIdAndDelete(id)
    }

    existUser = (email) => {
        return userModel.findOne({ email })
    }

    updatePass = async (email, newPass) => {
        const user = await userModel.findOne({ email })
        if (isValidPassword(user, newPass)) {
            return "Error, password are equals"
        } else {
            const newPassword = createHash(newPass)
            user.password = newPassword
            await user.save()
            return "User updated"
        }
    }

    updateConnection = async (user) => {
        return await userModel.findByIdAndUpdate(user._id, { last_connection: new Date() })
    }

    updateRole = async (user) => {
        const validRoles = ["user", "premium"]
        const requiredDocuments = ["Identification", "Proof of Address", "Bank Statement"]
        if (validRoles.includes(user.role)) {
            if (user.role === "user") {
                const hasAllRequiredDocuments = requiredDocuments.every(docName =>
                    user.documents.some(doc => doc.name === docName)
                )
                if (hasAllRequiredDocuments) {
                    const newRole = "premium"
                    await userModel.findByIdAndUpdate(user._id, { role: newRole })
                    user.role = newRole
                    return [200, user]
                } else {
                    return [400, "The user has not finished processing their documentation"]
                }
            } else {
                return [400, "The user is already premium"]
            }
        } else {
            return [400, "Invalid role"]
        }
    }

    uploadDocs = async (uid, newFiles, type) => {
        const user = await userModel.findById(uid)
        newFiles.forEach((file) => {
          const document = {
            name: file.originalname,
            reference: file.filename,
          };
      
          if (type === "profile") {
            document.path = "profiles/" + file.filename
          } else if (type === "document") {
            document.path = "documents/" + file.filename
          }
          user.documents.push(document)
        })
        await user.save()
        return user.documents
      }

    inactiveUsers = async () => {
        const limite = new Date()
        limite.setHours(limite.getHours() - 48)
        await userModel.deleteMany({
            last_connection: { $lt: limite }
        })
        return "Deleted inactive users"
    }

    modifyRole = async (id, newRole) =>{
        const user = await userModel.findById(id)
        user.role = newRole
        await user.save()
        return "Role modified"
    }
}