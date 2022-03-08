using prs_api.Models.Dtos.Abstractions;

namespace prs_api.Models.Dtos
{
    public class MovieRequestModel : RequestModel
    {
        public int MovieDbid { get; set; }
    }
}
