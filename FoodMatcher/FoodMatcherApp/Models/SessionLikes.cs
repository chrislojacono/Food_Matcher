using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class SessionLikes
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid RestaurantId { get; set; }
        public Guid SessionId { get; set; }

    }
}
