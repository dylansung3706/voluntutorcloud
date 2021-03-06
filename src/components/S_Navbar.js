import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { S_SidebarData } from './S_SidebarData'
import { C_S_SidebarData } from './C_S_SidebarData'
import Axios from 'axios'
import { FiBell } from 'react-icons/fi'
import '@progress/kendo-theme-default/dist/all.css'
import { Divider } from '@material-ui/core'
import Loading from './Loading'

function S_Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState(0)
  const [sidebar, setSidebar] = useState(false)
  const [click, setClick] = useState(false)
  const [notification, setnotification] = useState(false)
  const [button, setButton] = useState(true)
  const [notif_data, setNotif_data] = useState([]);

  // titles
  let a = ['Home', '首頁']
  let b = ['Bookings', '會議預約']
  let c = ['Contact', '聯絡我們']
  let d = ['SIGN IN/UP', '登入/註冊']
  // let notif_data = [
  //   {
  //     type: '/message',
  //     title: 'Message!',
  //     content: 'You received a message from ',
  //   },
  //   {
  //     type: '/book',
  //     title: 'Booking!',
  //     content: 'You received a booking request from',
  //   },
  // ]
  //type是頁面連結 (/message 或是 /book)
  //title是notification 標題 (Message 或是 Booking)
  //content是notification 內容 (如上，分兩種)

  const showSidebar = () => setSidebar(!sidebar)
  const handleClick = () => setClick(!click)
  const shownotification = () => setnotification(!notification)
  const closeMobileMenu = () => setClick(false)
  const showButton = () => {
    if (window.innerWidth <= 1080) {
      setButton(false)
    } else {
      setButton(true)
    }
  }
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
          setIsLoggedIn(response.data.isLoggedIn)
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
        },
      )
    }

    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        let name = "";
        if(response.data.isLoggedIn) name = response.data.user[0].lastname + response.data.user[0].firstname;
        console.log(name);
        return Axios.post('https://voluntutorcloud-server.herokuapp.com/getNotif', {
          username: name,
          isnew: true
        })
      }).then((response) => {
        console.log(response.data);
        setNotif_data(response.data);
        setLoading(false);
      })

  }, [])

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  if(isLoading) {
    return (
      <Loading></Loading> 
    );
  }
  if (isLoggedIn) {
    if (status == 0) {
      return (
        <>
          <div className="navbar">
            <div>
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Voluntutor Cloud
                {/* <i class="fab fa-typo3" /> */}
              </Link>
            </div>
            <div className="navbar-container-logged">
              <div>
                <div className="menu-icon" onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-m active' : 'nav-m'}>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {a[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/book"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {b[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {c[status]}
                    </Link>
                  </li>
                  <li className="menu-bell">
                    <FiBell
                      className="icons_nav"
                      onClick={shownotification}
                    ></FiBell>
                  </li>
                </ul>
              </div>
              <Link to="#" className="menu-bars">
                <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
              </Link>
            </div>
            <nav className={notification ? 'notif active' : 'notif'}>
              <ul className="nav-menu-items" onClick={shownotification}>
                {notif_data.map((e, index) => {
                  console.log(e);
                  return (
                    <div key={index} className="wrap">
                      <Link className="notif_link" to={e.nottype}>
                        <div className="outsidewrap">
                          <div className="notif_title">{e.title}</div>
                          <div className="notif_content">{e.notcontent}</div>
                        </div>
                      </Link>
                      <Divider></Divider>
                    </div>
                  )
                })}
              </ul>
            </nav>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link className="menu-bars" to="#">
                    <CgClose className="icons_cross"></CgClose>
                  </Link>
                </li>
                {S_SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="navwords">{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="navbar">
            <div>
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Voluntutor Cloud
                {/* <i class="fab fa-typo3" /> */}
              </Link>
            </div>
            <div className="navbar-container-logged">
              <div>
                <div className="menu-icon" onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-m active' : 'nav-m'}>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {a[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/book"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {b[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {c[status]}
                    </Link>
                  </li>
                  <li className="menu-bell">
                    <FiBell
                      className="icons_nav"
                      onClick={shownotification}
                    ></FiBell>
                  </li>
                </ul>
              </div>
              <Link to="#" className="menu-bars">
                <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
              </Link>
            </div>
            <nav className={notification ? 'notif active' : 'notif'}>
              <ul className="nav-menu-items" onClick={shownotification}>
                {notif_data.map((e, index) => {
                  return (
                    <div key={index} className="wrap">
                      <Link className="notif_link" to={e.nottype}>
                        <div className="outsidewrap">
                          <div className="notif_title">{e.title}</div>
                          <div className="notif_content">{e.notcontent}</div>
                        </div>
                      </Link>
                      <Divider></Divider>
                    </div>
                  )
                })}
              </ul>
            </nav>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link className="menu-bars" to="#">
                    <CgClose className="icons_cross"></CgClose>
                  </Link>
                </li>
                {C_S_SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="navwords">{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </>
      )
    }
  } else {
    return (
      <>
        <div className="navbar">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Voluntutor Cloud
            {/* <i class="fab fa-typo3" /> */}
          </Link>
          <div className="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-m active' : 'nav-m'}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  {a[status]}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  {c[status]}
                </Link>
              </li>
              <li className="nav-buttonsign">
                <Link to="/sign-in">
                  {button && (
                    <Button buttonStyle="btn--outline">{d[status]}</Button>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default S_Navbar
