using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Question1.Data;
using Question1.Model;


[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        if (product == null || product.Inventory == null)
            return BadRequest("Invalid product or inventory data.");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            Console.WriteLine($"Received Product: {product.ProductName}, Price: {product.Price}");
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "An error occurred while creating the product.");
        }
    }

    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(p => p.Inventory)
            .FirstOrDefaultAsync(p => p.ProductId == id);

        if (product == null)
            return NotFound("Product not found.");

        return Ok(product);
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
    {
        if (updatedProduct == null || updatedProduct.Inventory == null)
            return BadRequest("Invalid product or inventory data.");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var existingProduct = await _context.Products
                .Include(p => p.Inventory)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (existingProduct == null)
                return NotFound("Product not found.");

         
            existingProduct.ProductName = updatedProduct.ProductName;
            existingProduct.Price = updatedProduct.Price;


            existingProduct.Inventory.QuantityInStock = updatedProduct.Inventory.QuantityInStock;
            existingProduct.Inventory.WarehouseLocation = updatedProduct.Inventory.WarehouseLocation;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return Ok(existingProduct);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "An error occurred while updating the product.");
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            
            var products = await _context.Products
                .Include(p => p.Inventory)
                .ToListAsync();

         
            if (products == null || !products.Any())
                return NotFound("No products found.");

            return Ok(products);
        }
        catch (Exception ex)
        {
        
            Console.WriteLine($"Error: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving the products.");
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var product = await _context.Products
                .Include(p => p.Inventory)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return NotFound("Product not found.");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return NoContent();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "An error occurred while deleting the product.");
        }
    }
}
