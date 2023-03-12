using System;
using System.Xml.Serialization;

namespace Customers.Models
{
    [XmlRoot(ElementName = "ROWDATA")]
    public class CityXmlList
    {
        [XmlElement(ElementName = "ROW")]
        public List<CityXml> Cities { get; set; }
    }

    [XmlRoot(ElementName = "ROW")]
    public class CityXml
    {
        [XmlElement(ElementName = "סמל_ישוב")]
        public string Id { get; set; }
        [XmlElement(ElementName = "שם_ישוב")]
        public string Name { get; set; }
    }
}
