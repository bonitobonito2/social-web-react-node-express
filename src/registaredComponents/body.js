import React, { Fragment, useState } from "react";
import NavBarLogined from "./navbar1/NavBarLogined";
import Profile from "./profile/profile";

const Body = (props)=>{
    const [layout,setLayout] = useState('profile')
    return <Fragment>
        <NavBarLogined layout = {setLayout} />
        {layout == 'profile' && <Profile  />}
    </Fragment>
}


export default Body