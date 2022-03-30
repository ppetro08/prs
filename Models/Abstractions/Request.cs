namespace Prs_Api.Models.Abstractions
{
    public class Request
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }
        public int QualityProfileId { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Added { get; set; }

        public Guid UserId { get; set; }
        public virtual User? User { get; set; } = null;
    }
}
