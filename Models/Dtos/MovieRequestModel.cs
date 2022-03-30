using Prs_Api.Models.Dtos.Abstractions;

namespace Prs_Api.Models.Dtos
{
    public class MovieRequestModel : RequestModel
    {
        public int MovieDbid { get; set; }
    }
}
