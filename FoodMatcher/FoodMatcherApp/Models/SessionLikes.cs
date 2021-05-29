using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class SessionLikes
    {
        public int Id { get; set; }
<<<<<<< HEAD
        public string UserId { get; set; }
=======
        public Guid UserId { get; set; }
>>>>>>> main
        public Guid RestaurantId { get; set; }
        public Guid SessionId { get; set; }

    }
}
