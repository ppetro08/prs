using AutoMapper;
using Prs_Api.Models.Authentication;
using Prs_Api.Models.Dtos;
using Prs_Api.Services.Abstractions;

namespace Prs_Api.Managers
{
    // TODO - Validation against current user
    public class UserManager: IUserManager
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserManager(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<LoginResponseModel> Login(LoginRequestModel data)
        {
            return await _userService.Login(data);
        }
        public async Task<RegisterResponseModel> Register(RegisterRequestModel data)
        {
            return await _userService.Register(data);
        }
        public async Task<bool> ConfirmRegistration(ConfirmRegistrationRequestModel data)
        {
            return await _userService.ConfirmRegistration(data);  
        }
        public async Task<List<UserModel>> GetUsers()
        {
            return (await _userService.GetUsers()).Select(u => _mapper.Map<UserModel>(u)).ToList();
        }
    }
}
