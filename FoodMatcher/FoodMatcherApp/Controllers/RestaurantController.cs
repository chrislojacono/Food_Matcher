using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodMatcherApp.Data_Access;
using FoodMatcherApp.Models;

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

        [HttpPost]
        public IActionResult AddARestaurant(Restaurant restaurant)
        {
            _repo.AddARestaurant(restaurant);

            return Created($"api/Restaurants/{restaurant.Id}", restaurant);
        }
    }
}
