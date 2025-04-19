namespace API.Extensions;
using System.Security.Claims;
using System.Security.Principal;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        return (user.FindFirst(ClaimTypes.NameIdentifier)?.Value) 
            ?? throw new Exception("No username found in token.");
         
    }
}