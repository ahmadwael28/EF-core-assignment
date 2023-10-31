import React from "react";
import TextField from '@mui/material/TextField';

export const InputField = ({id, label, onChange, value, isMultiline, type}) => {
    return (
        <TextField 
            id={id}
            label={label}
            variant="outlined"
            onChange={onChange}
            value={value}
            multiline={isMultiline}
            rows={4}
            type={type}
        />
    )
}