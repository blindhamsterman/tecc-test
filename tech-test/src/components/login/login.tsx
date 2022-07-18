import { css } from 'aphrodite';
import { useSpotify } from '../../hooks/useSpotify';
import { loginStyles } from './login.styles';


export const Login = ({ }): JSX.Element => {
    const {
        hasLoggedIn,
        login,
        logout,
        user,
    } = useSpotify();

    return (
    <>
        {hasLoggedIn ? (
            <div className={css(loginStyles.topBar)}>
                <h3>Spotify Technical Test</h3>
                <div>
                    Welcome {user.display_name} &nbsp;
                    <button className={css(loginStyles.appButton)} onClick={logout}>Logout</button>
                </div>
            </div>
        ) : (
            <div className={css(loginStyles.fullScreen)}>
                <h3>Spotify Technical Test</h3>
                <button className={css(loginStyles.appButton)} onClick={login}>Login</button>
            </div>
        )}
    </>)
}
