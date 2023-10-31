import React, {useState, useEffect} from "react";
import { ProductsList } from "../components/productsList";
import { CategorySection } from "../components/categorySection";
import { DetailsDialog } from "../components/common/detailsDialog";
import { getRequest, deleteRequest, postRequest } from "../helpers/restHelper";
import { AddEditSection } from "../components/addEditSection";
import { Notification } from "../components/common/Snackbar";

import config from '../appConfig.json'
import "./ManagementPageStyles.css";


export const ManagementPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [categories, setCategories] = useState({});
    const [products, setProducts] = useState([]);
    const [dialogInfo, setDialogInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [openNotification, setOpenNotification] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
  
        setOpenNotification(false);
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDialogInfo({});
    };

    const deleteProductCallBack = (productId) => {
        const objWithIdIndex = products.findIndex((obj) => obj.productId == productId);
        if (typeof objWithIdIndex == "number" && objWithIdIndex >= 0 ){
            const newProducts = products;
            newProducts.splice(objWithIdIndex, 1);
            setProducts([...newProducts]);
        }
    }

    const handleDetailsClick = (field) => {
        setDialogInfo(field);
        handleClickOpen();
    }

    const handelCancelEditing = () => {
        setEditedProduct(null);
    }

    const handleUpdateClick = (field) => {
        field.categoryId = selectedCategory;
        setEditedProduct(field);
    }
    

    const handleDeleteClick = (field) => {
        const url = config.services.products.deleteProduct.replace('{id}', field.productId);
        deleteRequest(url, deleteProductCallBack);
    }

    const handleSetProducts = (data) => {
        setProducts(data.products);
    }

    const fetchProducts = () => {
        const url = config.services.categories.getCategoriesWithProducts.replace('{id}', selectedCategory);
            getRequest(url, handleSetProducts);
    }

    const handleCategoryChange = (value) => { 
        if (value) {
            setSelectedCategory(value);
        }
    }

    const handleSetCategories = (data) => {
        setCategories(data);
    }

    const fetchCategories = () => {
        getRequest(config.services.categories.getAllCategories, handleSetCategories);
    }

    const handleAddCategorySuccess = () => {
        setSeverity("success");
        setMessage("Category Added Successfully.")
        setOpenNotification(true);
        fetchCategories();
    }

    const handleAddCategory = (name) => {
        if (name && name.length) {
            const url = config.services.categories.addCategory;
            postRequest(url, {name: name}, handleAddCategorySuccess);
        }
    }

    useEffect (() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if(typeof selectedCategory == 'number' && selectedCategory >= 0) {
            fetchProducts();
        }
    }, [selectedCategory])
    
    return (
        <div className="page-container">
            <div className="top-section-container">
                <div className="input-container">
                    <CategorySection 
                        categories={categories}
                        handleCategoryChange={handleCategoryChange}
                        selectedCategory={selectedCategory}
                        handleAddCategory={handleAddCategory}
                    />
                </div>
                <div className="divider"></div>
                <div className="product-editor">
                    <AddEditSection 
                        categories={categories} 
                        handleFetchProducts={fetchProducts} 
                        editedProduct={editedProduct}
                        cancelEditing={handelCancelEditing}
                    />
                </div>
            
            </div>
            <div className="product-list-section">
                <ProductsList 
                    data={products}
                    handleDetailsClick={handleDetailsClick}
                    handleUpdateClick={handleUpdateClick}
                    handleDeleteClick={handleDeleteClick}
                />
            </div>
            <DetailsDialog 
                dialogInfo={dialogInfo}
                open={open}
                handleClose={handleClose}
            />
            <Notification severity={severity} message={message} open={openNotification} handleClose={handleNotificationClose}/>
        </div>
    )
}