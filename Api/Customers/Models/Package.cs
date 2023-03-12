using System.ComponentModel.DataAnnotations;

namespace Customers.Models
{
    public class Package
    {
        public int Id { get; set; }
        [Required]
        public PackageType Type { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public int Used { get; set; }
    }

    public enum PackageType
    {
        SMALL,
        MEDIUM,
        LARGE,
    }
}
