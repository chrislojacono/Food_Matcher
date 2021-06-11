using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class UserConnection
    {
        public string UserName { get; set; }
        public Guid SessionId { get; set; }
    }
}
