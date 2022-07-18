import { css } from 'aphrodite';
import { trackItemStyles } from './track-item.styles';

export type TrackItemProps = {
    track: SpotifyApi.TrackObjectFull;
}

export const TrackItem = ({ track }: TrackItemProps): JSX.Element => {
    const artists = track.artists.map((artist)=>{ return artist.name})
    return (
        <div className={css(trackItemStyles.itemContainer)} key={track.id}>
            <img src={track.album.images[0].url} alt="Logo" className={css(trackItemStyles.image)} />
            <div className={css(trackItemStyles.trackText)}>{track.name}</div>
            <div>
                {artists.toString().replace(/,/g, ", ")}
            </div>
        </div>
    )
}