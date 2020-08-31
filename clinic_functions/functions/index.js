const express = require('express')
const application = express()
const functions = require('firebase-functions')

//get all the necessary functions
const { accountRegister, login,updateAccountInfo, getAllAccounts,getAccountInfo, deleteAccount, doctorRegister,managerRegister} = require('./main/account')
const { getAllBookings, createBooking, getBookingHistory, getBookingDetail, deleteBooking,updateAppointmentInfo } = require('./service/booking')
const { getAllDoctors, addADoctor, deleteDoctor, viewAppointment} = require('./object/doctor')
const { authorization} = require('./main/authorization')
const { assignBooking } = require('./object/manager')

application.post('/manager-register',managerRegister)
application.put('/Booking/Assign/:bId',authorization,assignBooking)

application.post('/doctor-register',doctorRegister)
application.get('/Doctors', getAllDoctors)
application.post('/Doctor', authorization, addADoctor)
application.delete('/Doctors/:dId',authorization, deleteDoctor)
application.get('/Bookings',authorization,viewAppointment)

application.post('/Booking', authorization, createBooking)
application.get('/Booking/:bId',authorization, getBookingDetail)
application.get('/All-bookings', authorization, getAllBookings)
application.get('/Booking-history', authorization, getBookingHistory)
application.delete('/Booking/:bId', authorization, deleteBooking)
application.put('/Booking/:bId',authorization,updateAppointmentInfo)

application.get('/All-accounts', authorization, getAllAccounts)
application.get('/account-info', authorization, getAccountInfo)
application.post('/register', accountRegister)
application.post('/login', login)
application.put('/account', authorization, updateAccountInfo)
application.delete('/account',authorization, deleteAccount)

//deployment to the default region US
exports.AyPiAI = functions.https.onRequest(application)