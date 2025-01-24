using Microsoft.EntityFrameworkCore;
using Question1.Model;

namespace Question1.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductInventory> ProductsInventories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductInventory>()
            .HasKey(pi => pi.InventoryId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Inventory)
                .WithOne(i => i.Product)
                .HasForeignKey<ProductInventory>(i => i.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }


    }
}
