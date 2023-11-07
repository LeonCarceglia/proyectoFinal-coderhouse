import { userService } from "../services/index.js"

const registerUser = async (req, res) => {
  res.send({ status: "success", message: "User created" })
}

const loginUser = async (req, res) => {
  if (!req.user)
    return res.status(400).send({
      status: "failed",
      message: "User or password wrong",
    })
  req.session.user = req.user
  req.logger.info(req.session.user)
  res.send({ status: "success", payload: req.user })
}

const githubCallback = async (req, res) => {
  req.session.user = req.user
  res.redirect("/products")
}

const github = async (req, res) => { }

const updatePass = async (req, res) => {
  const { email, newPassword } = req.body
  const userUpdated = await userService.updatePass(email, newPassword)
  res.send({ status: "success", payload: userUpdated })
}

const premium = async (req, res) => {
  const userRole = await userService.updateRole(req.session.user)
  res.status(userRole[0]).send({payload: userRole[1] })
}

const uploadDocuments = async (req, res) => {
  const uploadedFiles = req.files
  const uid = req.params.uid
  const fileType = req.body.type
  console.log(uploadedFiles, uid, fileType)
  try {
    const userDocs = await userService.uploadDocs(uid, uploadedFiles, fileType)
    res.json({ status: "success", payload: userDocs })
  } catch (error) {
    res.status(500).json({ status: "error", message: "Uploading files error" })
  }
}

const getUsers = async (req, res) => {
  const users = await userService.getAll()
  res.json({ status: "success", payload: users })
}

const deleteInactives = async (req, res) =>{
 const usersInactives = await userService.inactiveUsers()
  res.status(204).json({ status: "deleted", message: usersInactives})
}

const deleteUser = async (req, res) =>{
  const userId = req.params.uid
  await userService.deleteUser(userId)
  res.status(204)
}

const modifyRole = async (req, res) =>{
  const userId = req.params.uid
  const newRole = req.body.role
  await userService.modifyRole(userId, newRole)
  res.status(201)
}

export default {
  registerUser,
  loginUser,
  githubCallback,
  github,
  updatePass,
  premium,
  uploadDocuments,
  getUsers,
  deleteInactives,
  deleteUser,
  modifyRole
}