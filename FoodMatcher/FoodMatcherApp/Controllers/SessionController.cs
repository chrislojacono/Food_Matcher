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

        [HttpPost]
        public IActionResult AddASession(Session session)
        {
            _repo.AddASession(session);
            return Created($"api/Sessions/{session.Id}", session);
        }

        [HttpPut("{sessionId}/Complete")]
        public IActionResult SessionComplete(Guid sessionId)
        {
            _repo.CompleteSession(sessionId);

            return NoContent();
        }

    }
}
