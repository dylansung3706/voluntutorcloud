import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import { Msg_recipient } from './Msg_recipient'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'

function Msg() {
  let num = [1]

  const [status, setStatus] = useState(0)
  let username = '', studentname = "", teacherusername = "";
  const [curMsg, setCurMsg] = useState('');
  const [msgRec, setMsgRec] = useState([]);
  let msgRecRev = [];
  let msgStr = "";
  const [msgForUpd, setMsgForUpd] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [hasProcessMsg, setHasProcessMsg] = useState(false);
  const [usernameConst, setUsernameConst] = useState('');
  const [studentnameConst, setStudentnameConst] = useState('');

  // T:asdfasfasdfψS:Let's book a meetψT:omg hi long time no seeψT:HiψT:Sure!!!ψT:See you then!ψT:Sure!!ψS:I am okay with the timeψS:Yes, can we have a meeting then?ψT:Are you available next Tuesday?

  function processMsg(msgStr, username, studentname) {
    console.log(msgStr);
    if(msgRec.length == 0 && msgStr != "" && hasProcessMsg == false) {
      const msgInfo = msgStr.split('ψ');
      console.log("msgInfo");
      console.log(msgInfo);
      for(let i = 0; i < msgInfo.length; i++) {
        const category = msgInfo[i].split(':');
        let t = "";
        t = (category[0] == 'T') ? "user" : "recipient"
        let msg = {type: t, text: category[1]};
        setMsgRec(msgRec => [msg, ...msgRec]);
        setHasProcessMsg(true);
      }
      setUsernameConst(username);
      setStudentnameConst(studentname);
      setMsgForUpd(msgStr);
      setHasProcessMsg(true);
    }
  }

  const updateMsg = () => {
    let msg = {type: "user", text: curMsg};
    setCurMsg("")
    setMsgRec(msgRec => [...msgRec, msg]);
    msgStr += "T:" + curMsg + 'ψ';
    console.log(msgStr);
    let tempMsgForUpd = msgStr + msgForUpd;
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
      username: usernameConst,
      studentname: studentnameConst,
      msg: tempMsgForUpd
    }).then((response) => {
      console.log(response);
    })
    setMsgForUpd(tempMsgForUpd);
  }

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0);
          Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
            username: username,
          }).then((response) => {
            console.log(response.data);
            studentname = response.data[0].studentname;
            console.log("username, studentname: ");
            console.log(username, studentname);
            if(!hasProcessMsg) {
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
                username: username,
                studentname: studentname
              }).then((response) => {
                if(response.data.length) msgStr = response.data[0].msg;
                processMsg(msgStr, username, studentname);
                setLoading(false);
              })
            }
          })
        },
      )
    }
  })

  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']
  
  if (isLoading) {
    return (
      <Loading/>
    )
  } else {
    console.log("msgRec");
    console.log(msgRec);
    return (
    <div>
      <div className="out">
        <div className="chathistory">
          <div className="searchpad">
            <div className="search">
              Find friends
              <BiSearchAlt className="searchicon"></BiSearchAlt>
            </div>
          </div>
          <div className="peoplelist">
            {num.map((e) => {
              return (
                <div className="shadowing">
                  <div className="outerbox">
                    <div className="imagemsg">
                      <FaUser className="msg_icon" />
                    </div>
                    <div className="infoboxmsg">
                      <div className="namemsg">{studentnameConst}</div>
                      <div className="latestmsg">{msgRec[msgRec.length-1].text}</div>
                    </div>
                    {/* <div className="align">
                      <div className="numbermsg">1</div>
                    </div> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chatcontent">
          <div className="chatname">{studentnameConst}</div>
          <div className="chat">
            {msgRec.map((e) => {
              return <Msg_user type={e.type} text={e.text}></Msg_user>
            })}
            </div>
          <div className="send">
            <textarea
              className="messagesend"
              type="text"
              placeholder="Enter your message..."
              value={curMsg}
              onChange={(e) => {
                setCurMsg(e.target.value)
              }}
            />
            <div className="sendword" onClick={updateMsg}>send</div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Msg

{
  /* onclick: <div className="sendword">send</div> */
}
