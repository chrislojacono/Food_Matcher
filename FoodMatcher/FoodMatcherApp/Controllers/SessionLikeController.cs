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
        public IActionResult AddASessionLike(SessionLikes sessionLike)
        {
            var isAMatch = _repo.AddASessionLike(sessionLike);
            return Ok(isAMatch);
        }

        [HttpGet("{userId}/{sessionId}")]
        public IActionResult GetLikesOfAUserPerSession(string userId, Guid sessionId)
        {
            var restaurants = _repo.GetLikesOfAUserPerSession(userId, sessionId);

            return Ok(restaurants);
        }

        [HttpGet("matches/{sessionId}")]
        public IActionResult GetMatches(Guid sessionId)
        {
            var restaurants = _repo.GetMatches(sessionId);

            return Ok(restaurants);
        }

        [HttpDelete("{userId}/{sessionId}/{restaurantId}")]
        public IActionResult RemoveALike(string userId, Guid sessionId, Guid restaurantId)
        {
            _repo.RemoveALike(userId,sessionId,restaurantId);
            return NoContent();
        }
    }
}
