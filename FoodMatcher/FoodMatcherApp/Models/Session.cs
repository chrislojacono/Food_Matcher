using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Models
{
    public class Session
    {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public string Category { get; set; }
        public string SearchTerm { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
