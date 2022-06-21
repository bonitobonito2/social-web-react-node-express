import React, { Fragment, useState } from "react";
import NavBarLogined from "./navbar1/NavBarLogined";
import Profile from "./profile/profile";
import People from "./people/people";
const Body = (props)=>{
    const [layout,setLayout] = useState('profile')
    return <Fragment>
        <NavBarLogined layout = {setLayout} />
        {layout == 'profile' && <Profile  />}
        {layout == 'people' && <People />}
    </Fragment>
}


export default Body