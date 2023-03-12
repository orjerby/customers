using Customers.Models;

namespace Customers.Interfaces
{
    public interface ICityStreetsRepository
    {
        List<CityStreet> GetCityStreets();
    }
}
