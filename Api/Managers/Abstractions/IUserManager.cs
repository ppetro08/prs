using Prs_Api.Models.Authentication;
using Prs_Api.Models.Dtos;

namespace Prs_Api.Managers
{
    public interface IUserManager
    {
        public Task<LoginResponseModel> Login(LoginRequestModel data);
        public Task<RegisterResponseModel> Register(RegisterRequestModel data);
        public Task<bool> ConfirmRegistration(ConfirmRegistrationRequestModel data);
        public Task<List<UserModel>> GetUsers();
    }
}
