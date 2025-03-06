using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
/// <summary>
/// This controller is used to test the global error handling in the application.
/// </summary>
public class BuggyController:BaseApiController
{
    private readonly DataContext _context;
    public BuggyController(DataContext context)
    {
        _context = context;
    }
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }
    [HttpGet("not-found")]
    public  ActionResult GetNotFound()
    {
        var thing = _context.Users.Find(-1);
        if (thing == null) return NotFound();
        return Ok(thing);
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        var thing = _context.Users.Find(-1)?? throw new Exception("A bad thing happened.");
        var thingToReturn = thing.ToString();
        return Ok(thingToReturn);
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }

    [HttpGet("bad-request/{id}")]
    public ActionResult GetBadRequest(int id)
    {
        return BadRequest();
    }
}