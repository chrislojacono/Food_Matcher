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
    [Route("api/Sessions")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        SessionRepository _repo;

        public SessionController()
        {
            _repo = new SessionRepository();
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleSessionById(Guid id)
        {
            var session = _repo.GetASessionById(id);

            if (session == null)
            {
                return NotFound("This product does not exist");
            }

            return Ok(session);
        }

        [HttpGet("byUserId/{userId}")]
        public IActionResult GetSingleSessionByUserId(string userId)
        {
            var session = _repo.GetASessionByUserId(userId);
            return Ok(session);
        }

        [HttpPost]
        public IActionResult AddASession(Session session)
        {
            var Id = _repo.AddASession(session);
            return Ok(Id);
        }

        [HttpPut("{sessionId}/Complete")]
        public IActionResult SessionComplete(Guid sessionId)
        {
            _repo.CompleteSession(sessionId);

            return NoContent();
        }

        [HttpPut("setJoiner/{sessionId}/{userId}")]
        public IActionResult SetUser2Id(Guid sessionId, string userId)
        {
            _repo.SetUser2Id(sessionId, userId);

            return NoContent();
        }

        [HttpDelete("{sessionId}")]
        public IActionResult DeleteSession(Guid sessionId)
        {
            _repo.DeleteSession(sessionId);
            return NoContent();
        }

    }
}
