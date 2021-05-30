using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodMatcherApp.Models;
using FoodMatcherApp.Data_Access;

namespace FoodMatcherApp.Controllers
{
    [Route("api/SessionLikes")]
    [ApiController]
    public class SessionLikeController : ControllerBase
    {
        SessionLikeRepository _repo;

        public SessionLikeController()
        {
            _repo = new SessionLikeRepository();
        }

        [HttpPost]
        public IActionResult AddASession(SessionLikes sessionLike)
        {
            _repo.AddASessionLike(sessionLike);
            return Created($"api/SessionLikes/{sessionLike.Id}", sessionLike);
        }

        [HttpGet("{userId}/{sessionId}")]
        public IActionResult GetLikesOfAUserPerSession(string userId, Guid sessionId)
        {
            var restaurants = _repo.GetLikesOfAUserPerSession(userId, sessionId);

            return Ok(restaurants);
        }

        [HttpGet("matches/{sessionId")]
        public IActionResult GetMatches(Guid sessionId)
        {
            var restaurants = _repo.GetMatches(sessionId);

            return Ok(restaurants);
        }
    }
}
