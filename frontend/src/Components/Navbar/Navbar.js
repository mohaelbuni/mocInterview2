import  React , {useState } from 'react';
import './Navbar.css';
import {Link } from 'react-router-dom';
import { SideBarData } from './../SideBarData';



     const Navbar = (props) => { 
        const [sidebar , setSidebar] = useState(false);
        const showSidebar = () => setSidebar (!sidebar);
      
        
        
        return (   
            <> 
            
            
            <div className='navbar'>
                 <Link to='#' className='menu-icon' >
                    <i className="fas fa-bars" onClick={showSidebar} ></i>
                 </Link> 
                 <Link  to ='/about' >
                 <img className='navbar-logo' src='../logo.png' alt ='../logo192.png'/>
                 </Link>
                 <button className='navbar-but'>   
                    <Link to='/signupin' className='nav-links'>
                        Log In
                    </Link>        
                 </button>         
            </div>           
                         
                        
                                
                            
                    
            
            <nav className={sidebar?'nav-menu active' : 'nav-menu'} >  
                
                <ul className='navbar-items' onClick={showSidebar} >
                    <li className ='navbar-toggle'>
                         <Link to='#'  exact ='true' className='menu-icon '>
                            <i className="fas fa-times"></i>
                         </Link>
                    </li>
                     {SideBarData.map( (item,index) => {
                         return (
                          <li key={index} className={item.cName}>
                              <Link to={item.path}>
                                  {item.icon}
                                  <span>
                                    {item.title}
                                  </span>
                              </Link>
                          </li> );
                     })}
                </ul> 
            </nav>
           
         </>   

         );
    }

export default Navbar;
   /* <div className ='nav-shadow'></div>
   
   
                             <ul className='navbar-but'>
                                {MenueItems.map ( (item,index)=> {
                                    return(
                                        <button   to={signUpIn} key={index} className={item.cName}> 
                                            
                                            {item.title} 
                                            
                                        </button>
                                    ); }
                                )}
                             </ul>
   ********************************************************
      const [toSign ,setToSign] = useState(true);

        if (!toSign) {
            return <Redirect  to={signUpIn}/>
        }

   
   
   <Link to='/signupin'>
                         Sign Up/In 
                         </Link>
   
   */