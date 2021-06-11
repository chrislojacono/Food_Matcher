using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string MessageDesc { get; set; }
        public string UserId { get; set; }
        public Guid SessionId { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
