using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using API.Data;
using API.Entities;
using API.DTOs;
using API;
using AutoMapper;


namespace API.Controllers;

    public class AccountController(DataContext context, ITokenService tokenService
    , IMapper mapper):BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto )
        {
            if (await UserExists(registerDto.username)){
                return BadRequest("Username is taken");
            }

            using var hmac = new HMACSHA512();
            var user = mapper.Map<AppUser>(registerDto);
            user.UserName = registerDto.username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto{
                UserName = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
            };

            // using var hmac = new HMACSHA512();
            // var user = new AppUser{
            //     UserName = registerDto.username.ToLower(),
            //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
            //     PasswordSalt = hmac.Key
            // };
            // context.Users.Add(user);
            // await context.SaveChangesAsync();

        }
        
        private async Task<bool> UserExists(string username){
            return await context.Users.AnyAsync(x=>x.UserName.ToLower() == username.ToLower());
        }

        [HttpPost("login")] 
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await context.Users
                .Include(x=>x.Photos)
                .SingleOrDefaultAsync(x=>x.UserName == loginDto.username.ToLower());
            if (user == null) 
                return Unauthorized("Invalid username");
            using var hmac = new HMACSHA512(user.PasswordSalt);   
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for (int i = 0; i < user.PasswordHash.Length; i++)
            {
                if (user.PasswordHash[i] != computedHash[i]) 
                    return Unauthorized("Invalid password");
            }  
            return new UserDto{
                UserName = user.UserName,
                Token = tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url,
                KnownAs = user.KnownAs,
            };
        }
    }
