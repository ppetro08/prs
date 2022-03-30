using Prs_Api.Models;
using Prs_Api.Models.Authentication;

namespace Prs_Api.Services.Abstractions
{
    public interface IUserService
    {
        public Task<LoginResponseModel> Login(LoginRequestModel data);
        public Task<RegisterResponseModel> Register(RegisterRequestModel data);
        public Task<bool> ConfirmRegistration(ConfirmRegistrationRequestModel data);
        public Task<List<User>> GetUsers();
    }
}
