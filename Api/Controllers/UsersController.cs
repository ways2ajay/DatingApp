using API.Entities;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;
namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository userRepository):BaseApiController
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
}
