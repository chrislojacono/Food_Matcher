using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string RestaurantId { get; set; }

    }
}
