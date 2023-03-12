using System.ComponentModel.DataAnnotations;

namespace Customers.Models
{
    public class Contract
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public ContractType Type { get; set; }
        public List<Package> Packages { get; set; }
    }

    public enum ContractType
    {
        BASIC,
        PREMIUM,
        VIP,
    }
}
