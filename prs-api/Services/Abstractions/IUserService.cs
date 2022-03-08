using prs_api.Data;
using prs_api.Models.Authentication;

namespace prs_api.Services.Abstractions
{
    public interface IUserService
    {
        public Task<LoginResponseModel> Login(LoginRequestModel data);
        public Task<RegisterResponseModel> Register(RegisterRequestModel data);
        public Task<bool> ConfirmRegistration(ConfirmRegistrationRequestModel data);
        public Task<List<User>> GetUsers();
    }
}
