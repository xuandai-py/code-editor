import Button from "@mui/material/Button"

const BundleButton = ({ onClickHandler }: { onClickHandler: () => void }) => {

    return (
        <Button
            variant="outlined"
            sx={{ color: 'white', p: 1, border: '1px solid white' }}
            onClick={onClickHandler}
        >
            Bundle
        </Button>
    )
}

export default BundleButton