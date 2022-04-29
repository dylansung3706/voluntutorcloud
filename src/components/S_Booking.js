import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import Grid from '@mui/material/Grid'
import Loading from './Loading'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
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

const opengoogle = () => {
  // window.location.replace(bookingInfo["0"]["googlemeetlink"]);
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}
export default function S_Booking() {
  const [cancelopen, setcancelopen] = useState(false)
  const [confirmopen, setconfirmopen] = useState(false)
  const [cancel, setcancel] = useState(true)

  const handlecancelclose = () => {
    setcancelopen(false)
  }

  const cancelmeeting = (booking) => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBookingStatus', {
      studentname: studentname,
      username: teacherusername,
      status: "cancelled"
    }).then((response) => {
      console.log(response);
    });
    bkg = booking
    setcancelopen(true)
    setcancel(false)
  }

  const handleconfirmopen = () => {
    setconfirmopen(false)
  }

  const confirmmeeting = (booking) => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBookingStatus', {
      studentname: studentname,
      username: teacherusername,
      status: "confirmed"
    }).then((response) => {
      console.log(response);
    });
    bkg = booking;
    setconfirmopen(true)
    setcancel(false)
  }

  const [status, setStatus] = useState(0)
  const [isLoading1, setLoading1] = useState(true)
  const [isLoading2, setLoading2] = useState(true)
  const [contactInfo, setContactInfo] = useState([]);
  const [pendingBookingInfo, setPendingBookingInfo] = useState([]);
  const [pendingBookingInfoLen, setPendingBookingInfoLen] = useState([]);
  const [confirmedBookingInfo, setConfirmedBookingInfo] = useState([]);
  const [confirmedBookingInfoLen, setConfirmedBookingInfoLen] = useState([]);
  const [haveSetStatus, setHaveSetStatus] = useState(false);

  let username = '', studentname = '', teacherusername = "";
  const [teachername, setTeachername] = useState();

  let bkg = 0;

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        username = response.data.user[0].username
        if(haveSetStatus == false) {
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
            username: username,
          }).then((response) => {
            console.log(response.data)
            if (response.data == 'chinese') setStatus(1)
            else setStatus(0)
            console.log(status)
            setLoading1(false)
            setHaveSetStatus(true);
          })
        }
        if(isLoading2) {
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
            username: username,
          }).then((response) => {
            console.log(response.data[0])
            studentname = response.data[0].lastname + response.data[0].firstname;
            console.log("studentname:");
            console.log(studentname);
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getTeacher', {
              studentname: studentname,
            }).then((response) => {
              console.log("response from findTeacher:");
              console.log(response);
              teacherusername = response.data[0].username;
              console.log("teacherusername:");
              console.log(teacherusername);
              setTeachername(teacherusername);
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
                studentname: studentname,
                username: teacherusername,
                status: "pending"
              }).then((response) => {
                console.log(response);
                setPendingBookingInfo(response.data);
                setPendingBookingInfoLen(response.data.length);
              })
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
                studentname: studentname,
                username: teacherusername,
                status: "confirmed"
              }).then((response) => {
                console.log(response);
                setConfirmedBookingInfo(response.data);
                setConfirmedBookingInfoLen(response.data.length);
              })
              setLoading2(false)
            })
          })
        }
      },
    )
  })

  /*
{id: 534, username: 'admin_stu', password: 'admin', role: 'student', firstname: 'admin', …}
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

  let a = ['Upcoming Meetings', '即將來臨的會議']
  // let teachername = 'Ruby'
  let date = '2022/5/12'
  let time = '18:00 ~ 19:00'
  // let timeduration = '1.5 hr'
  let fulltime = date+" "+time;
  let j = ['Meeting Canceled', '會議已取消']
  let k = ['Meeting Booked', '會議已預約']
  let l = [
    "Oops, you are not paired with a teacher yet!",
    '噢, 目前您還未和老師成功配對！',
  ]
  let m = ['We will assign you a teacher soon!', '我們會盡快配對一位老師給您！']
  let n = ['Join', '加入會議']
  let o = ['Bookings', '預約會議']
  let p = ['Cancel', '拒絕']
  let q = ['Confirm', '確認']
  // 這裡true的條件改成是否有學生喔
  if (isLoading1 || isLoading2){
    return(
      <Loading/>
    )
  } else {
    if(pendingBookingInfoLen == 0 && confirmedBookingInfoLen == 0) {
      return (
        <div className="nokid">
          <div className="noStudentFont">{l[status]}</div>
          <div className="noStudentFont2">{m[status]}</div>
        </div>
      )
    } else {
      return (
        <div className="outestcontainerbook">
          <div id="dialogcontainer">
            <BootstrapDialog
              onClose={handlecancelclose}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={cancelopen}
            >
              <div className="bookingprogramdia">{j[status]}</div>
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              onClose={handleconfirmopen}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={confirmopen}
            >
              <div className="bookingconfirmheaders">{k[status]}</div>
              <div className="bookingconfirmcontent">
                {bkg["date"]} {bkg["time"]} {bkg["duration"]} 
              </div>
            </BootstrapDialog>
          </div>
          <div className="bookingwraping">
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitleall">{a[status]}</div>
              {confirmedBookingInfo.map((booking) => {
                return (
                  <div className="bookingoutestwrap">
                    <div className="bookingrow">
                      <div className="bookingwrapsecond">
                        <div className="bookingwordswrapfirst">
                          <div className="bookingimageprog">
                            <FaUser className="bookingprog_avatar" />
                          </div>
                          <div className="bookingrequesttotal">
                            <div className="bookingrequestsub">{booking["username"]}</div>
                            <div className="bookinrequesttime">{booking["duration"]} hr</div>
                          </div>
                          <div className="bookingrequesttotaltime">
                            <div className="detailtimeforupcomings">{booking["date"] + " " + booking["0"]["time"]}</div>
                          </div>
                        </div>
                        <div className="bookingbuttonswrapping">
                          <div className="buttonbookingcheck" onClick={opengoogle}>{n[status]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* <Divider className="lineforbooking"></Divider> */}
            <div className="bookingwrappinginnerfirst">
              <div className="bookingtitlebooking">{o[status]}</div>

              <div
                className="bookingwrappbottom"
                style={{ display: cancel ? 'block' : 'none' }}
              >
              {pendingBookingInfo.map((booking) => {
                <div className="bookingrow">
                  <div className="bookingwrapsecond">
                    <div className="bookingwordswrapfirst">
                      <div className="bookingimageprog">
                        <FaUser className="bookingprog_avatar" />
                      </div>
                      <div className="bookingrequesttotal">
                        <div className="bookingrequestsub">{booking["username"]}</div>
                        <div className="bookinrequesttime">{booking["duration"]} hr</div>
                      </div>
                      <div className="bookingrequesttotaltime">
                        <div className="detailtimeforbook">{booking["date"] + ' ' + booking["time"]}</div>
                      </div>
                    </div>
                    <div className="bookingbuttonswrapping">
                      <div className="buttonbookingcheck" onClick={() => cancelmeeting(booking)}>
                        {/* this is where meeting is cancelled */}
                        {p[status]}
                      </div>
                      <div
                        className="buttonbookingcheck"
                        onClick={() => confirmmeeting(booking)}
                      >
                        {/* this is where meeting is confirmed */}
                        {q[status]}
                      </div>
                    </div>
                  </div>
                </div>
              })}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
