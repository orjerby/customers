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
    public class CityStreetsController : ControllerBase
    {
        private readonly ICityStreetsRepository _cityStreetsRepository;

        public CityStreetsController(ICityStreetsRepository cityStreetsRepository)
        {
            _cityStreetsRepository = cityStreetsRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<CityStreet>))]
        public IActionResult GetCityStreets()
        {
            var cityStreets = _cityStreetsRepository.GetCityStreets();

            if (cityStreets == null)
            {
                return NotFound("Cities/Streets are not found");
            }

            return Ok(cityStreets);
        }
    }
}
