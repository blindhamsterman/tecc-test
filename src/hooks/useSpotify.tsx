
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service/spotify-service/spotify-service";
import { generateRandomString } from '../utils/general-utils'

export interface SpotifyContextInterface {
    fetchCurrentUserInfo: () => void,
    hasLoggedIn: boolean,
    hasRedirectedFromValidPopup: boolean,
    isLoading: boolean,
    login: () => void,
    logout: () => void,
    storeTokenAtRedirect: () => void,
    user: SpotifyApi.CurrentUsersProfileResponse,
    getToken: string
}

// Environment variables from `.env` file.
const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_REDIRECT_URI,
    REACT_APP_SPOTIFY_SCOPES,
} = process.env;

const LS_KEYS = {
    ACCESS_TOKEN: "SPOTIFY_ACCESS_TOKEN",
    EXP_TIMESTAMP: "SPOTIFY_TOKEN_EXPIRE_TIMESTAMP",
    TOKEN_TYPE: "SPOTIFY_TOKEN_TYPE",
};

/**
 * Create react context hook
 */
export const SpotifyContext = React.createContext({} as SpotifyContextInterface);

// Some typing issues here that I didn't have time to resolve
//@ts-ignore
export const SpotifyProvider = ( {children}): JSX.Element => {
    const spotify = useProvideSpotify();
    return (
        //@ts-ignore
        <SpotifyContext.Provider value={spotify}>
            {children}
        </SpotifyContext.Provider>
    );
};

export const useSpotify = () => {
    return React.useContext(SpotifyContext);
};

/**
 * Defines the context state and functions available for the hook
 * @returns SpotifyContextInterface
 */
const useProvideSpotify = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<SpotifyApi.CurrentUsersProfileResponse | undefined>(undefined);
    const [token, setToken] = React.useState<string | undefined>(undefined);
    const [tokenExp, setTokenExp] = React.useState<number | undefined>(undefined);

    const navigate = useNavigate();

    const fetchCurrentUserInfo = async (): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
        if(token){
            return await getUser(token);
        } else {
            throw new Error("Bearer token undefined");
            
        }
    };

    /**
     * Responsible for calling the authorize spotify endpoint within a popup and assigning logic to window to handle callback
     */
    const login = () => {
        const popup = window.open(
            `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
                REACT_APP_SPOTIFY_REDIRECT_URI as string
            )}&scope=${encodeURIComponent(
                REACT_APP_SPOTIFY_SCOPES as string
            )}&response_type=token&state=${generateRandomString(16)}&show_dialog=true`,
            "Login with Spotify",
            "width=600,height=800"
        );
        
        //ignoring because spotifyAuthCallback doesn't exist on window
        //@ts-ignore
        window.spotifyAuthCallback = async (accessToken, expTimestamp) => {
            if (popup) {
                popup.close();
            }

            setToken(accessToken);
            setTokenExp(expTimestamp);
        };
    };

    /**
     * Responsible for setting the local storage values for token
     * NOTE: Ideally we wouldn't store this as local storage and instead would use a cookie
     * for the OAUTH_TOKEN and handle the bearer side in session so it cant be interrogated 
     * locally. 
     */
    const storeTokenAtRedirect = () => {
        const searchParams = new URLSearchParams(window.location.hash.substring(1));

        try {
            const accessToken = searchParams.get("access_token");
            const expiresIn = parseInt(searchParams.get("expires_in") as string, 10);
            const tokenType = searchParams.get("token_type");

            const expTimestamp = Math.floor(Date.now() / 1000 + expiresIn); // In seconds.

            if (accessToken) {
                window.localStorage.setItem(LS_KEYS.ACCESS_TOKEN, accessToken);
            }
            if (expTimestamp) {
                window.localStorage.setItem(LS_KEYS.EXP_TIMESTAMP, expTimestamp.toString());
            }
            if (tokenType) {
                window.localStorage.setItem(LS_KEYS.TOKEN_TYPE, tokenType);
            }

            window.opener.spotifyAuthCallback(accessToken, expTimestamp);
        } catch (err) {
            console.error(err);

            throw new Error(`Could not store token information in local storage.`);
        }
    };

    /**
     * Responsible for clearing out the local storage and state values for token
     */
    const invalidateToken = () => {
        try {
            Object.values(LS_KEYS).forEach((key) => {
                window.localStorage.removeItem(key);
            });
        } catch (err) {
            console.error(err);
        }

        setUser(undefined);
        setToken(undefined);
        setTokenExp(undefined);
    };

    const logout = () => {
        invalidateToken();

        window.location.reload();
    };

    const hasTokenExpired = () => {
        try {
            const accessToken =
                token || window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
            const expTimestamp =
                tokenExp ||
                parseInt(window.localStorage.getItem(LS_KEYS.EXP_TIMESTAMP) as string, 10);

            if (!accessToken || !expTimestamp || isNaN(expTimestamp)) {
                return false;
            }

            return Date.now() / 1000 > expTimestamp;
        } catch (err) {
            console.error(err);

            return true;
        }
    };

    /**
     * Determines if the user has logged in by checking for token, use details and that the token has not expired
     * @returns true or false
     */
    const hasLoggedIn = () => {
        return !!token && !!user && !hasTokenExpired();
    };

    /**
     * Determines if the app has been correctly redirected from the spotify auth popup
     * @returns true or false
     */
    const hasRedirectedFromValidPopup = () => {
        if (window.opener === null) {
            return false;
        }

        const { hostname: openerHostname } = new URL(window.opener.location.href);
        const { hostname } = new URL(window.location.href);
 
        return (
            window.opener &&
            window.opener !== window &&
            !!window.opener.spotifyAuthCallback &&
            openerHostname === hostname &&
            navigate.length >= 2
        );
    };

    /**
     * set the local state for the user
     */
    const loadCurrentUser = async () => {
        try {
            const user = await fetchCurrentUserInfo();

            setUser(user);
        } catch (error) {
            console.error(error);

            navigate("/");
        }
    };


    React.useEffect(() => {
        try {
            const accessToken = window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
            const expTimestamp = parseInt(
                window.localStorage.getItem(LS_KEYS.EXP_TIMESTAMP) as string,
                10
            );

            if (accessToken && expTimestamp && Number.isInteger(expTimestamp)) {
                setToken(accessToken);
                setTokenExp(expTimestamp);
            } else {
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);

            setIsLoading(false);
        }
    }, []);

    /**
     * useEffect to run if any data associated with determining if the user is logged in has 
     * changed. We call loadCurrentUser if the user does not exist but the token and expiry did.
     * Set isLoading to false once all the required data for being logged in is available.
     */
    React.useEffect(() => {
        if (token && tokenExp) {
            if (!user) {
                loadCurrentUser();
            } else {
                setIsLoading(false);
            }
        }
    }, [token, tokenExp, user]);

    return {
        user,
        login,
        logout,
        isLoading,
        get hasLoggedIn() {
            return hasLoggedIn();
        },
        get hasRedirectedFromValidPopup() {
            return hasRedirectedFromValidPopup();
        },
        storeTokenAtRedirect,
        fetchCurrentUserInfo,
        get getToken() {
            return token;
        }
    };
};

