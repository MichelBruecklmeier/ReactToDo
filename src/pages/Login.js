import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie';
import {useState} from 'react';
import { deleteUser } from "./DataBase";
export function AccountSettings({logOutAction, openSettings}){
    const logout  = () => {
        Cookies.remove('user');
        logOutAction(false);
    }
    const deleteAcc = () => {
        if(confirm("are you sure you want to delete your account")){
            deleteUser(Cookies.get('user'));
            logout();
        }
    }
    return(
        <div className='fixed inset-0 z-50 justify-center bg-black/50 flex items-center'>
            <div className='w-fit flex flex-col '>
                <Button
                    //Logout
                    onClick={() => logout()}
                    variant='secondary'
                    size='lg'
                    className='text-4xl m-2 p-9 cursor-pointer'
                >
                    Logout
                </Button>
                
                <Button
                    //Delete account
                    onClick={() => Cookies.get('user') !== 'null' && deleteAcc()}
                    variant='destructive'
                    size='lg'
                    className='text-4xl m-2 p-9 cursor-pointer'
                >
                    Delete Account
                </Button>
                <Button
                    //Cancel
                    onClick={() => openSettings(false)}
                    size='lg'
                    className='text-4xl m-2 p-9 cursor-pointer'
                >Cancel</Button>
            </div>
        </div>
    )
}
export function LogOutBar({logOutAction}){
    const [settings, openSettings] = useState(false);



    return(
        <div className='flex items-center justify-between m-2  text-white p-0.5 '>
            <p className='font-medium text-base'>
                Logged in as: 
                <span className='font-semibold pl-0.5'>
                    {Cookies.get('user') === 'null' ? 'Shared Account':Cookies.get('user')}
                </span>
                
            </p>
            <Button 
                className='ml-auto text-xl p-1.5 cursor-pointer'
                size='sm'
                onClick={() => openSettings(true)}
            >
                ⚙️
            </Button>
            {settings && <AccountSettings logOutAction={logOutAction} openSettings={openSettings}/>}
        </div>
    )
}

function Login({loginAction}){
    let [user, setUser] = useState('');
    
    //Check if we can skip login screen
    if(Cookies.get('user')){
        console.log('user cookie present')
        loginAction(true);
    }



    const onLogin = (e) => {
        e.preventDefault();

        if(user.trim() === '' || user.trim() === 'null')
            return;
        //Login saved for one day
        Cookies.set('user',user.trim(),{expires: 1});
        loginAction(true);
        setUser('');
    }
    //On no login allows for a gues user or a user that wont have saved data
    const onNoLogin = () => {
        Cookies.set('user','null',{expires:1});
        loginAction(true);
    }


    return(
        <div className="fixed inset-0 pt-1 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-sm  absolute bg-gray-700 border-gray-800">
                <CardHeader>
                    <CardTitle className='justify-center text-center text-white text-3xl'>
                        Login
                    </CardTitle>
                    <CardDescription className='text-gray-400 text-center'>
                        You only need a username to login, if you dont have a account just put in your username and click logon
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => onLogin(e)}>
                        <Input
                            className='text-gray-100'
                            placeholder='Username'
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <Button
                            className='mt-4 p-2 w-full transition-all duration-300 hover:bg-green-700'
                            type='submit'
                        >
                            Logon
                        </Button>
                        <Button
                            className='mt-2 bg-white/75 text-black p-2 w-full transition-all duration-300 hover:bg-red-300'
                            onClick={() => onNoLogin()}
                        >
                            Stay logged out
                        </Button>
                        
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;