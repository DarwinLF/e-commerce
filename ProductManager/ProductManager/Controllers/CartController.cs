using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ProductManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "User")]
    public class CartController : ControllerBase
    {
        private readonly Context _context;

        public CartController(Context context)
        {
            _context = context;
        }

        // GET: CartController
        [HttpGet(Name = "GetCart")]
        public ActionResult<Object> Index(string userName)
        {
            var cart = _context.Carts
                .Select(c => new
                {
                    c.Id,
                    c.UserName,
                    c.TotalPrice,
                    Products = c.ProductCarts.Select(pc => new
                    {
                        ProductName = _context.Products.FirstOrDefault(p => p.Id == pc.ProductId).Name,
                        pc.ProductQuantity
                    }).ToList()
                }).Where(c => c.UserName == userName).FirstOrDefault();

            if (cart == null)
            {
                return NotFound();
            }
            else
            {
                return cart;
            }
        }

        // POST: ProductController/Create
        [HttpPost("Add")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> Add(Product product, int quantity)
        {
            if(await ExistingCart("prueba"))
            {
                await AddProductToCart(product, quantity, "prueba");
            }
            else
            {
                await MakeNewCart("prueba");
                await AddProductToCart(product, quantity, "prueba");
            }

            return HttpStatusCode.OK;
        }

        private async Task<bool> ExistingCart(string userName)
        {
            Cart? cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserName == userName);

            if (cart == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private async Task MakeNewCart(string user)
        {
            Cart cart = new Cart(0, user, 0);
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        private async Task AddProductToCart(Product product, int quantity, string userName)
        {
            Cart? cart = await _context.Carts.Include(c => c.ProductCarts).FirstOrDefaultAsync(c => c.UserName == userName);

            if(cart.ProductCarts.Any(pc => pc.ProductId == product.Id))
            {
                int productInCartIndex = cart.ProductCarts.FindIndex(pc => pc.ProductId == product.Id);
                cart.ProductCarts[productInCartIndex].ProductQuantity += quantity;
            }
            else
            {
                ProductCart productCart = new ProductCart(product.Id, cart.Id, quantity);
                _context.ProductsCarts.Add(productCart);
            }

            cart.TotalPrice += product.Price * quantity;

            await _context.SaveChangesAsync();
        }

        //// POST: ProductController/Edit/5
        //[HttpPut("Edit")]
        ////[ValidateAntiForgeryToken]
        //public async Task<HttpStatusCode> Edit(Product product)
        //{
        //    Product oldProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == product.Id);
        //    oldProduct.Name = product.Name;
        //    oldProduct.Price = product.Price;
        //    oldProduct.Quantity = product.Quantity;
        //    oldProduct.Image = product.Image;
        //    await _context.SaveChangesAsync();
        //    return HttpStatusCode.OK;
        //}

        // POST: ProductController/Delete/5
        [HttpDelete("DeleteItem/{userName}")]
        //[ValidateAntiForgeryToken]
        public async Task<HttpStatusCode> DeleteItem(string userName, int index)
        {
            Cart? cart = await _context.Carts.Include(c => c.ProductCarts).FirstOrDefaultAsync(c => c.UserName == userName);

            if(cart != null)
            {
                float productPrice = _context.Products.FirstOrDefault(p => p.Id == cart.ProductCarts[index].ProductId).Price;
                cart.TotalPrice -= cart.ProductCarts[index].ProductQuantity * productPrice;
                _context.ProductsCarts.Remove(cart.ProductCarts[index]);
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
