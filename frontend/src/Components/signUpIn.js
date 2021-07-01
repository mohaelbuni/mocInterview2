 import React from 'react'
 import { AccountBox } from './accountBox/index';
 import  styled from 'styled-components';


 const AppContainer = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

 function signUpIn() {
     return (
        <>    
          
           <br/>
           <br/>
           <br/>
            <AppContainer>
               <AccountBox />
            </AppContainer>
           <br/>
           
           
            
        </>
     )
 }
 
 export default signUpIn;
 