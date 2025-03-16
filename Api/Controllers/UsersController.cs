using API.Entities;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper):BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
        var users = await userRepository.GetMemebersAsync();
        // var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
        return Ok(users);
    }

    // [HttpGet("{id:int}")]
    // public async Task<ActionResult<AppUser>> GetUser(int id){
    //     var user = await userRepository.GetUserByIdAsync(id);
    //     if(user == null){
    //         return NotFound();
    //     }
    //     return Ok(user);
    // }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username){
        var user = await userRepository.GetMemeberByNameAsync(username);
        if(user == null)
            return NotFound();
        // var usersToReturn = mapper.Map<MemberDto>(user);
        return user;
    }

    [HttpPut("updateUser")]
    public async Task<ActionResult> UpdateUser(MemeberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(username == null) return BadRequest("No username found in token.");

        var user = await userRepository.GetUserByNameAsync(username);
        if(user == null) return BadRequest("No user found.");
        mapper.Map(memberUpdateDto,user);

        if(await userRepository.SaveAllasync()) 
            return NoContent();

        return BadRequest("Failed to update the user.");

    }
}
