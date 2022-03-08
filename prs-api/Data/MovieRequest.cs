using prs_api.Data.Abstractions;

namespace prs_api.Data
{
    public class MovieRequest : Request
    {
        public int MovieDbid { get; set; }
    }
}
