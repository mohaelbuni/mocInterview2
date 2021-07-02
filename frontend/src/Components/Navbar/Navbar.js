import  React , {useState } from 'react';
import './Navbar.css';
import {Link } from 'react-router-dom';




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
                    <Link to={props.nextNav} className='nav-links'>
                        {props.screenName}
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
                     {props.arr.map( (item,index) => {
                         return (
                          <li key={index} className={item.cName}>
                              <a href={item.path}>
                                  {item.icon}
                                  <span>
                                    {item.title}
                                  </span>
                              </a>
                          </li> 
                          );
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