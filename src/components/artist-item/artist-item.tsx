import { css } from 'aphrodite';
import { artistItemStyles } from './artist-item.styles';

export type SimpleArtist = {
    name: string;
    id: string;
    lastPlayed: string;
}

export type ArtistItemProps = {
    artist: SimpleArtist;
    activeFilterId: string | undefined;
    onFilteredDataChange: (id: string) => void;
}

export const ArtistItem = ({ artist, activeFilterId, onFilteredDataChange }: ArtistItemProps): JSX.Element => {

    const handleLocalFilter = () => {
        onFilteredDataChange(artist.id)
    }

    return (
        <button className={css(artist.id === activeFilterId ? artistItemStyles.selectedArtistItem : artistItemStyles.artistItem)} onClick={handleLocalFilter}>
            <div >{artist.name}</div>
        </button>
    )
}