import Login from './Login.js';
import App from './App.js';
import { useState } from 'react';
function Index(){
    const [login, setLoggedIn] = useState(false);
    if(!login){
        console.log(login);
        return (<Login loginAction={setLoggedIn}/>);
    }
    else {
        console.log('else')
        //Bassically the logout action is setting login false to popup login screen again
        return (<App logOutAction={setLoggedIn}/>);
    }

}

export default Index;