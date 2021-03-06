import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Port_nav.css'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { SidebarData } from './SidebarData'
import { C_SidebarData } from './C_SidebarData'
import '@progress/kendo-theme-default/dist/all.css'

function Port_nav(props) {
  window.addEventListener('resize', showButton)
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [status, setStatus] = useState(0)
  const handleClick = () => setClick(!click)
  
  const showButton = () => {
    if (window.innerWidth <= 1080) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    if(props.lang == "chinese") setStatus(1)
    else setStatus(0)
    showButton()  
  }, [])

  if (status ==0){
  return (
    <>
      <div className="navbar_port">
        <div className="navbar-container-logged">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
        </div>
        <Link to="#" className="menu-bars">
          <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link className="menu-bars" to="#">
              <CgClose className="icons_cross"></CgClose>
            </Link>
          </li>
          {SidebarData.map((item, index) => {
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
    </>
  )}else{
    return (
      <>
        <div className="navbar_port">
          <div className="navbar-container-logged">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
          </div>
          <Link to="#" className="menu-bars">
            <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link className="menu-bars" to="#">
                <CgClose className="icons_cross"></CgClose>
              </Link>
            </li>
            {C_SidebarData.map((item, index) => {
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
      </>
    )
  }
}

export default Port_nav
