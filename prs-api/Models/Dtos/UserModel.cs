using prs_api.Data;

namespace prs_api.Models.Dtos
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public bool IsEmailConfirmed { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<UserRoleModel> UserRoles { get; set; } = new List<UserRoleModel>();
        public List<MovieRequestModel> MovieRequests { get; set; } = new List<MovieRequestModel>();
    }

    public class UserRoleModel
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }

        public UserModel? User { get; set; } = null;
        public RoleModel? Role { get; set; } = null;
    }

    public class RoleModel 
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
