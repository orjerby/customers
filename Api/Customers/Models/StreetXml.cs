using System.Xml.Serialization;

namespace Customers.Models
{
    [XmlRoot(ElementName = "ROWDATA")]
    public class StreetXmlList
    {
        [XmlElement(ElementName = "ROW")]
        public List<StreetXml> Streets { get; set; }
    }

    [XmlRoot(ElementName = "ROW")]
    public class StreetXml
    {
        [XmlElement(ElementName = "סמל_ישוב")]
        public string CityId { get; set; }
        [XmlElement(ElementName = "שם_רחוב")]
        public string Name { get; set; }
    }
}
