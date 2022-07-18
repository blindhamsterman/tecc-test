
import axios from 'axios';

const BASE_API_URL = "https://api.spotify.com/v1";
/*
 * Retrieves the recently played tracks for the authenticated user 
 * @returns array of recent track information per https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recently-played
 */
export const getRecentTracks = async (token: string): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> => {
    const { data } = await axios.get<SpotifyApi.UsersRecentlyPlayedTracksResponse>(
        `${BASE_API_URL}/me/player/recently-played?limit=50`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    );
    return data;
}

/*
 * Retrieves the user info of the logged in user 
 */
export const getUser = async (token: string): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
    const { data } = await axios.get<SpotifyApi.CurrentUsersProfileResponse>(
        `${BASE_API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    );
    return data;
}