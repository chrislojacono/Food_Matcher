using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Messages
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public Guid SessionId { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
