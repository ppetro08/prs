using Microsoft.AspNetCore.Identity;
using Prs_Api.Data;
using Prs_Api.Models.Enums;

namespace Prs_Api.Models
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public virtual List<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public virtual List<MovieRequest> MovieRequests { get; set; } = new List<MovieRequest>();
        public virtual List<TvRequest> TvRequests { get; set; } = new List<TvRequest>();
    }

    public class UserRole : IdentityUserRole<Guid>
    {
        public User? User { get; set; } = null;
        public Role? Role { get; set; } = null;
    }

    public class Role : IdentityRole<Guid>
    {
        public Role() { }
        public Role(Roles role) : base(role.ToString()) { }
        public Role(string roleName) : base(roleName) { }

        public virtual List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
