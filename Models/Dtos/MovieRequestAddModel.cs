namespace Prs_Api.Models.Dtos
{
    public class MovieRequestAddModel
    {
        public int MovieDbId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int QualityProfileId { get; set; }
    }
}
