using Inventory_Manager.Models;
using InventoryDomain;
using InverntoryData.Models;
using InverntoryData.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_Manager.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category> categoryRepository;

        public CategoryController(IRepository<Category> categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAllCategories()
        {
            return Ok(categoryRepository.All());
        }

        [HttpGet("withProducts")]
        public ActionResult<IEnumerable<Product>> GetAllCategoriesWithProducts()
        {
            return Ok(categoryRepository.AllWithRelatedEntities());
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetCategories(int id)
        {
            var category = categoryRepository.Get(id);

            if (category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }

        [HttpGet("{id}/withProducts")]
        public ActionResult<Product> GetCategoryWithProducts(int id)
        {
            var category = categoryRepository.GetWithRelatedEntities(id);

            if (category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }


        [HttpPost]
        public IActionResult Create(CategoryModel model)
        {
            if (model == null) return BadRequest("Category data is required.");

            if (model.Name == null) return BadRequest("Category Name is required.");

            var category = new Category
            {
                Name = model.Name,
            };

            categoryRepository.Add(category);

            categoryRepository.SaveChanges();

            return Ok("Category Created");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CategoryModel model)
        {
            if (model == null) return BadRequest("Category data is required.");

            if (model.Name == null) return BadRequest("Category Name is required.");

            var category = categoryRepository.Get(id);

            if (category == null)
            {
                return NotFound("Category not found");
            }

            category.Name = model.Name;

            categoryRepository.Update(category);

            categoryRepository.SaveChanges();

            return Ok("Category Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = categoryRepository.Get(id);

            if (category == null)
            {
                return NotFound("Category not found");
            }

            categoryRepository.Delete(category);

            categoryRepository.SaveChanges();

            return Ok("Category Deleted Successfully");
        }
    }
}
