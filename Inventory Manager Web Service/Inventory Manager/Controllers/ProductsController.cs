using Inventory_Manager.Models;
using InventoryDomain;
using InverntoryData;
using InverntoryData.Models;
using InverntoryData.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_Manager.Controllers
{

    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IRepository<Product> productRepository;
        private readonly IRepository<Category> categoryRepository;

        public ProductsController(IRepository<Product> productRepository, IRepository<Category> categoryRepository)
        {
            this.productRepository = productRepository;
            this.categoryRepository = categoryRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAllProducts()
        {
            return Ok(productRepository.All());
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = productRepository.Get(id);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("{id}/withCategory")]
        public ActionResult<Product> GetProductWithCategory(int id)
        {
            var product = productRepository.GetWithRelatedEntities(id);

            if (product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Create(ProductModel model)
        {
            if (model == null) return BadRequest("Product data is required.");

            if (model.CategoryId == null) return BadRequest("Product category id is required.");

            var category = categoryRepository.Find(category => category.CategoryId == model.CategoryId).FirstOrDefault();

            if (category == null) return NotFound($"cagegory with category id {model.CategoryId} was not found.");


            var product = new Product
            {
                Name = model.Name,
                Description = model.Description,
                price = model.price,
                stock = model.stock,
            };

            category.Products.Add(product);

            categoryRepository.Update(category);


            categoryRepository.SaveChanges();

            return Ok("Product Created");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ProductModel model)
        {
            if (model == null) return BadRequest("Product data is required.");

            if (model.CategoryId == null)
            {
                return NotFound("CategoryId Must be provided");
            }

            var product = productRepository.Get(id);

            if (product == null)
            {
                return NotFound("Product not found");
            }

            var category = categoryRepository.Get(model.CategoryId);

            if (category == null)
            {
                return NotFound("Category not found");
            }

            product.Name = model.Name;
            product.Description = model.Description;
            product.price = model.price;
            product.stock = model.stock;
            product.ProductCategory = category;



            productRepository.Update(product);

            productRepository.SaveChanges();

            return Ok("Product Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var product = productRepository.Get(id);

            if (product == null)
            {
                return NotFound("Product not found");
            }


            productRepository.Delete(product);

            productRepository.SaveChanges();

            return Ok(product.ProductId);
        }
    }
}
