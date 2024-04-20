import { CommonButtons } from "./button"

const BundleButton = ({ onClickHandler }: { onClickHandler: () => void }) => {

    return (
        <CommonButtons onClickEvent={onClickHandler}        >
            Bundle
        </CommonButtons>
    )
}

export default BundleButton