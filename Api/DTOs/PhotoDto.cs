

namespace API.DTOs;

public class PhotoDto
{
    public string Id { get; set; } = null!;
    public bool IsMain { get; set; }
    public string? Url { get; set; }
}