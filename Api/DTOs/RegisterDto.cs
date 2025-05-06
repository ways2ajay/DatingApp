using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

    public class RegisterDto{
        [Required]
        public  string username { get; set; } =string.Empty;
        [Required]
        public  string? KnownAs { get; set; } 
        [Required]
        public  string? Gender { get; set; } 
        [Required]
        public  string? DateOfBirth { get; set; }
        [Required]
        public  string? City { get; set; }
        [Required]
        public  string? Country { get; set; } 
        [Length(4, 8)]
        [Required]
        public  string password { get; set; } = string.Empty;
    }

