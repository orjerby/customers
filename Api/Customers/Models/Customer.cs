using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.IO;

namespace Customers.Models
{
    public class Customer
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }
        public List<Contract> Contracts { get; set; }
    }
}
