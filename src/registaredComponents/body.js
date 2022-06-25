import React, { Fragment, useState } from "react";
import NavBarLogined from "./navbar1/NavBarLogined";
import Profile from "./profile/profile";
import ViewProfile from "./viewProfile/viewProfile";
import People from "./people/people";
import Chat from "./chat/chat";
import Friends from "./friends/friends";
const Body = (props)=>{
    const [activatedFriends,setActivatedFriends] = useState(false)
    const [activeChat, setActivChat] = useState(false)
    const [layout,setLayout] = useState('profile')
    return <Fragment>
        <NavBarLogined activatedFriends = {activatedFriends} setActivatedFriends = {setActivatedFriends} layout = {setLayout} />
        {layout == 'viewProfile' && <ViewProfile chat = {setActivChat}  layout = {setLayout}  />}
        {layout == 'profile' && <Profile  />}
        {layout == 'people' && <People layout = {setLayout} />}
        {activeChat && <Chat chat = {setActivChat} />}
        {activatedFriends && <Friends layout = {setLayout}  />}
    </Fragment>
}


export default Body