using System.ComponentModel.DataAnnotations.Schema;
namespace API.Entities;
using System.ComponentModel.DataAnnotations;

[Table("Photos")]
public class Photo
{
    [Key]
    public string Id { get; set; } = null!;
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    public int AppUserId { get; set; }

    public AppUser AppUser { get; set; }= null!;
}

