const express = require('express')
const application = express()
const functions = require('firebase-functions')

//get all the necessary functions
const { accountRegister, login,updateAccountInfo, getAllAccounts,getAccountInfo, deleteAccount,logOut, getLoggedInStatus, staffRegister} = require('./main/account')
const { createBooking, getBookingHistory, getBookingDetail, deleteBooking,updateAppointmentInfo, clearBookingHistory } = require('./service/booking')
const { getAllDoctors} = require('./object/doctor')
const { authorization} = require('./main/authorization')
const { assignBooking } = require('./object/manager')
const { getAllFeedbacks, createFeedback, getFeedbackDetail, getFeedbackHistory, deleteFeedback, clearFeedbackHistory } = require('./service/feedback')

application.put('/Booking/Assign/:bId',authorization,assignBooking)
application.get('/Doctors', getAllDoctors)
application.post('/staffRegister',staffRegister)

application.post('/Booking', authorization, createBooking)
application.get('/Bookings/:bId',authorization, getBookingDetail)
application.get('/Bookings', authorization, getBookingHistory)
application.delete('/Bookings/:bId', authorization, deleteBooking)
application.put('/Bookings/:bId',authorization, updateAppointmentInfo)
application.delete('/Booking-history',authorization, clearBookingHistory)

application.get('/accounts', authorization, getAllAccounts)
application.get('/account', authorization, getAccountInfo)
application.post('/register', accountRegister)
application.post('/login', login)
application.post('/logout',authorization, logOut)
application.put('/account', authorization, updateAccountInfo)
application.delete('/account',authorization, deleteAccount)
application.get('/status',getLoggedInStatus)

application.post('/Bookings/feedback/:bId', authorization, createFeedback)
application.get('/feedbacks/:fId',authorization, getFeedbackDetail)
application.get('/feedbacks', authorization, getAllFeedbacks)
application.get('/feedbacks-history', authorization, getFeedbackHistory)
application.delete('/feedback-history',authorization,clearFeedbackHistory)
application.delete('/feedbacks/:fId', authorization, deleteFeedback)


//deployment to the default region US
exports.AyPiAI = functions.https.onRequest(application)