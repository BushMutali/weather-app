import { MoonLoader } from "react-spinners"

const Loader = ({size, color}) => {
    return (
        <MoonLoader
            size={size}
            color={color}
            speedMultiplier={0.5}
        />
    )
}

export default Loader
