import { StyleSheet } from "aphrodite";

export const trackItemStyles = StyleSheet.create({
    itemContainer: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        margin: "16px",
        padding: "16px",
        backgroundColor: "#181818",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "380px",
        maxWidth: "280px",
        borderRadius: "5px",
        color: "#6a6a6a",
        fontWeight: 400,
        fontSize: "14px",
        ':hover': {
            background: "#5a5a5a",
            color: "#FFF"
        },
    },
    image: {
        width: "268px",
        marginBottom: "10px",
        borderRadius: "5px"
    },
    trackText: {
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: "16px",
        overflowX: "hidden",
        whiteSpace: "nowrap",
        maxWidth: "inherit",
        width: "280px",
        textOverflow: "ellipsis",
        textAlign: "center"
    }
})