const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "fit-content",
            fontFamily: "'Ubuntu', sans-serif",
            background: "white"
        }
    }
};

const getStyles = (labelsArray, label, theme) => {
    return {
        fontWeight:
            label.indexOf(labelsArray) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
};

const muiStyles = {
    formControl: {
        flex: 1
    },
    select: {
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED8936",
            borderWidth: "2px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED8936",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED8936"
        },
        ".MuiSvgIcon-root": {
            color: "#ED8936"
        },
        ".MuiSelect-select": {
            color: "#ED8936",
        },
        color: "#ED8936",
        background: "white",
        // flex: 1,
        // minWidth: "160px",
    },
    inputLabel: {
        "&.MuiInputLabel-outlined.Mui-focused": {
            color: "#ED8936"
        },
        "&.MuiInputLabel-outlined": {
            color: "#ED8936"
        },
        fontFamily: "'Ubuntu', sans-serif",
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1
    },
    pagination: {
        ".MuiButtonBase-root": { background: "white" },
        ".MuiPaginationItem-previousNext": { background: "white" },
        ".MuiPaginationItem-text": { color: "black" },
        "&.MuiPagination-root .Mui-selected": { background: "#ED8936" },
        ".MuiButtonBase-root.MuiPaginationItem-root:hover": { background: "#FCA5A5" },
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        color: "#FCFAF9",
        background: "white",
        fontFamily: "'Ubuntu', sans-serif",
    }
};

export {
    muiStyles,
    MenuProps,
    getStyles
};