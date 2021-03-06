// imports
import React, { useEffect, useState } from 'react'
import './Function.css'
import { Link } from 'react-router-dom'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

// dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

let program = 0

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}

function Function(props) {
  Axios.defaults.withCredentials = true

  // usestates
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(0)
  let logged = []

  // titles
  let a = ['BEGIN YOUR JOURNEY', '開始你的旅程']
  let b = ['My List', '我的最愛']
  let c = ['Appointment', '會議安排']
  let d = ['Usage', '服務時數']
  let e = ['Message', '訊息']
  let f = ['Booking', '預約會議']
  let g = ['Sign in to unlock functions!!', '登入以解鎖功能！']
  let h = ['SIGN IN', '登入']
  let i = ['BEGIN YOUR JOURNEY!!', '開始你的旅程！']

  useEffect(() => {
    if (!props.isLoggedIn) {
      console.log('not logged in')
      setIsLoggedIn(false)
      setStatus(0)
    } else {
      console.log(props)
      if (props.isLoggedIn) {
        setIsLoggedIn(props.isLoggedIn)
        if (props.lang) {
          if (props.lang == 'chinese') setStatus(1)
          else setStatus(0)
        }
      } else {
        console.log('props failed')
        Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
          (response) => {
            if (response.data.isLoggedIn) {
              if (response.data.user[0].lang == 'chinese') setStatus(1)
              else setStatus(0)
            }
            setIsLoggedIn(response.data.isLoggedIn)
          },
        )
      }
    }
  }, [])

  if (isLoggedIn) {
    logged = ['/mylist', '/appointment', '/program_usage', '/book', '/message']

    return (
      <div className="container_func">
        <div className="title_function">{a[status]}</div>
        <div className="list_function">
          <div className="temprow">
            <Link className="func_link" to={logged[0]}>
              <div className="outcont_function">
                <div className="icon_func_odd">
                  <GrFavorite className="icon_func"></GrFavorite>
                </div>
                <div className="subtitle_func">{b[status]}</div>
              </div>
            </Link>
            <Link className="func_link" to={logged[1]}>
              <div className="outcont_function">
                <div className="icon_func_even">
                  <SiGooglemeet className="icon_func"></SiGooglemeet>
                </div>
                <div className="subtitle_func">{c[status]}</div>
              </div>
            </Link>
            <Link className="func_link" to={logged[2]}>
              <div className="outcont_function">
                <div className="icon_func_odd">
                  <GrPin className="icon_func"></GrPin>
                </div>
                <div className="subtitle_func">{d[status]}</div>
              </div>
            </Link>
          </div>
          <div className="temprow">
            <Link className="func_link" to={logged[3]}>
              <div className="outcont_function">
                <div className="icon_func_even">
                  <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
                </div>
                <div className="subtitle_func">{f[status]}</div>
              </div>
            </Link>
            <Link className="func_link" to={logged[4]}>
              <div className="outcont_function">
                <div className="icon_func_odd">
                  <AiOutlineMessage className="icon_func"></AiOutlineMessage>
                </div>
                <div className="subtitle_func">{e[status]}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container_func">
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={() => {
              setOpen(false)
            }}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div id="registeredsucc">{g[status]}</div>
            <Link to="/sign-in">
              <div id="return">{h[status]}</div>
            </Link>
          </BootstrapDialog>
        </div>
        <div className="title_function">{i[status]}</div>
        <div className="list_function">
          <div className="temprow">
            <div
              className="outcont_function"
              onClick={() => {
                setOpen(true)
              }}
            >
              <div className="icon_func_odd">
                <GrFavorite className="icon_func"></GrFavorite>
              </div>
              <div className="subtitle_func">{b[status]}</div>
            </div>
            <div
              className="outcont_function"
              onClick={() => {
                setOpen(true)
              }}
            >
              <div className="icon_func_even">
                <SiGooglemeet className="icon_func"></SiGooglemeet>
              </div>
              <div className="subtitle_func">{c[status]}</div>
            </div>
            <div
              className="outcont_function"
              onClick={() => {
                setOpen(true)
              }}
            >
              <div className="icon_func_odd">
                <GrPin className="icon_func"></GrPin>
              </div>
              <div className="subtitle_func">{d[status]}</div>
            </div>
          </div>

          <div className="temprow">
            <div
              className="outcont_function"
              onClick={() => {
                setOpen(true)
              }}
            >
              <div className="icon_func_even">
                <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
              </div>
              <div className="subtitle_func">{f[status]}</div>
            </div>
            <div
              className="outcont_function"
              onClick={() => {
                setOpen(true)
              }}
            >
              <div className="icon_func_odd">
                <AiOutlineMessage className="icon_func"></AiOutlineMessage>
              </div>
              <div className="subtitle_func">{e[status]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Function
