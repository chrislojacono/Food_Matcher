using FoodMatcherApp.Data_Access;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodMatcherApp.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;

        public UserController()
        {
            _repo = new UserRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAllUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleUserById(string id)
        {
            var user = _repo.GetSingleUser(id);

            if (user == null)
            {
                return NotFound("This user does not exist.");
            }

            return Ok(user);
        }
    }
}
