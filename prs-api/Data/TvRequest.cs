using prs_api.Data.Abstractions;

namespace prs_api.Data
{
    public class TvRequest : Request
    {
        public int TvDbid { get; set; }
    }
}
