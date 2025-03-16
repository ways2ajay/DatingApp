namespace API.DTOs;

public class MemeberUpdateDto
{
    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public required string City { get; set; }
    public required string  Country { get; set; }
}