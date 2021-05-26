using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Restaurant
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }
        public string Image_Url { get; set; }
        public string Url { get; set; }
        public Int64 Distance { get; set; }
        public string YelpId { get; set; }

    }
}
