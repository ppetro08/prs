using Prs_Api.Models.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Prs_Api.Models.Authentication
{
    public class LoginRequestModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        public bool RememberMe { get; set; }
    }

    public class LoginResponseModel
    {
        public string Id { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public List<UserRoleModel> UserRoles { get; set; } = new List<UserRoleModel>();
    }
}
