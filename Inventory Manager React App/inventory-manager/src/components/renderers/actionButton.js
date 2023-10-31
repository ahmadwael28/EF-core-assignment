import React from "react";

export const ActionButton = (params) => {
    const handleClick = () => {
        params?.clicked(params?.data)
    }
    return (
        <div onClick={handleClick}>
            {params?.icon}
        </div>
    )
}