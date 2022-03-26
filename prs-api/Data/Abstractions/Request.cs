namespace prs_api.Data.Abstractions
{
    public class Request
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }
        public int QualityProfileId { get; set; }
        public string Name { get; set; } = String.Empty;

        public Guid UserId { get; set; }
        public virtual User? User { get; set; } = null;
    }
}
