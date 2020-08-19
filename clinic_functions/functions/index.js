const express = require('express')
const application = express()
const functions = require('firebase-functions')

//get all the necessary functions
const { accountRegister, login,updateAccountInfo, getAllAccounts,getAccountInfo, deleteAccount} = require('./main/account')
const { getAllBookings, createBooking, getBookingHistory, getBookingDetail, deleteBooking } = require('./service/booking')
const { getAllDoctors, addADoctor, deleteDoctor} = require('./object/doctor')
const { authorization} = require('./main/authorization')
const { filterByName } = require('./service/filter')


application.get('/Doctors', getAllDoctors)
application.post('/Doctor', authorization, addADoctor)
application.delete('/Doctors/:dId',authorization, deleteDoctor)


application.post('/Booking', authorization, createBooking)
application.get('/Booking/:bId',authorization, getBookingDetail)
application.get('/All-bookings', authorization, getAllBookings)
application.get('/Booking-history', authorization, getBookingHistory)
application.delete('/Booking/:bId', authorization, deleteBooking)


application.get('/All-accounts', authorization, getAllAccounts)
application.get('/account-info', authorization, getAccountInfo)
application.post('/register', accountRegister)
application.post('/login', login)
application.post('/account', authorization, updateAccountInfo)
application.delete('/account',authorization, deleteAccount)
application.post('/accounts',authorization, filterByName)
//Missing functions: filter
//deployment to the default region US
exports.AyPiAI = functions.https.onRequest(application)