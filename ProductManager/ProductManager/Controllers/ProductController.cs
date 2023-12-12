using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.IO;
using ProductManager.Functions;

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
        public async Task<ActionResult<List<ProductDTO>>> Index()
        {
            List<Product> products = await _context.Products.ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found");
            }

            List<ProductDTO> productsDTO = new List<ProductDTO>();

            foreach (var item in products)
            {
                productsDTO.Add(new ProductDTO()
                {
                    Name = item.Name,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Image = functions.GetImage(item.Image)
                });
            }

            Console.WriteLine(products[0].Image);
            Console.WriteLine(productsDTO[0].Image);


            return productsDTO;
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
        [Authorize(Roles = "Admin")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create()
        {
            try
            {
                var imageFile = Request.Form.Files[0];

                var filePath = "./Images/" + imageFile.FileName;

                Product product = new Product()
                {
                    Name = Request.Form["name"],
                    Price = float.Parse(Request.Form["price"]),
                    Quantity = Int32.Parse(Request.Form["quantity"]),
                    Image = filePath,
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                if (!System.IO.File.Exists(filePath))
                {
                    using (var fileStream = System.IO.File.Create(filePath))
                    {
                        imageFile.CopyTo(fileStream);
                    }
                }

                return Created("", product);
            }
            catch (Exception ex)
            {
                return BadRequest("Duplicate Name");
            }
            
        }

        // POST: ProductController/Edit/5
        [HttpPut("Edit")]
        [Authorize(Roles = "Admin")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Edit(Product product)
        {
            Product? oldProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == product.Id);
            if(oldProduct != null) {
                oldProduct.Name = product.Name;
                oldProduct.Price = product.Price;
                oldProduct.Quantity = product.Quantity;
                oldProduct.Image = product.Image;
                await _context.SaveChangesAsync();
                return HttpStatusCode.OK;
            }

            return HttpStatusCode.NotFound;

        }

        // POST: ProductController/Delete/5
        [HttpDelete("Delete/{Id}")]
        [Authorize(Roles = "Admin")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Delete(int id)
        {
            Product? product = await _context.Products.FirstOrDefaultAsync(product => product.Id == id);
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
