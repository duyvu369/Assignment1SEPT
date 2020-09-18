const express = require('express')
const application = express()
const functions = require('firebase-functions')

//get all the necessary functions
const { accountRegister, login,updateAccountInfo, getAllAccounts,getAccountInfo, deleteAccount,logOut, getLoggedInStatus, staffRegister} = require('./main/account')
const { createBooking, getBookingHistory, getBookingDetail, deleteBooking, clearBookingHistory, bookingFilterByDate, bookingsFilterByStatus } = require('./service/booking')
const { getAllDoctors} = require('./object/doctor')
const { authorization} = require('./main/authorization')
const { assignBooking } = require('./object/manager')
const { getAllFeedbacks, createFeedback, getFeedbackDetail, getFeedbackHistory, deleteFeedback, clearFeedbackHistory } = require('./service/feedback')

application.put('/Booking',authorization,assignBooking)
application.get('/Doctors', getAllDoctors)
application.post('/staffRegister',staffRegister)

application.post('/Booking', authorization, createBooking)
application.get('/Bookings/:bId',authorization, getBookingDetail)
application.get('/Bookings', authorization, getBookingHistory)
application.delete('/Bookings/:bId', authorization, deleteBooking)
application.delete('/Booking-history',authorization, clearBookingHistory)
application.post('/Bookings-by-date',authorization, bookingFilterByDate)
application.post('/Bookings-by-status',authorization, bookingsFilterByStatus)

application.get('/accounts', authorization, getAllAccounts)
application.get('/account', authorization, getAccountInfo)
application.post('/register', accountRegister)
application.post('/login', login)
application.post('/logout',authorization, logOut)
application.put('/account', authorization, updateAccountInfo)
application.delete('/account',authorization, deleteAccount)
application.get('/status',getLoggedInStatus)

application.post('/Feedback', authorization, createFeedback)
application.get('/Feedback-info', getFeedbackDetail)
application.get('/Feedbacks', getAllFeedbacks)
application.get('/Feedbacks-history', authorization, getFeedbackHistory)
application.delete('/Feedback-history',authorization,clearFeedbackHistory)
application.delete('/Feedback', authorization, deleteFeedback)


//deployment to the default region US
exports.AyPiAI = functions.https.onRequest(application)