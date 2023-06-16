import { Route, Routes } from 'react-router-dom';
import './sass-ufi/index.css'
import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import Navbar from './components/Navbar';
import UserBlog from './Views/UserBlog';
import Profile from './Views/Profile';
import FindOneBillet from './Views/FindOneBillet';

function App() {

    const getCurrentSubURL = () => {
        return window.location.pathname;
    }

    let objCurrentUser = sessionStorage.getItem("user");
    let currentUser, otherUser;

    if (objCurrentUser === "" || objCurrentUser === null) {
        objCurrentUser = false;
        sessionStorage.setItem('status', 'guest');
    } else {
        objCurrentUser = objCurrentUser.split("\"")
        currentUser = {
            login: objCurrentUser[3],
            idBillet: sessionStorage.getItem('getOneBilletId'),
            titleBillet: sessionStorage.getItem('getOneBilletTitle')
        }

        otherUser = {
            login: getCurrentSubURL().replace(/^\/([^/]*).*$/, '$1')
        }
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                {
                    objCurrentUser  && (<Route path={currentUser.login !== otherUser.login ? "/" + otherUser.login : "/" + currentUser.login} element={<UserBlog user={currentUser.login !== otherUser.login ? otherUser.login : currentUser.login} />} />)
                }
                {
                    objCurrentUser && (<Route path={`${currentUser.login}/${currentUser.idBillet}` !== `${otherUser.login}/${currentUser.idBillet}` ? `/${otherUser.login}/${currentUser.idBillet}` : `/${currentUser.login}/${currentUser.idBillet}`} element={<FindOneBillet idBillet={currentUser.idBillet} titleBillet={currentUser.titleBillet} user={currentUser.login !== otherUser.login ? otherUser.login : currentUser.login} />} />)
                }
            </Routes>
        </>
    );
}

export default App;
