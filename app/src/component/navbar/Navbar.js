import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
// import NavbarRights from "./Navbar-right";
// import Close from '@material-ui/icons/Clear';
import { Redirect, useLocation } from 'react-router-dom'
import NavButton from './Nav-button';
import MenuIcon from '@material-ui/icons/Menu';
import '../../App.css'
import { Button, SwipeableDrawer } from '@material-ui/core'

import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';
import Twitter from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom'
import "../../App.css"
import "./sidebar.css"
import AccountLogo from '@material-ui/icons/AccountCircle';


function Navbar(props) {
    const { user, setUser } = useContext(UserContext);

    let location = useLocation();
    const [state, setState] = useState(false)

    const toggleDrawer = (open) => (event) => {
        setState(open)
    }
    const logout = async () => {
        try {
            // const res = await fetch('https://my-site-12.herokuapp.com/logout', {
            const res = await fetch('http://localhost:5000/logout', {
                credentials: 'include',
            });
            const data = res.json();
            console.log('logout data', data);
            setUser(null)
        } catch (error) {
            console.log(error)
        }

    }


    const list = () => (
        <div >
            <div id="sidebar" className='example'>
                <div id="mySidebar" className="sidebar example" style={{
                    overflowY: 'scroll',
                    overflowX:'hidden'
                }} >

                    <div className='sidebar-upper'>
                        <div className='img m-2'>
                            <AccountLogo />
                        </div>
                        <div className='name m-2'>
                            <h2>{user.name}</h2>
                            <h6>{user.email}</h6>
                        </div>
                    </div>
                    <hr />
                    <div className="">
                        <div className="navbarbuttons" >
                            <Link className="dropbtn" to='/home'  >HOME</Link>
                            <Link className="dropbtn" to='/blog'  >BLOG</Link>
                            <Link className="dropbtn" to='/about'  >ABOUT</Link>
                            <Link className="dropbtn" to='/contact'  >CONTACT</Link>

                        </div>
                        <Link onClick={logout}><h4>Logut</h4></Link>
                        <a href='/sign-up' onClick={logout} ><h4 onClick={toggleDrawer(false)}>Logout and regiter</h4>  </a>
                        <Link><h4>update profile</h4></Link>

                    </div>
                    <div className="connectus" style={{ marginBottom: '20px' }}>
                        <h2 className="connect">Connect us</h2>
                        <ul className="social-media">
                            <Link to=""><Facebook /></Link>
                            <Link to=""><Instagram /></Link>
                            <Link to=""><Twitter /></Link>
                        </ul>
                    </div>
                </div>
                <div id="main" className="">
                </div>
            </div>
        </div>
    )

    if (!user) {
        return <Redirect to='/' />
    } else {


        return (
            <React.Fragment>
                <div id="navbar">
                    <div className="title"> MySite</div>
                    <div className="navbar-r1 "  >
                        <div>
                            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                            <SwipeableDrawer
                                anchor={'left'}
                                open={state}
                                onClose={toggleDrawer(false)}
                            // onOpen={toggleDrawer(true)}
                            >
                                {list()}
                            </SwipeableDrawer>
                        </div>
                        <div className='nav-button'>
                            <NavButton logout={logout} />
                        </div>
                    </div>
                    <div className="navbar-r2">
                        <div className="schema">
                            <div>{location.pathname}</div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
export default Navbar;