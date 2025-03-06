using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

    public class RegisterDto{
        [Required]
        public  string username { get; set; } =string.Empty;
        [Length(4, 8)]
        [Required]
        public  string password { get; set; } = string.Empty;
    }

