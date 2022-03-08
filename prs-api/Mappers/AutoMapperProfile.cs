using AutoMapper;
using prs_api.Data;
using prs_api.Models.Authentication;
using prs_api.Models.Dtos;

namespace prs_api.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateDtoMaps();
            CustomMaps();
        }

        private void CreateDtoMaps()
        {
            CreateMap<User, UserModel>().PreserveReferences().MaxDepth(1);
            CreateMap<UserRole, UserRoleModel>().PreserveReferences().MaxDepth(1);
            CreateMap<Role, RoleModel>().PreserveReferences().MaxDepth(1);
            CreateMap<MovieRequest, MovieRequestModel>().PreserveReferences();
            CreateMap<TvRequest, TvRequestModel>().PreserveReferences();
        }

        private void CustomMaps()
        {
            CreateMap<User, LoginResponseModel>()
                .ForMember(dest => dest.Token, act => act.Ignore());
            CreateMap<RegisterRequestModel, User>();
        }
    }
}
