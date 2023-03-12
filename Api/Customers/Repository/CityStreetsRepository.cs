using Customers.Data;
using Customers.Interfaces;
using Customers.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Xml.Serialization;

namespace Customers.Repository
{
    public class CityStreetsRepository : ICityStreetsRepository
    {
        private readonly IMemoryCache _cache;

        public CityStreetsRepository(IMemoryCache cache)
        {
            _cache = cache;
        }

        public List<CityStreet> GetCityStreets()
        {
            List<CityStreet> cityStreets;

            if (!_cache.TryGetValue("cityStreets", out cityStreets))
            {
                cityStreets = GetCityStreetsData();

                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromDays(30));

                _cache.Set("cityStreets", cityStreets, cacheOptions);
            }

            return cityStreets;
        }

        private List<CityStreet> GetCityStreetsData()
        {
            CityXmlList citiesXml = DeserializeCitiesXml("./cities.xml");
            StreetXmlList streetsXml = DeserializeStreetsXml("./streets.xml");

            List<CityStreet> cityStreets = citiesXml.Cities
                .GroupJoin(streetsXml.Streets, c => c.Id, s => s.CityId, (c, s) => new CityStreet
                {
                    Id = c.Id,
                    Name = c.Name,
                    Streets = s.Select(x => x.Name).ToList()
                })
                .ToList();

            return cityStreets;
        }

        private CityXmlList DeserializeCitiesXml(string xml)
        {
            CityXmlList cityXmlList = new CityXmlList();
            var serializer = new XmlSerializer(typeof(CityXmlList));
            string xmlData = System.IO.File.ReadAllText(xml);
            using (TextReader reader = new StringReader(xmlData))
            {
                cityXmlList = (CityXmlList)serializer.Deserialize(reader);
            }
            return cityXmlList;
        }

        private StreetXmlList DeserializeStreetsXml(string xml)
        {
            StreetXmlList streetXmlList = new StreetXmlList();
            var serializer = new XmlSerializer(typeof(StreetXmlList));
            string xmlData = System.IO.File.ReadAllText(xml);
            using (TextReader reader = new StringReader(xmlData))
            {
                streetXmlList = (StreetXmlList)serializer.Deserialize(reader);
            }
            return streetXmlList;
        }
    }
}