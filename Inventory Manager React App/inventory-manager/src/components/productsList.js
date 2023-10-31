import React from "react";
import { AgGrid } from "./common/AgGrid";
import { ActionButton } from "./renderers/actionButton";
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./styles.css"

export const ProductsList = ({data, handleDetailsClick, handleUpdateClick, handleDeleteClick}) => {
    const columns = [
        {field: "name", headerName: "Product Name", fiter: true, minWidth: 400, 
        cellStyle: function(params) {return {"text-align": 'left', "font-size":"20px"}},
        headerClass: "column-header"
        },
        {field: "price", fiter: true, minWidth: 150,
        cellStyle: function(params) {return {"text-align": 'left', "font-size":"20px"}},
        headerClass: "column-header"
        },
        { 
            field: '', 
            cellRenderer: ActionButton,
            maxWidth: 80,
            cellRendererParams: {
                clicked: function(field) {
                    handleDetailsClick && handleDetailsClick(field);
                },
                icon: <ArticleIcon/>
            }
          },
          { 
            field: '', 
            cellRenderer: ActionButton, 
            maxWidth: 80,
            cellRendererParams: {
                clicked: function(field) {
                  handleUpdateClick && handleUpdateClick(field);
                },
                icon: <EditIcon />
            }
          },
          { 
            field: '', 
            cellRenderer: ActionButton,
            maxWidth: 80,
            cellRendererParams: {
                clicked: function(field) {
                  handleDeleteClick && handleDeleteClick(field);
                },
                icon: <DeleteForeverIcon />
            }
          }
    ]
    return (
        <AgGrid  rowData={data} columnDefs={columns}/>
    )
}