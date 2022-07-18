import { css } from 'aphrodite';
import { ArtistItem, SimpleArtist } from '../artist-item/artist-item';
import { sidebarStyles } from './sidebar.styles';


export type SidebarProps = {
    artists: SimpleArtist[];
    activeFilterId: string | undefined;
    onFilteredDataChange: (id: string) => void;
}

/**
 * Simple rendering component for the sidebar, responsible for rendering the list of artists and bubbling the filter event back to screen.
 * @param artists list of SimpleArtist objects
 * @returns container that lists artist items
 */
export const Sidebar = ({ artists, activeFilterId, onFilteredDataChange }: SidebarProps): JSX.Element => {

    return (
        <div className={css(sidebarStyles.artistsContainer)}>
            {artists.map((artist) => (
                <ArtistItem artist={artist} activeFilterId={activeFilterId} onFilteredDataChange={onFilteredDataChange}/>
            ))}
        </div>
    )
}