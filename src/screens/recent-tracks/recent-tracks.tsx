import { css } from 'aphrodite';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TrackItem } from '../../components/track-item/track-item';
import { useSpotify } from '../../hooks/useSpotify';
import { getRecentTracks } from '../../service/spotify-service/spotify-service';
import { filterArtistsById, getRecentArtists, LS_APP_KEYS } from './recent-tracks-helper';
import { recentTracksStyles } from './recent-tracks.styles';

export type RecentTracksProps = {
    lsActiveFilterId: string | undefined;
}

export const RecentTracks = ({lsActiveFilterId}: RecentTracksProps): JSX.Element => {

    const navigate = useNavigate();
    const { getToken } = useSpotify();

    const { isLoading, isError, isSuccess, data, refetch, error } =
        useQuery<any, Error, SpotifyApi.UsersRecentlyPlayedTracksResponse>(["get-recent-tracks"],
            async () => {
                return await getRecentTracks(getToken)
            },
            {
                // Poll data every 30 seconds
                refetchInterval: 30000
            });

    const [filteredData, setFilteredData] = useState<SpotifyApi.PlayHistoryObject[] | undefined>(data?.items);
    const [activeFilterId, setActiveFilterId] = useState<string | undefined>(lsActiveFilterId);

    const recentArtists = getRecentArtists(data?.items);

    /**
     * filters the data based on the active filter id that is currently set
     */
    const handleFilter = () => {
        //We destructure the data here to break the link but effectively use a copy
        const tempData = { ...data }
        setFilteredData(tempData?.items?.filter((item) => {
            return item.track.artists.includes(filterArtistsById(activeFilterId, item.track.artists))
        }));
    };

    useEffect(() => {
        if (isError && error.message.includes("401")) {
            navigate("/Unauthorized");
        }
    }, [isError, error, navigate]);

    useEffect(() => {
        handleFilter();
    }, [data, refetch, activeFilterId]);

    useEffect(() => {
        if (activeFilterId) {
            window.localStorage.setItem(LS_APP_KEYS.ACTIVE_FILTER, activeFilterId);
        } else {
            window.localStorage.removeItem(LS_APP_KEYS.ACTIVE_FILTER);
        }
    }, [activeFilterId])

    return (
        <div className={css(recentTracksStyles.background)}>
            {isLoading && (<div>Loading...</div>)}
            {isSuccess &&
                <>
                    <Sidebar artists={recentArtists} activeFilterId={activeFilterId} onFilteredDataChange={(id: string) => {
                        setActiveFilterId(id ? id !== activeFilterId ? id : undefined : undefined);
                        handleFilter();
                    }} />
                    <div className={css(recentTracksStyles.flexContainer)}>
                        {filteredData?.map(({ track }) => (
                            <TrackItem track={track} />
                        ))}
                    </div>
                </>
            }
            {isError &&
                <div>A problem has been encountered: {error.message}</div>}
        </div>)
}
