using Microsoft.AspNetCore.Identity;
using prs_api.Enums;

namespace prs_api.Data
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
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
