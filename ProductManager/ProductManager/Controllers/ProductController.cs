using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ProductManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly Context _context;

        public ProductController(Context context)
        {
            _context = context;
        }

        // GET: ProductController
        [HttpGet(Name = "GetProducts")]
        public async Task<ActionResult<List<Product>>> Index()
        {
            List<Product> products = await _context.Products.Select(
                p => new Product
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Image = p.Image,
                }).ToListAsync();

            if (products.Count < 0)
            {
                return NotFound();
            }
            else
            {
                return products;
            }
        }

        // GET: ProductController/Details/5
        [HttpGet("Details")]
        public async Task<ActionResult<Product>> Details(int id)
        {
            Product? product = await _context.Products.Select(p => new Product
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Quantity = p.Quantity,
                Image = p.Image,
            }).FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }
            else
            {
                return product;
            }
        }

        // POST: ProductController/Create
        [HttpPost("Create")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return HttpStatusCode.Created;
        }

        // POST: ProductController/Edit/5
        [HttpPut("Edit")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Edit(Product product)
        {
            Product oldProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == product.Id);
            oldProduct.Name = product.Name;
            oldProduct.Price = product.Price;
            oldProduct.Quantity = product.Quantity;
            oldProduct.Image = product.Image;
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        // POST: ProductController/Delete/5
        [HttpDelete("Delete/{Id}")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Delete(int id)
        {
            Product product = await _context.Products.FirstOrDefaultAsync(product => product.Id == id);
            if(product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return HttpStatusCode.OK;
            }
            else
            {
                return HttpStatusCode.NotFound;
            }
        }
    }
}
