using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodMatcherApp.Data_Access;

namespace FoodMatcherApp.Controllers
{
    [Route("api/Restaurants")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        RestaurantRepository _repo;

        public RestaurantController()
        {
            _repo = new RestaurantRepository();
        }


    }
}
