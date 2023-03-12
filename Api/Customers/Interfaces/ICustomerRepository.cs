using Customers.Models;

namespace Customers.Interfaces
{
    public interface ICustomerRepository
    {
        Customer? GetCustomer(string id);
        Customer? UpdateAddress(string id, AddressUpdate address);
    }
}
