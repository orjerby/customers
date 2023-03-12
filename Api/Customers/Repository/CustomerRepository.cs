using Customers.Data;
using Customers.Interfaces;
using Customers.Models;
using Microsoft.EntityFrameworkCore;

namespace Customers.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _context;

        public CustomerRepository(DataContext context)
        {
            _context = context;
        }

        public Customer? GetCustomer(string id)
        {
            return _context.Customers.Include(customer => customer.Contracts).ThenInclude(contract => contract.Packages).SingleOrDefault(c => c.Id == id);
        }

        public Customer? UpdateAddress(string id, AddressUpdate address)
        {
            var customer = _context.Customers.Include(customer => customer.Contracts).ThenInclude(contract => contract.Packages).SingleOrDefault(c => c.Id == id);

            if (customer == null)
            {
                return null;
            }

            customer.City = address.City;
            customer.Street = address.Street;
            customer.HouseNumber = address.HouseNumber;
            customer.PostalCode = address.PostalCode;

            _context.SaveChanges();

            return customer;
        }
    }
}
