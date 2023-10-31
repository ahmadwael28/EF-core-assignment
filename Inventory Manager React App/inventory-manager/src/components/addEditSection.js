import React, { useEffect, useState } from "react";
import { InputField } from "./common/inputField";
import { BasicSelect } from "../components/common/Select";
import Button from '@mui/material/Button';
import { postRequest, putRequest } from "../helpers/restHelper";
import { Notification } from "./common/Snackbar";
import config from '../appConfig.json'

export const AddEditSection = ({categories, handleFetchProducts, editedProduct, cancelEditing}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    const resetInputs =() => {
        setName("");
        setDescription("");
        setPrice(0);
        setStock(0);
        setSelectedCategory(0)
    }

    const bindEditedProductDataToInputs = () => {
        if (editedProduct) {
            setName(editedProduct.name);
            setDescription(editedProduct.description);
            setPrice(editedProduct.price);
            setStock(editedProduct.stock);
            setSelectedCategory(editedProduct.categoryId);
        } else {
            resetInputs()
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleStockChange = (e) => {
        setStock(e.target.value);
    }

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    const handleAddProductSuccess = () => {
        handleFetchProducts && handleFetchProducts();        

        if (editedProduct) {
            cancelEditing && cancelEditing();
            setMessage("Product Updated Successfully.");
        } else {
            setMessage("Product Added Successfully.");
        }
        resetInputs();
        setSeverity("success");
        setOpen(true);
    }

    const validateInputs = () => {
        if (!name) {
            setSeverity("error");
            setMessage("Product Name is required.")
            setOpen(true);
            return false;
        }
        else if (price < 0) {
            setSeverity("error");
            setMessage("Price must be a positive number.")
            setOpen(true);
            return false;
        }
        else if (stock < 0) {
            setSeverity("error");
            setMessage("In stock value must be a positive number.")
            setOpen(true);
            return false;
        } else if (selectedCategory < 0) {
            setSeverity("error");
            setMessage("Please select a category.")
            setOpen(true);
            return false;
        }
        return true;
    }

    const handleAddClick = () => {        
        if (validateInputs()) {
            if (editedProduct) {
                const dto = { name, description, price, stock, categoryId: selectedCategory}
                const url = config.services.products.updateProduct.replace("{id}", editedProduct.productId);
                putRequest(url, dto, handleAddProductSuccess);
            } else {
                const dto = { name, description, price, stock, categoryId: selectedCategory}
                const url = config.services.products.addProduct;
                postRequest(url, dto, handleAddProductSuccess);
            }
        }
    }

    const handleCancelClick = () => {
        if (editedProduct)
            cancelEditing && cancelEditing();
        resetInputs();
    }

    useEffect(() => {
        bindEditedProductDataToInputs();
    }, [editedProduct])

    return (
        <div className="addedit-section-container">
            <div className="left-section">
                <InputField 
                    id="product-name"
                    label="Product Name"
                    onChange={handleNameChange}
                    value={name}
                />
                <InputField 
                    id="product-price"
                    label="Product Price"
                    onChange={handlePriceChange}
                    value={price}
                    type="number"
                />

                <InputField 
                    id="product-stock"
                    label="In Stock"
                    onChange={handleStockChange}
                    value={stock}
                    type="number"
                />
            </div>
            
            <div className="middle-section">
                <InputField 
                    id="product-desc"
                    label="Description"
                    onChange={handleDescriptionChange}
                    value={description}
                    isMultiline={true}
                />

                <BasicSelect 
                    options={[{categoryId: -1, name: "Select category"}].concat(categories)} 
                    valuePropName={"categoryId"}
                    labelPropName={"name"}
                    label={"Category"}
                    value={selectedCategory}
                    setValue={handleCategoryChange}
                />
            </div>

            <div className="right-section">
                <Button variant="contained" onClick={handleAddClick} color="success">
                    {editedProduct ? "Save Changes" : "Add"}
                </Button>

                <Button variant="contained" onClick={handleCancelClick} color="error">Cancel</Button>
            </div>
            
            <Notification severity={severity} message={message} open={open} handleClose={handleClose}/>
        </div>
    )
}