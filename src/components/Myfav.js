import React, { useState, useEffect } from 'react'
import './Myfav.css'
import { RiHeart3Line, RiMapPin2Fill } from 'react-icons/ri'
import '../App.css'
import Loading from './Loading'
import Grid from '@mui/material/Grid'
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
import DialogTitle from '@mui/material/DialogTitle'
import { faV } from '@fortawesome/free-solid-svg-icons'

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

function Myfav() {
  const [open, setOpen] = useState(false)
  const [open_book, setBookOpen] = useState(false)
  const [check_open_book, setcheckopen] = useState(false)
  const [myfavLen, setMyfavlen] = useState([]);
  const handleClose = () => {
    setOpen(false)
  }
  const handlebookclose = () => {
    setBookOpen(false)
  }
  const handlefinalclose = () => {
    setcheckopen(false)
  }
  const [subject, setSubject] = useState('Math') // change the subject from here
  const [schoolname, setSchoolname] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const [favProgramListLen, setFavProgramListLen] = useState(0);
  const [favProgramList, setFavProgramList] = useState([]);

  let a = [
    "There's nothing in your favorite list!",
    '????????????????????????????????????????????????',
  ]
  let b = ['Go and check out some new programs!', '???????????????????????????????????????']
  let c = ['My List', '????????????']
  let d = ['Program Booked!', '????????????????????????']
  let e = [
    'Please wait for notification from the administrator.',
    '??????????????????????????????~',
  ]
  let f = ['BOOK NOW!', '???????????????']
  let g = ['Remove from list', '????????????']
  let h = ['Dates/Service hours', '??????/????????????']
  let i = ['Coordinator', '????????????']
  let j = ['Target Student', '????????????']
  let k = ['View School', '????????????']
  let l = [
    'Are you sure you want to book this program?',
    '????????????????????????????????????????????????????????????????????????',
  ]
  let m = ['Yes', '????????????']

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
        username = response.data.user[0].username;
        if (response.data.user[0].lang == 'chinese') setStatus(1)
        else setStatus(0)
        return Axios.post('https://voluntutorcloud-server.herokuapp.com/getFavList', {username: username})
      }).then((response) => {
        console.log(response.data);
        setFavProgramListLen(response.data.length);
        if (response.data.length) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].isBooked == false)
              setFavProgramList((favProgramList) => [
                ...favProgramList,
                response.data[i],
              ])
          }
        }
        setLoading(false);
      })
    }
  }, [])

  let username = ''

  const updateBookList = (program) => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response)
        if (response.data.isLoggedIn) {
          setcheckopen(true)
          return Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/updateFavListinMyFav',
            {
              username: program.username,
              program: program,
              isBooked: true,
            },
          )
        } else {
          console.log('user not logged in')
        }
    }).then((response) => {
      console.log(response)
    })
  }

  const showFavProgramList = () => {
    favProgramList.forEach((element) => console.log(element))
  }

  const deleteProgram = (program) => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/deleteFavList', {
      username: program.username,
      programId: program.programId,
    }).then((response) => {
      console.log(response)
    })
  }

  if (isLoading) {
    console.log(favProgramList);
    console.log("favProgramList null");
    return (
      <Loading></Loading>
    )
  }else{
    if(favProgramList.length == 0){
      return(
      <div id="nofav">
              <div className="noStudentFont">{a[status]}</div>
              <div className="noStudentFont2">{b[status]}</div>
      </div>)
   }else {
    return (
      <div id="fav_outcontainer">
        <h1 className="titlefav" onClick={showFavProgramList}>
          {c[status]}
        </h1>
        
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={handlebookclose}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={open_book}
          >
            <div id="bookingprogramdia">{d[status]}</div>
            <div id="bookingprogramdia_sub">{e[status]}</div>
          </BootstrapDialog>
        </div>
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={handlefinalclose}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={check_open_book}
          >
            <div id="bookingprogramdia"> {l[status]}</div>
            <div id="bookingyet" onClick={() => open_book(true)}>
              {m[status]}
            </div>
          </BootstrapDialog>
        </div>
        <div id="dialogcontainer">
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div
              id="wrap"
              style={{
                background: program.schoolpic + ' center center/cover no-repeat',
                width: '600px',
              }}
            >
              <div id="innerwrap">
                <Typography id="dialog_topic" variant="h5" component="div">
                  {program.schoolname}
                </Typography>
                <Typography
                  id="dialog_subtitle"
                  variant="subtitle2"
                  component="div"
                >
                  {program.schoolintro}
                </Typography>
                <div id="buttonwrap">
                  <Button
                    id="book"
                    size="small"
                    onClick={() => updateBookList(program)}
                  >
                    {f[status]}
                  </Button>
                  <Button
                    id="dialog_add"
                    size="small"
                    onClick={() => deleteProgram(program)}
                  >
                    <RiHeart3Line className="heart_dialog" />
                    {g[status]}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div id="lowerwrap">
                <div id="loc">
                  <div id="location_inner">
                    <RiMapPin2Fill className="loc_dialog" />
                    <div id="position">{program.address}</div>
                  </div>
                  <div id="subject">{program.subject}</div>
                </div>
                <div id="content">
                  <div id="school_content">{program.content}</div>
                  <div id="misc">
                    <div className="basicinfo" id="date_topic">
                      {h[status]}
                    </div>
                    <div className="basicinfo" id="day">
                      {program.day}
                    </div>
                    <div className="basicinfo" id="time">
                      {program.sttime}
                    </div>
                    <div className="basicinfo" id="coordinator_topic">
                      {i[status]}
                    </div>
                    <div className="basicinfo" id="phone">
                      {program.contactnum}
                    </div>
                    <div className="basicinfo" id="email">
                      {program.email}
                    </div>
                    <div className="basicinfo" id="target_topic">
                      {j[status]}
                    </div>
                    <div className="basicinfo" id="target">
                      {program.targetstudent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BootstrapDialog>
        </div>
        {/* inMap */}
        <div id="fav_gridcontainer">
          <Grid container id="fav_container" spacing={4}>
            {favProgramList.map((e) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} className="fav_column">
                  <Card id="fav_cardbox" justify="space-between">
                    <CardMedia
                      id="fav_image"
                      component="img"
                      height="200"
                      image={e.schoolpicdia}
                      alt="school pic"
                    />
                    {/* <Typography className="onhover">Learn more</Typography> */}
                    <CardContent>
                      <Typography
                        id="fav_topic"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {e.schoolname}
                      </Typography>
                      <Typography
                        id="fav_subtopic"
                        variant="body2"
                        color="text.secondary"
                      >
                        {e.address}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        id="viewschool"
                        onClick={() => {
                          program = e
                          setOpen(true)
                          // console.log(program)
                        }}
                      >
                        {k[status]}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }}
}

export default Myfav