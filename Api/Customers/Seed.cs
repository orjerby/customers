using Customers.Data;
using Customers.Models;

namespace Customers
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.Customers.Any())
            {
                var customers = new List<Customer>()
                {
                    new Customer()
                    {
                        Id = "302815089",
                        FirstName = "אור",
                        LastName = "ג'רבי",
                        City = "קדימה-צורן",
                        Street = "ז'בוטינסקי",
                        HouseNumber = "6",
                        PostalCode = "6092000",
                        Contracts = new List<Contract>()
                        {
                            new Contract()
                            {
                                Id = "1",
                                Name = "רחל",
                                Type = ContractType.VIP,
                                Packages = new List<Package>()
                                {
                                    new Package()
                                    {
                                        Name = "מורחבת",
                                        Type = PackageType.LARGE,
                                        Amount = 17,
                                        Used = 3
                                    },
                                    new Package()
                                    {
                                        Name = "מתקדמת",
                                        Type = PackageType.MEDIUM,
                                        Amount = 5,
                                        Used = 1
                                    }
                                }
                            },
                            new Contract()
                            {
                                Id = "2",
                                Name = "שרון",
                                Type = ContractType.PREMIUM,
                                Packages = new List<Package>()
                                {
                                    new Package()
                                    {
                                        Name = "בסיסית",
                                        Type = PackageType.SMALL,
                                        Amount = 9,
                                        Used = 1
                                    },
                                }
                            },
                        },
                    },
                    new Customer()
                    {
                        Id = "308067230",
                        FirstName = "מיכל",
                        LastName = "שוורצמן",
                        City = "קדימה-צורן",
                        Street = "ז'בוטינסקי",
                        HouseNumber = "6",
                        PostalCode = "6092000",
                        Contracts = new List<Contract>()
                        {
                            new Contract()
                            {
                                Id = "3",
                                Name = "שמעון",
                                Type = ContractType.BASIC,
                                Packages = new List<Package>()
                                {
                                    new Package()
                                    {
                                        Name = "מורחבת",
                                        Type = PackageType.LARGE,
                                        Amount = 1,
                                        Used = 0
                                    },
                                    new Package()
                                    {
                                        Name = "בסיסית",
                                        Type = PackageType.SMALL,
                                        Amount = 5,
                                        Used = 3
                                    }
                                }
                            },
                            new Contract()
                            {
                                Id = "4",
                                Name = "יוסי",
                                Type = ContractType.PREMIUM,
                                Packages = new List<Package>()
                                {
                                    new Package()
                                    {
                                        Name = "בסיסית",
                                        Type = PackageType.LARGE,
                                        Amount = 24,
                                        Used = 22
                                    },
                                }
                            },
                        },
                    },
                    new Customer()
                    {
                        Id = "307020156",
                        FirstName = "דן",
                        LastName = "כהן",
                        City = "נתניה",
                        Street = "שיפר יעקב",
                        HouseNumber = "2",
                        PostalCode = "4249137",
                        Contracts = new List<Contract>()
                        {
                            new Contract()
                            {
                                Id = "5",
                                Name = "ריטה",
                                Type = ContractType.VIP,
                                Packages = new List<Package>()
                                {
                                    new Package()
                                    {
                                        Name = "מורחבת",
                                        Type = PackageType.LARGE,
                                        Amount = 4,
                                        Used = 4
                                    },
                                    new Package()
                                    {
                                        Name = "מתקדמת",
                                        Type = PackageType.MEDIUM,
                                        Amount = 2,
                                        Used = 0
                                    },
                                    new Package()
                                    {
                                        Name = "בסיסית",
                                        Type = PackageType.SMALL,
                                        Amount = 9,
                                        Used = 9
                                    }
                                }
                            },
                        },
                    }
                };

                dataContext.Customers.AddRange(customers);
                dataContext.SaveChanges();
            };
        }
    }
}
