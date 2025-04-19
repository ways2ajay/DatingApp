using API.Entities;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;
using System.Security.Claims;
using API.Interfaces;
using API.Extensions;
using System.Collections.Frozen;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper
,IPhotoService photoService):BaseApiController
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

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file){
        var user = await userRepository.GetUserByNameAsync(User.GetUsername());

        if(user == null) return BadRequest("No user found.");

        var result = photoService.AddPhotoAsync(file);

        if(result.Result.Error != null) return BadRequest(result.Result.Error.Message);

        var photo = new Photo{
            Url = result.Result.SecureUrl.AbsoluteUri,
            PublicId = result.Result.PublicId,
            Id = result.Result.PublicId
            };

        user.Photos.Add(photo);

        if(await userRepository.SaveAllasync()){
            return CreatedAtAction(nameof(GetUser)
                ,new{username=user.UserName},mapper.Map<PhotoDto>(photo));
            // return mapper.Map<PhotoDto>(photo);
        }
        return BadRequest("Problem adding photo.");
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(string photoID){
        var user = await userRepository.GetUserByNameAsync(User.GetUsername());
        if(user == null) return BadRequest("No user found.");
        photoID = System.Uri.UnescapeDataString(photoID);
        var photo = user.Photos.FirstOrDefault(x => x.Id == photoID);
        if(photo == null) return NotFound("No photo found.");
        if(photo.IsMain) return BadRequest("This is already your main photo.");

        var currentMain = user.Photos.FirstOrDefault(x=> x.IsMain);
        if(currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;
        if(await userRepository.SaveAllasync()) return NoContent();
        return BadRequest("Failed to set main photo.");
    }

    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(string photoId){
        var user = await userRepository.GetUserByNameAsync(User.GetUsername());
        if(user == null) return BadRequest("No user found.");
        photoId = System.Uri.UnescapeDataString(photoId);
        var photo = user.Photos.FirstOrDefault(x => x.Id ==  photoId);
        if(photo == null || photo.IsMain) return BadRequest("This photo can not be deleted.");
        if(photo.PublicId!= null){
            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
        }
        user.Photos.Remove(photo);
        if(await userRepository.SaveAllasync())
            return Ok();
        return BadRequest("Failed to delete the photo.");
    }
}
