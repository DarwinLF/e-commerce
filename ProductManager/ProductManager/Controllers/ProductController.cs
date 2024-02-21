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
        public async Task<ActionResult<List<Product>>> Index()
        {
            List<Product> products = await _context.Products.ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found");
            }

            foreach (var item in products)
            {
                item.Image = functions.GetImage(item.Image);
            }

            return products;
        }

        // GET: ProductController/Details/5
        [HttpGet("Details")]
        public async Task<ActionResult<ProductDTO>> Details(int id)
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
                ProductDTO productDTO = new ProductDTO
                {
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    Image = functions.GetImage(product.Image),
                    fileName = Path.GetFileName(product.Image),
                };
                return productDTO;
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
        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                var imageFile = Request.Form.Files[0];

                var filePath = "./Images/" + imageFile.FileName;

                Product? oldProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

                if (oldProduct != null)
                {
                    oldProduct.Name = Request.Form["name"];
                    oldProduct.Price = float.Parse(Request.Form["price"]);
                    oldProduct.Quantity = Int32.Parse(Request.Form["quantity"]);
                    oldProduct.Image = filePath;
                    await _context.SaveChangesAsync();

                    if (!System.IO.File.Exists(filePath))
                    {
                        using (var fileStream = System.IO.File.Create(filePath))
                        {
                            imageFile.CopyTo(fileStream);
                        }
                    }

                    return Ok(oldProduct);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest("Duplicate Name");
            }

        }

        // POST: ProductController/Delete/5
        [HttpDelete("Delete")]
        [Authorize(Roles = "Admin")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Delete(int id)
        {
            Product? product = await _context.Products.FirstOrDefaultAsync(product => product.Id == id);
            Console.WriteLine(product.Name);
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
