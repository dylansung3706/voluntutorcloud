import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Myfav from '../Myfav'
// import C_Myfav from '../C_Myfav'

export default function MyFavList() {
  return (
    <>
      <Navbar></Navbar>
      <Myfav></Myfav>
      <Footer></Footer>
    </>
  )
}
