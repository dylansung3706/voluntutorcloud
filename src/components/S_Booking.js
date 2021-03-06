import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import Grid from '@mui/material/Grid'
import Loading from './Loading'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import { FaUser } from 'react-icons/fa'
import DialogTitle from '@mui/material/DialogTitle'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

let program = 0

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}
export default function S_Booking() {
  const [cancelopen, setcancelopen] = useState(false)
  const [confirmopen, setconfirmopen] = useState(false)
  const [cancel, setcancel] = useState(true)
  const navigate = useNavigate()

  const opengoogle = () => {
    console.log(googlemeetlink)
    window.location.replace(googlemeetlink)
  }

  const cancelmeeting = (booking) => {
    console.log('cancelled')
    setcancelopen(true)
    console.log(cancelopen)
    console.log(booking)
    setPendingBookingInfo(pendingBookingInfo.slice(1, pendingBookingInfoLen))
    setPendingBookingInfoLen(pendingBookingInfoLen - 1)
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateBookingStatus',
      {
        studentname: studentnameFU,
        username: teacherusernameFU,
        status: 'cancelled',
        date: booking.date,
        time: booking.time,
        duration: booking.duration,
      },
    ).then((response) => {
      console.log(response)
    })
    let content = studentnameFU + ' rejected your booking request'
    console.log(content, content)
    Axios.post('http://voluntutorcloud-server.herokuapp.com/addNotif', {
      username: teacherusernameFU,
      type: '/book',
      content: content,
      isnew: true,
    }).then((response) => {
      console.log(response)
    })
    setcancel(false)
  }

  const confirmmeeting = (booking) => {
    console.log('confirmed')
    setconfirmopen(true)
    console.log('whethe true')
    console.log(confirmopen)
    console.log(booking)
    setPendingBookingInfo(pendingBookingInfo.slice(1, pendingBookingInfoLen))
    setPendingBookingInfoLen(pendingBookingInfoLen - 1)
    setBookingInfo((bookingInfo) => [...bookingInfo, pendingBookingInfo[0]])
    setBookingInfoLen(bookingInfoLen + 1)
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateBookingStatus',
      {
        studentname: studentnameFU,
        username: teacherusernameFU,
        status: 'confirmed',
        date: booking.date,
        time: booking.time,
        duration: booking.duration,
      },
    ).then((response) => {
      console.log(response)
    })
    let content = studentnameFU + ' confirmed your booking request'
    Axios.post('https://voluntutorcloud-server.herokuapp.com/addNotif', {
      username: teacherusernameFU,
      type: '/book',
      title: 'Booking',
      content: content,
      isnew: true,
    }).then((response) => {
      console.log(response)
    })
    setcancel(false)
  }

  const [status, setStatus] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [bookingInfo, setBookingInfo] = useState([]) /*{}*/
  const [pendingBookingInfo, setPendingBookingInfo] = useState([]) /*{}*/
  const [bookingInfoLen, setBookingInfoLen] = useState(0)
  const [pendingBookingInfoLen, setPendingBookingInfoLen] = useState(0)
  const [haveSetStatus, setHaveSetStatus] = useState(false)

  let username = '',
    studentname = '',
    teacherusername = ''
  const [teacherusernameFU, setTeacherusernameFU] = useState('')
  const [studentnameFU, setStudentnameFU] = useState('')

  const [teachername, setTeachername] = useState()

  const [googlemeetlink, setGoogleMeetLink] = useState('')
  const [teacherRealname, setTeacherRealname] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    if (isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
          setRole(response.data.user[0].role)
          studentname =
            response.data.user[0].lastname + response.data.user[0].firstname
          setStudentnameFU(studentname)
          return Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getTeacher',
            {
              studentname: studentname,
            },
          )
        }).then((response) => {
          console.log('response from findTeacher:')
          console.log(response)
          teacherusername = response.data[0].username
          setTeacherusernameFU(teacherusername)
          setTeachername(teacherusername)
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getBooking',
            {
              studentname: studentname,
              username: teacherusername,
              status: 'pending',
            },
          ).then((response) => {
            console.log(response)
            setPendingBookingInfo(response.data)
            setPendingBookingInfoLen(response.data.length)
          })
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getBooking',
            {
              studentname: studentname,
              username: teacherusername,
              status: 'confirmed',
            },
          ).then((response) => {
            console.log(response)
            setBookingInfo(response.data)
            setBookingInfoLen(response.data.length)
          })
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getUserProfile',
            {
              username: teacherusername, // bug
            },
          ).then((response) => {
            console.log(response)
            setGoogleMeetLink(response.data[0].googlemeetlink)
            setTeacherRealname(
              response.data[0].firstname + ' ' + response.data[0].lastname,
            )
          })
          setLoading(false)
        })
    }
  })
  console.log('booking info length:::')
  console.log(bookingInfoLen)
  /*
{id: 534, username: 'admin_stu', password: 'admin', role: 'student', firstname: 'admin', ???}
  about: "No Pref"
  bio: "No Pref"
  birthday: "0000-00-00"
  email: "admin@gmail.com"
  firstname: "admin"
  gender: "No Pref"
  googlemeetlink: "No Pref"
  grade: "No Pref"
  id: 534
  lang: "english"
  lastname: "admin"
  password: "admin"
  phone: "No Pref"
  preferredSubjects: "No Pref"
  role: "student"
  schoolname: "No Pref"
  targetStuAge: 0
  targetStuGen: "No Pref"
  targetStuPerso: "No Pref"
  username: "admin_stu"
  [[Prototype]]: Object 
*/
  // meetlinktemp: https://meet.google.com/ddk-cuae-bnn

  let a = ['Upcoming Meetings', '?????????????????????']
  let c = [
    // "Oops, you are not paired with a teacher yet!",
    'Looking forward to the first lesson!',
    '???, ???????????????????????????????????????',
    // '???????????????????????????!'
  ]
  let b = ['We will assign you a teacher soon!', '??????????????????????????????????????????']
  // let teachername = 'Ruby'
  let date = '2022/5/12'
  let time = '18:00 ~ 19:00'
  // let timeduration = '1.5 hr'
  let fulltime = date + ' ' + time
  let j = ['Meeting Canceled', '???????????????']
  let k = ['Meeting Booked', '???????????????']
  let l = [
    'Oops, you are not paired with a teacher yet!',
    '???, ???????????????????????????????????????',
  ]
  let m = ['We will assign you a teacher soon!', '??????????????????????????????????????????']
  let n = ['Join', '????????????']
  let o = ['Bookings', '????????????']
  let p = ['Cancel', '??????']
  let q = ['Confirm', '??????']
  let r = [
    'You have not received any bookings :)',
    '????????????????????????????????????????????? :)',
  ]
  let space = ' '
  let s = [
    'Please return to homepage to update the information',
    '??????????????????????????????',
  ]
  // ??????true?????????????????????????????????
  if (isLoading) {
    return <Loading />
  } else {
    console.log('bookingInfo:')
    console.log(bookingInfo)
    console.log(bookingInfoLen)
    console.log('pendingBookingInfo:')
    console.log(pendingBookingInfo)
    console.log(pendingBookingInfoLen)

    if (teachername == '') {
      return (
        <div className="nokid">
          <div className="noStudentFont">{c[status]}</div>
          <div className="noStudentFont2">{b[status]}</div>
        </div>
      )
    }
    if (bookingInfoLen == 0 && pendingBookingInfoLen == 0) {
      return (
        <div className="outestcontainerbook">
          <div className="bookingwraping">
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitleall">{a[status]}</div>

              <div className="bookingoutestwrap">
                <div className="bookingrow">
                  <div className="bookingwrapsecond">
                    <div className="bookingwordswrapfirst">
                      <div className="bookingimageprog">
                        <FaUser className="bookingprog_avatar" />
                      </div>
                      <div className="bookingrequesttotal">
                        <div className="bookingrequestsub">
                          {teacherRealname}
                        </div>
                        <div className="bookinrequesttime"></div>
                      </div>
                      <div className="bookingrequesttotaltime">
                        <div className="detailtimeforupcomings"></div>
                      </div>
                    </div>
                    <div className="bookingbuttonswrapping">
                      <div className="buttonbookingcheck" onClick={opengoogle}>
                        {n[status]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Divider className="lineforbooking"></Divider> */}
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitlebooking">{o[status]}</div>
              <div className="bookingwrappbottom">
                <div className="bookingrow">
                  <div className="bookingwrapsecond">
                    <div className="bookingrequesttotaltimewarning">
                      <div className="detailtimeerrornobook">{r[status]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (bookingInfoLen != 0 && pendingBookingInfoLen == 0) {
      return (
        <div className="outestcontainerbook">
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={cancelopen}
            >
              <div className="bookingcancelleddiatitle">{j[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={confirmopen}
            >
              <div className="bookingcancelleddiatitle">{k[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div className="bookingwraping">
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitleall">{a[status]}</div>

              <div className="bookingoutestwrap">
                {bookingInfo.map((e) => {
                  return (
                    <div className="bookingrow">
                      <div className="bookingwrapsecond">
                        <div className="bookingwordswrapfirst">
                          <div className="bookingimageprog">
                            <FaUser className="bookingprog_avatar" />
                          </div>
                          <div className="bookingrequesttotal">
                            <div className="bookingrequestsub">
                              {teacherRealname}
                            </div>
                            <div className="bookinrequesttime">
                              {e.duration} hr
                            </div>
                          </div>
                          <div className="bookingrequesttotaltime">
                            <div className="detailtimeforupcomings">
                              {e.date} {space} {e.time}
                            </div>
                          </div>
                        </div>
                        <div className="bookingbuttonswrapping">
                          <div
                            className="buttonbookingcheck"
                            onClick={opengoogle}
                          >
                            {n[status]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* <Divider className="lineforbooking"></Divider> */}
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitlebooking">{o[status]}</div>

              <div
                className="bookingwrappbottom"
                style={{ display: cancel ? 'block' : 'none' }}
              >
                <div className="bookingrow">
                  <div className="bookingwrapsecond">
                    <div className="bookingrequesttotaltimewarning">
                      <div className="detailtimeerrornobook">{r[status]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (bookingInfoLen == 0 && pendingBookingInfoLen != 0) {
      return (
        <div className="outestcontainerbook">
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={cancelopen}
            >
              <div className="bookingcancelleddiatitle">{j[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={confirmopen}
            >
              <div className="bookingcancelleddiatitle">{k[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div className="bookingwraping">
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitleall">{a[status]}</div>

              <div className="bookingoutestwrap">
                <div className="bookingrow">
                  <div className="bookingwrapsecond">
                    <div className="bookingwordswrapfirst">
                      <div className="bookingimageprog">
                        <FaUser className="bookingprog_avatar" />
                      </div>
                      <div className="bookingrequesttotal">
                        <div className="bookingrequestsub">
                          {teacherRealname}
                        </div>
                        <div className="bookinrequesttime"></div>
                      </div>
                      <div className="bookingrequesttotaltime">
                        <div className="detailtimeforupcomings"></div>
                      </div>
                    </div>
                    <div className="bookingbuttonswrapping">
                      <div className="buttonbookingcheck" onClick={opengoogle}>
                        {n[status]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Divider className="lineforbooking"></Divider> */}
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitlebooking">{o[status]}</div>

              <div
                className="bookingwrappbottom"
                style={{ display: cancel ? 'block' : 'none' }}
              >
                {pendingBookingInfo.map((e) => {
                  return (
                    <div className="bookingrow">
                      <div className="bookingwrapsecond">
                        <div className="bookingwordswrapfirst">
                          <div className="bookingimageprog">
                            <FaUser className="bookingprog_avatar" />
                          </div>
                          <div className="bookingrequesttotal">
                            <div className="bookingrequestsub">
                              {teacherRealname}
                            </div>
                            <div className="bookinrequesttime">
                              {e.duration} hr
                            </div>
                          </div>
                          <div className="bookingrequesttotaltime">
                            <div className="detailtimeforbook">
                              {e.date} {space} {e.time}
                            </div>
                          </div>
                        </div>
                        <div className="bookingbuttonswrapping">
                          <div
                            className="buttonbookingcheck"
                            onClick={() => cancelmeeting(e)}
                          >
                            {/* this is where meeting is cancelled */}
                            {p[status]}
                          </div>
                          <div
                            className="buttonbookingcheck"
                            onClick={() => confirmmeeting(e)}
                          >
                            {/* this is where meeting is confirmed */}
                            {q[status]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="outestcontainerbook">
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={cancelopen}
            >
              <div className="bookingcancelleddiatitle">{j[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={confirmopen}
            >
              <div className="bookingcancelleddiatitle">{k[status]}</div>
              <div
                className="navigateheaderdia"
                onClick={() => {
                  navigate('/')
                }}
              >
                {s[status]}
              </div>
            </BootstrapDialog>
          </div>
          <div className="bookingwraping">
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitleall">{a[status]}</div>

              <div className="bookingoutestwrap">
                {bookingInfo.map((e) => {
                  return (
                    <div className="bookingrow">
                      <div className="bookingwrapsecond">
                        <div className="bookingwordswrapfirst">
                          <div className="bookingimageprog">
                            <FaUser className="bookingprog_avatar" />
                          </div>
                          <div className="bookingrequesttotal">
                            <div className="bookingrequestsub">
                              {teacherRealname}
                            </div>
                            <div className="bookinrequesttime">
                              {e.duration} hr
                            </div>
                          </div>
                          <div className="bookingrequesttotaltime">
                            <div className="detailtimeforupcomings">
                              {e.date} {space} {e.time}
                            </div>
                          </div>
                        </div>
                        <div className="bookingbuttonswrapping">
                          <div
                            className="buttonbookingcheck"
                            onClick={opengoogle}
                          >
                            {n[status]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* <Divider className="lineforbooking"></Divider> */}
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitlebooking">{o[status]}</div>

              <div
                className="bookingwrappbottom"
                style={{ display: cancel ? 'block' : 'none' }}
              >
                {pendingBookingInfo.map((e) => {
                  return (
                    <div className="bookingrow">
                      <div className="bookingwrapsecond">
                        <div className="bookingwordswrapfirst">
                          <div className="bookingimageprog">
                            <FaUser className="bookingprog_avatar" />
                          </div>
                          <div className="bookingrequesttotal">
                            <div className="bookingrequestsub">
                              {teacherRealname}
                            </div>
                            <div className="bookinrequesttime">
                              {e.duration} hr
                            </div>
                          </div>
                          <div className="bookingrequesttotaltime">
                            <div className="detailtimeforbook">
                              {e.date} {space} {e.time}
                            </div>
                          </div>
                        </div>
                        <div className="bookingbuttonswrapping">
                          <div
                            className="buttonbookingcheck"
                            onClick={() => cancelmeeting(e)}
                          >
                            {/* this is where meeting is cancelled */}
                            {p[status]}
                          </div>
                          <div
                            className="buttonbookingcheck"
                            onClick={() => confirmmeeting(e)}
                          >
                            {/* this is where meeting is confirmed */}
                            {q[status]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
