import React, { useState } from "react";
import { BasicSelect } from "../components/common/Select";
import { InputField } from "./common/inputField";
import Button from '@mui/material/Button';

import "./styles.css";

export const CategorySection = ({categories ,selectedCategory, handleCategoryChange, handleAddCategory}) => {
    const [categoryName, setCategoryName] = useState("");

    const handleAddClick = () => {
        if (categoryName) {
            handleAddCategory(categoryName);
            setCategoryName("");
        }
    }

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    }
    return (
        <div className="category-section-container">
            <div className="category-selector">
                <BasicSelect 
                    options={[{categoryId: -1, name: "Select category"}].concat(categories)} 
                    valuePropName={"categoryId"}
                    labelPropName={"name"}
                    label={"Categories"}
                    value={selectedCategory}
                    setValue={handleCategoryChange}
                />
            </div>
            <div className="add-category">
                <InputField 
                    id="category-name"
                    label="Category Name"
                    onChange={handleCategoryNameChange}
                    value={categoryName}
                />
                <Button variant="contained" onClick={handleAddClick} color="success">Add</Button>
            </div>
        </div>
        
    )
}