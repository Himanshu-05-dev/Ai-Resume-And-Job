const express = require('express')
const autthMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')



const interviewRouter = express.Router()

interviewRouter.post("/",autthMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

interviewRouter.get("/report/:interviewId",autthMiddleware.authUser,interviewController.getInterviewReportByIdController)

interviewRouter.get("/",autthMiddleware.authUser,interviewController.getAllInterviewReportsController)



module.exports = interviewRouter