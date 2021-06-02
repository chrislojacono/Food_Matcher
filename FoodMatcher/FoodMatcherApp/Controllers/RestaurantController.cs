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
                var Id = _repo.AddARestaurant(restaurant);
                return Ok(Id);    
        }

        [HttpGet("random/{sessionId}")]
        public IActionResult GetRandomRestaurant(Guid sessionId)
        {
            var restaurant = _repo.GetRandomRestaurantFromSession(sessionId);

            return Ok(restaurant);
        }
    }
}
