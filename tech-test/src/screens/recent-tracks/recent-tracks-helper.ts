import { SimpleArtist } from "src/components/artist-item/artist-item";

export const LS_APP_KEYS = {
    ACTIVE_FILTER: "ACTIVE_FILTER"
}

/**
 * Builds a unique array of artists based on a passed in history of artists.
 * @param items Array of recent track history
 * @returns Array of SimpleArtists 
 */
export const getRecentArtists = (items: SpotifyApi.PlayHistoryObject[] | undefined): SimpleArtist[] => {
    const tempArtistArray: SimpleArtist[] = [];
    items?.forEach(({ track, played_at }) => {
        const artist: SimpleArtist = {
            name: track.artists[0].name,
            id: track.artists[0].id,
            lastPlayed: played_at
        }
        tempArtistArray.push(artist);
    })
    const uniqueIds = new Set();
    const uniqueArtists = tempArtistArray.filter(artist => {
        const isDuplicate = uniqueIds.has(artist.id);

        uniqueIds.add(artist.id);

        if (!isDuplicate) {
            return true;
        }

        return false;
    });
    return uniqueArtists
}
/**
 * Function to return artist objects, filtered by a given id, more complete implementation would handle an id being passed that does not exist
 * but this is sufficient for current usecase.
 * @param id string id for artist
 * @param artists Array of ArtistObjects
 * @returns an artist object, if there were more than one, it still returns one.
 */
export const filterArtistsById = (id: string | undefined, artists: SpotifyApi.ArtistObjectSimplified[]): SpotifyApi.ArtistObjectSimplified => {
    return artists.filter((artist) => {
        //if id is undefined, return all artists.
        return id ? artist.id === id : artist;
    })[0];
};

export const getLSActiveFilterId = (): string | undefined => {
    return window.localStorage.getItem(LS_APP_KEYS.ACTIVE_FILTER) as string;
}
