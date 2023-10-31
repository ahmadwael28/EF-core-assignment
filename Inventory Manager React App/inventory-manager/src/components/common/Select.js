import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BasicSelect = ({options, label, labelPropName, valuePropName,value, setValue }) => {
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: "80%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="categories"
          id="categories"
          value={value}
          label="Categories"
          onChange={handleChange}
        >
          {options && Array.isArray(options) ?
          
            options.map(function(item, i){
              return <MenuItem 
              style={{height: "30px"}}
              key={item[valuePropName] || i} 
              value={item[valuePropName]}>
                {item[labelPropName]}
                </MenuItem>
            })

          : null}
        </Select>
      </FormControl>
    </Box>
  );
}