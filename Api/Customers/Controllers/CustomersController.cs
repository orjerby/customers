using Customers.Interfaces;
using Customers.Models;
using Customers.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Customers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Customer))]
        public IActionResult GetCustomer(string id)
        {
            var customer = _customerRepository.GetCustomer(id);
            
            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            return Ok(customer);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(Customer))]
        public IActionResult UpdateAddress(string id, AddressUpdate address)
        {
            var customer =  _customerRepository.UpdateAddress(id, address);

            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            return Ok(customer);
        }
    }
}
