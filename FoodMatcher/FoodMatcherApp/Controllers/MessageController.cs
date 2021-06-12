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
    [Route("api/Messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        MessageRepository _repo;

        public MessageController()
        {
            _repo = new MessageRepository();
        }

        [HttpGet("{sessionId}")]
        public IActionResult GetSessionMessages(Guid sessionId)
        {
            var messages = _repo.GetSessionMessages(sessionId);

            return Ok(messages);
        }

    }
}
