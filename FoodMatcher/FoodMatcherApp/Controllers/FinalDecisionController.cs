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
    [Route("api/FinalDecision")]
    [ApiController]
    public class FinalDecisionController : ControllerBase
    {
        FinalDecisionRepository _repo;

        public FinalDecisionController()
        {
            _repo = new FinalDecisionRepository();
        }

        [HttpGet("{sessionId}")]
        public IActionResult GetFinalDecision(Guid sessionId)
        {
           var final = _repo.GetFinalDecision(sessionId);

            if (final == null)
            {
                return NotFound("No Final decision exists yet");
            }

            return Ok(final);
        }
        
        [HttpPost]
        public IActionResult AddAFinalDecision(FinalDecision final)
        {
            _repo.AddAFinalDecision(final);
            return Created($"api/FinalDecision/{final.Id}", final);
        }
    }
}
