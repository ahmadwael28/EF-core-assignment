﻿using System;

namespace InventoryDomain
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public float price { get; set; }
        public int stock { get; set; }
        public Category ProductCategory { get; set; } = new Category();

    }
}