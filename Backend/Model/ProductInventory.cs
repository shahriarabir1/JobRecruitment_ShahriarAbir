using System.Text.Json.Serialization;

namespace Question1.Model
{
    public class ProductInventory
    {
        [JsonIgnore]
        public int InventoryId { get; set; }
        public int ProductId { get; set; }
        public int QuantityInStock { get; set; }
        public string WarehouseLocation { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
