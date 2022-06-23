import React, { Fragment, useState } from "react";
import NavBarLogined from "./navbar1/NavBarLogined";
import Profile from "./profile/profile";
import ViewProfile from "./viewProfile/viewProfile";
import People from "./people/people";
import Friends from "./friends/friends";
const Body = (props)=>{
    const [activatedFriends,setActivatedFriends] = useState(false)
    const [layout,setLayout] = useState('profile')
    return <Fragment>
        <NavBarLogined activatedFriends = {activatedFriends} setActivatedFriends = {setActivatedFriends} layout = {setLayout} />
        {layout == 'viewProfile' && <ViewProfile layout = {setLayout}  />}
        {layout == 'profile' && <Profile  />}
        {layout == 'people' && <People layout = {setLayout} />}
        {activatedFriends && <Friends layout = {setLayout}  />}
    </Fragment>
}


export default Body