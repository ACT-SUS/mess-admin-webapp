// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    fontWeight: 400
                },
            }
        }
    };
}
