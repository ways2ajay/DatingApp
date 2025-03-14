
using API.DTOs;
using API.Entities;

namespace API;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllasync();
    Task<IEnumerable<AppUser?>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser?> GetUserByNameAsync(string username);

    Task<MemberDto?> GetMemeberByNameAsync(string username);
    Task<IEnumerable<MemberDto>> GetMemebersAsync();
}

