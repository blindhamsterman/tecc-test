import { StyleSheet } from "aphrodite";

export const loginStyles = StyleSheet.create({
    topBar: {
        display: "flex",
        flex: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "24px",
        paddingLeft: "24px",
        background: "#121212",
        color: "#FFF"
    },
    fullScreen: {
        color: "#FFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#121212",
        height: "100vh"
    },
    appButton: {
        backgroundColor: "#282828",
        border: "none",
        color: "#FFF",
        padding: "8px 16px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        fontWeight: 700,
        borderRadius: "25px",
        ':hover': {
            background: "#5a5a5a",
            cursor: "pointer"
        },
    }
})