using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Restaurant
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }
        public string Image_Url { get; set; }
        public string YelpUrl { get; set; }
        public string YelpId { get; set; }
        public double Distance { get; set; }
    }
}
