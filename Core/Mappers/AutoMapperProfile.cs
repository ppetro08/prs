using AutoMapper;
using Prs_Api.Data;
using Prs_Api.Models;
using Prs_Api.Models.Authentication;
using Prs_Api.Models.Dtos;

namespace Prs_Api.Core.Mappers
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
            CreateMap<MovieRequestModel, MovieRequest>().PreserveReferences();
        }

        private void CustomMaps()
        {
            CreateMap<User, LoginResponseModel>()
                .ForMember(dest => dest.Token, act => act.Ignore());
            CreateMap<RegisterRequestModel, User>();
        }
    }
}
