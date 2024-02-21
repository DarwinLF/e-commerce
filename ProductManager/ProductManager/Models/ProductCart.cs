using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Models
{
    [PrimaryKey(nameof(ProductId), nameof(CartId))]
    public class ProductCart
    {
        public int ProductId { get; set; }
        public int CartId { get; set; }
        public int ProductQuantity { get; set; }
        public Product Product { get; set; } = null!;
        public Cart Cart { get; set; } = null!;

        public ProductCart(int productId, int cartId, int productQuantity)
        {
            ProductId = productId;
            CartId = cartId;
            ProductQuantity = productQuantity;
        }
    }
}
