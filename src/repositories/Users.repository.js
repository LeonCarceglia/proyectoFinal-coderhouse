import UserDTO from "../DTOs/User.dto.js"

class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    async getAll() {
        try {
            const usersDAO = await this.dao.getUsers()
            const usersDTO = usersDAO.map(user=> new UserDTO(
                {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }
            ))
            return usersDTO
        }
        catch (error) {
            throw error
        }
    }

    getUser(id) {
        try {
            return new UserDTO(this.dao.getUser(id))
        }
        catch (error) {
            throw (error)
        }
    }

    async createUser(user) {
        try {
            return await this.dao.createUser(user)
        }
        catch (error) {
            throw (error)
        }
    }

    async updateUser(id, user) {
        try {
            return await this.dao.updateUser(id, user)
        }
        catch (error) {
            throw (error)
        }
    }

    async deleteUser(id) {
        try {
            return await this.dao.deleteUser(id)
        }
        catch (error) {
            throw (error)
        }
    }

    getCurrentUser(user) {
        try {
            const newUser = new UserDTO(user)
            return newUser
        }
        catch (error) {
            throw (error)
        }
    }

    async existUser(email) {
        try {
            return this.dao.existUser(email)
        }
        catch (error) {
            throw (error)
        }
    }

    async updatePass(email, newPass) {
        try {
            return this.dao.updatePass(email, newPass)
        }
        catch (error) {
            throw (error)
        }
    }

    async updateConnection(user){
        try{
            return await this.dao.updateConnection(user)
        }
        catch(error){
            throw (error)
        }
    }

    async updateRole(user){
        try{
            return await this.dao.updateRole(user)
        }
        catch(error){
            throw(error)
        }
    }

    async uploadDocs(uid, newFiles, type){
        try{
            return await this.dao.uploadDocs(uid, newFiles, type)
        }
        catch(error){
            throw(error)
        }
    }

    async inactiveUsers(){
        try{
            return await this.dao.inactiveUsers()
        }
        catch(error){
            throw(error)
        }
    }

    async getUsers(){
        try{
            return await this.dao.getUsers()
        }
        catch(error){
            throw error
        }
    }

    async modifyRole(uid, newRole){
        try{
            return await this.dao.modifyRole(uid, newRole)
        }
        catch(error){
            throw error
        }
    }
}

export default UserRepository