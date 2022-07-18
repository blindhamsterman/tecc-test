import { StyleSheet } from "aphrodite";

export const artistItemStyles = StyleSheet.create({
    artistItem: {
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: "14px",
        padding: "8px 16px",
        margin: "4px 0",
        backgroundColor: "transparent",
        border: "none",
        textAlign: "left",
        textDecoration: "none",
        display: "inline-block",
        width: "200px",
        ':hover': {
            background: "#2b2b2b",
            borderRadius: "5px",
            cursor: "pointer"
        }
    },
    selectedArtistItem: {
        color: "#1db956",
        fontWeight: 400,
        fontSize: "14px",
        padding: "8px 16px",
        margin: "4px 0",
        backgroundColor: "#5a5a5a",
        border: "none",
        textAlign: "left",
        textDecoration: "none",
        display: "inline-block",
        width: "200px",
        borderRadius: "5px",
        ':hover': {
            background: "#2b2b2b",
            cursor: "pointer"
        }
    }
})