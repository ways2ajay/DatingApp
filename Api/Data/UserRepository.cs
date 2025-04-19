
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.Include(u=>u.Photos).FirstOrDefaultAsync( u => u.Id == id);
    }

    public async Task<AppUser?> GetUserByNameAsync(string username)
    {
        return await context.Users.Include(u => u.Photos)
        .SingleOrDefaultAsync(u=> u.UserName == username);
    }

    public async Task<IEnumerable<AppUser?>> GetUsersAsync()
    {
        return await context.Users.Include(u=> u.Photos).ToListAsync();
    }

    public async Task<MemberDto?> GetMemeberByNameAsync(string username){
        return await context.Users
        .Where(x=> x.UserName== username)
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMemebersAsync(){
        return await context.Users
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }


    public async Task<bool> SaveAllasync()
    {
        return await context.SaveChangesAsync() >0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}