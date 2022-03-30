using Prs_Api.Models.Abstractions;

namespace Prs_Api.Data
{
    public class MovieRequest : Request
    {
        public int MovieDbid { get; set; }
    }
}
