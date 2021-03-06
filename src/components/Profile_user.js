// imports
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import './Profile_user.css'
import { Divider } from '@mui/material'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import Axios from 'axios'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function Profile_user(props) {
  const [name, setname] = useState('VolunTutor Cloud')
  const [phone, setphone] = useState('0912345678')
  const [email, setemail] = useState('vc@gmail.com')
  const [gender, setgender] = useState('other')
  const [birthday, setbirthday] = useState('20040101')
  const [grade, setgrade] = useState('11th')
  const [school, setschool] = useState('Wego Private High School')
  const [preferredsubject, setpreferredsubject] = useState('Math')
  const [studentage, setstudentage] = useState('3th')
  const [studentgender, setstudentgender] = useState('No preference')
  const [studentpers, setstudentpers] = useState('outgoing')
  const [bio, setbio] = useState('For Better Unity, Help Your Community ')
  const [about, setabout] = useState('Join Voluntutor Cloud!')
  const [hasSetData, setHasSetData] = useState(false)
  const [curVolProg, setCurVolProg] = useState('')
  const [errormessage, seterrormessage] = useState('')
  const [contacterror, setcontacterror] = useState('')
  const [personerror, setpersonerror] = useState('')
  const [prefererror, setprefererror] = useState('')
  const [bioerror, setbioerror] = useState('')
  const [abouterror, setabouterror] = useState('')
  const [readonlycontact, setreadcontact] = useState('disabled')
  const [readonlypersoninfo, setreadpersoninfo] = useState('disabled')
  const [readonlyprefer, setreadprefer] = useState('disabled')
  const [readonlybio, setreadbio] = useState('disabled')
  const [readonlyabout, setreadabout] = useState('disabled')
  const [click, setClick] = useState(false)
  const [contactclick, setcontactclick] = useState(false)
  const [personinfoclick, setpersoninfoclick] = useState(false)
  const [preferclick, setpreferclick] = useState(false)
  const [bioclick, setbioclick] = useState(false)
  const [aboutclick, setaboutclick] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [googlemeetlink, setGooglemeetlink] = useState('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(0)
  const [contactstyle, setcontactstyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [persostyle, setpersostyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [prefstyle, setprefstyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [biostyle, setbiostyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [aboutstyle, setaboutstyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const navigate = useNavigate()
  let username = ''

  // titles
  let b = ['Please enter a valid email.', '??????????????????Email']
  let c = ['Please fill in the blanks.', '?????????????????????']
  let e = ['Enter Your Name', '?????????????????????']
  let f = ['Contact Information', '????????????']
  let g = ['Phone: ', '???????????????']
  let h = ['Enter Phone number', '?????????????????????']
  let i = ['Email: ', 'Email?????????']
  let hdf = ['Enter Email', '?????????Email??????']
  let j = ['Personal Information', '????????????']
  let k = ['Gender: ', '?????????']
  let l = ['Female/Male/Others', '???/???/??????']
  let m = ['Birthday: ', '?????????']
  let n = ['Format: 2004/01/01', '?????????2004/01/01']
  let o = ['Grade: ', '?????????']
  let p = ['9th/10th/11th', '???/???/??????']
  let q = ['School: ', '?????????']
  let r = ['Enter school', '????????????']
  let s = ['Preferences', '??????']
  let t = ['Subjects: ', '?????????']
  let u = ['ex: Chinese/Math...', '????????????/???...']
  let v = ['Grade: ', '?????????']
  let w = ['ex: 1th/2th', '????????????/???...']
  let x = ['Gender: ', '?????????']
  let y = ['Female/Male/No pref', '???/???/?????????']
  let z = ['Character: ', '?????????']
  let ab = ['Enter personality', '????????????']
  let bc = ['Bio', '??????']
  let cd = ['Add your bio here!', '?????????????????????']
  let de = ['About me', '?????????']
  let ef = ['Tell us more about you!', '???????????????????????????']
  let fg = ['Language Setting', '????????????']
  let gh = ['Privacy & Security', '?????????????????????']
  let hi = ['Change Password', '????????????']
  let ij = ['Log Out', '??????']
  let jk = [
    'Please contact the administrator to change the password.',
    '????????????????????????????????????',
  ]
  let no = ['You are now enrolled in: ', '???????????????????????????']
  let op = [' volunteering program', ' ????????????']

  // google meet changing for future uses
  let kl = [
    'Make sure the Google Meet Link is set up with your PERSONAL account, not school account. If your link is incorrect, update the correct link down below.',
    '???????????????Google Meet??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
  ]
  let lm = ['Save', '??????']
  let mn = [
    'The following Google Meet Link is the link you provided during registration.',
    '??????????????????????????????????????????Google Meet ?????????',
  ]

  // dialog
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
  const handleClose = () => {
    setOpen(false)
  }

  //functions
  const validateEmail = (e) => {
    var email = e.target.value
    if (!validator.isEmail(email)) {
      setEmailError(b[status])
    } else {
      setEmailError('')
    }
  }
  const handleclick_contact = () => {
    console.log(contactclick)
    if (phone == '' || email == '') {
      setcontacterror(c[status])
    } else {
      console.log('cc')
      setcontacterror('')
      setcontactclick(!contactclick)
      setcontactstyle(<BiEdit />)
      if (!contactclick) {
        setreadcontact('')
        setcontactstyle(<BsCheckLg />)
      } else {
        setreadcontact('disabled')
      }
    }

    Axios.post('https://voluntutorcloud-server.herokuapp.com/updatePhone', {
      username: name,
      phone: phone,
    }).then((response) => {
      console.log(response)
    })
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateEmail', {
      username: name,
      email: email,
    }).then((response) => {
      console.log(response)
    })
  }

  const handleclick_pers = () => {
    console.log('dd')
    if (gender == '' || birthday == '' || grade == '' || school == '') {
      setpersonerror(c[status])
    } else {
      setpersonerror('')
      setpersoninfoclick(!personinfoclick)
      setpersostyle(<BiEdit />)
      if (!personinfoclick) {
        setreadpersoninfo('')
        setpersostyle(<BsCheckLg />)
      } else {
        setreadpersoninfo('disabled')
      }
    }

    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateGender', {
      username: name,
      gender: gender,
    }).then((response) => {
      console.log(response)
    })
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBirthday', {
      username: name,
      birthday: birthday,
    }).then((response) => {
      console.log(response)
    })
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateGrade', {
      username: name,
      grade: grade,
    }).then((response) => {
      console.log(response)
    })
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateSchoolname',
      {
        username: name,
        schoolname: school,
      },
    ).then((response) => {
      console.log(response)
    })
  }

  const handleclick_pref = () => {
    setprefererror('')
    setpreferclick(!preferclick)
    setprefstyle(<BiEdit />)
    if (!preferclick) {
      setreadprefer('')
      setprefstyle(<BsCheckLg />)
    } else {
      setreadprefer('disabled')
    }

    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updatePreferredSubjects',
      {
        username: name,
        preferredSubjects: preferredsubject,
      },
    ).then((response) => {
      console.log(response)
    })
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateTargetStuAge',
      {
        username: name,
        targetStuAge: studentage,
      },
    ).then((response) => {
      console.log(response)
    })
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateTargetStuGen',
      {
        username: name,
        targetStuGen: studentgender,
      },
    ).then((response) => {
      console.log(response)
    })
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/updateTargetStuPerso',
      {
        username: name,
        targetStuPerso: studentpers,
      },
    ).then((response) => {
      console.log(response)
    })
  }

  const handleclick_bio = () => {
    setbioerror('')
    setbioclick(!bioclick)
    setbiostyle(<BiEdit />)
    if (!bioclick) {
      setreadbio('')
      setbiostyle(<BsCheckLg />)
    } else {
      setreadbio('disabled')
    }
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBio', {
      username: name,
      bio: bio,
    }).then((response) => {
      console.log(response)
    })
  }

  const handleclick_about = () => {
    setabouterror('')
    setaboutclick(!aboutclick)
    setaboutstyle(<BiEdit />)
    if (!aboutclick) {
      setreadabout('')
      setaboutstyle(<BsCheckLg />)
    } else {
      setreadabout('disabled')
    }

    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateAbout', {
      username: name,
      about: about,
    }).then((response) => {
      console.log(response)
    })
  }

  const logout = () => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/logout').then(
      (response) => {
        console.log(response)
        navigate('/');
      },
    )
  }

  const changeLang = (lang) => {
    console.log(name)
    console.log(lang)
    Axios.post('https://voluntutorcloud-server.herokuapp.com/setLang', {
      username: name,
      lang: lang,
    }).then((response) => {
      console.log('set language to' + response)
    })
  }

  useEffect(() => {
    console.log(props.profile)
    console.log(hasSetData)
    if (!hasSetData) {
      if (props.profile) {
        setname(props.profile.username)
        setphone(props.profile.phone)
        setemail(props.profile.email)
        setgender(props.profile.gender)
        setbirthday(props.profile.birthday)
        setgrade(props.profile.grade)
        setschool(props.profile.schoolname)
        setpreferredsubject(props.profile.preferredSubjects)
        setstudentage(props.profile.targetStuAge)
        setstudentgender(props.profile.targetStuGen)
        setstudentpers(props.profile.targetStuPerso)
        setbio(props.profile.bio)
        setabout(props.profile.about)
        setGooglemeetlink(props.profile.googlemeetlink)
        setCurVolProg(props.profile.curvolprog)
        if (props.profile.lang == 'chinese') setStatus(1)
        else setStatus(0)
      } else {
        console.log('props failed')
        Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
          (response) => {
            console.log(props.profile)
            setname(response.data.user[0].username)
            setphone(response.data.user[0].phone)
            setemail(response.data.user[0].email)
            setgender(response.data.user[0].gender)
            setbirthday(response.data.user[0].birthday)
            setgrade(response.data.user[0].grade)
            setschool(response.data.user[0].schoolname)
            setpreferredsubject(response.data.user[0].preferredSubjects)
            setstudentage(response.data.user[0].targetStuAge)
            setstudentgender(response.data.user[0].targetStuGen)
            setstudentpers(response.data.user[0].targetStuPerso)
            setbio(response.data.user[0].bio)
            setabout(response.data.user[0].about)
            setGooglemeetlink(response.data.user[0].googlemeetlink)
            setCurVolProg(response.data.user[0].curvolprog)
            if (response.data.user[0].lang == 'chinese') setStatus(1)
            else setStatus(0)
          },
        )
      }
    }
  }, [])

  return (
    <div className="frame">
      <div id="dialog_reg_wrap">
        <BootstrapDialog
          onClose={handleClose}
          id="dialog_registered"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div id="prof_registeredsucc">{jk[status]}</div>
        </BootstrapDialog>
      </div>
      <div className="background">
        <div className="profile">
          <div className="imageprofile">
            <FaUser className="prof_icon_main" />
          </div>
          <div className="nameprof">
            <input
              className={click ? 'edity' : 'editn'}
              type="text"
              placeholder={e[status]}
              disabled="disabled"
              value={name}
              onChange={(e) => {
                setname(e.target.value)
              }}
            />
          </div>

          <div class="warning_prof">{errormessage}</div>
        </div>
        <div className="currentprogram">
          <BsFillEmojiSmileFill className="currentprogramicon"></BsFillEmojiSmileFill>
          <div className="currentprogramcontent">
            {no[status]}
            {curVolProg}
            {op[status]}
          </div>
        </div>
        <div className="containerprofile">
          <div className="left">
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{f[status]}</div>
                <div className="edit" onClick={handleclick_contact}>
                  {contactstyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div class="warning_prof">{contacterror}</div>
                <div className="wrapprof">
                  <div className="textbef">{g[status]} </div>
                  <input
                    id="phone_input"
                    className={contactclick ? 'edittabley' : 'edittablen'}
                    type="tel"
                    placeholder={h[status]}
                    disabled={readonlycontact}
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      setphone(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{i[status]}</div>
                  <input
                    className={contactclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={hdf[status]}
                    disabled={readonlycontact}
                    value={email}
                    onChange={(e) => {
                      validateEmail(e)
                      setemail(e.target.value)
                    }}
                  />
                </div>
                <div class="emailwarning_prof">{emailError}</div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{j[status]}</div>
                <div className="edit" onClick={handleclick_pers}>
                  {persostyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div class="warning_prof">{personerror}</div>
                <div className="wrapprof">
                  <div className="textbef">{k[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={l[status]}
                    disabled={readonlypersoninfo}
                    value={gender}
                    maxLength={15}
                    onChange={(e) => {
                      setgender(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{m[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="tel"
                    placeholder={n[status]}
                    disabled={readonlypersoninfo}
                    value={birthday}
                    maxLength={20}
                    onChange={(e) => {
                      console.log(birthday)
                      setbirthday(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{o[status]}</div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={p[status]}
                    disabled={readonlypersoninfo}
                    value={grade}
                    maxLength={4}
                    onChange={(e) => {
                      setgrade(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{q[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={r[status]}
                    disabled={readonlypersoninfo}
                    value={school}
                    onChange={(e) => {
                      setschool(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{s[status]}</div>
                <div className="edit" onClick={handleclick_pref}>
                  {prefstyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div class="warning_prof">{prefererror}</div>
                <div className="wrapprof">
                  <div className="textbef">{t[status]} </div>
                  <input
                    className={preferclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={u[status]}
                    disabled={readonlyprefer}
                    value={preferredsubject}
                    onChange={(e) => {
                      setpreferredsubject(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{v[status]} </div>
                  <input
                    className={preferclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={w[status]}
                    disabled={readonlyprefer}
                    value={studentage}
                    onChange={(e) => {
                      setstudentage(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{x[status]}</div>
                  <input
                    className={preferclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={y[status]}
                    disabled={readonlyprefer}
                    value={studentgender}
                    maxLength={15}
                    onChange={(e) => {
                      setstudentgender(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{z[status]} </div>
                  <input
                    className={preferclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={ab[status]}
                    disabled={readonlyprefer}
                    value={studentpers}
                    maxLength={15}
                    onChange={(e) => {
                      setstudentpers(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="contact" id="bio_contact">
              <div className="titleprofile">
                <div className="titlepro">{bc[status]}</div>
                <div className="edit" onClick={handleclick_bio}>
                  {biostyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div class="warning_prof_bio">{bioerror}</div>

                <div className="wrapprof">
                  <textarea
                    id="bio_enter"
                    className={bioclick ? 'texty' : 'textn'}
                    type="text"
                    placeholder={cd[status]}
                    disabled={readonlybio}
                    value={bio}
                    onChange={(e) => {
                      setbio(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile" id="aboutmetitle">
                <div className="titlepro">{de[status]}</div>
                <div className="edit" onClick={handleclick_about}>
                  {aboutstyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information" id="bioandhobby">
                <div class="warning_prof_bio">{abouterror}</div>

                <div className="wrapprof">
                  <textarea
                    className={aboutclick ? 'texty' : 'textn'}
                    type="text"
                    placeholder={ef[status]}
                    disabled={readonlyabout}
                    value={about}
                    onChange={(e) => {
                      setabout(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{fg[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="language">
                  <div
                    className="lang"
                    onClick={() => {
                      setStatus(1)
                      changeLang('chinese')
                    }}
                  >
                    ??????
                  </div>
                  <div className="slash">/</div>
                  <div
                    className="lang"
                    onClick={() => {
                      setStatus(0)
                      changeLang('english')
                    }}
                  >
                    English
                  </div>
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{gh[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="containpro">
                  <div className="edittable">{hi[status]}</div>
                  <AiFillLock
                    className="lock"
                    onClick={() => {
                      setOpen(true)
                    }}
                  ></AiFillLock>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-prof" onClick={logout}>
          {ij[status]}
        </div>
      </div>
    </div>
  )
}
export default Profile_user
