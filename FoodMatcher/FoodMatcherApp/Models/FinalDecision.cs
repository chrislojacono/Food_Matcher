using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class FinalDecision
    {
        public int Id { get; set; }
        public Guid SessionId { get; set; }
        public Guid RestaurantId { get; set; }
    }
}
