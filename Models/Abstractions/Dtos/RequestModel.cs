namespace Prs_Api.Models.Dtos.Abstractions
{
    public class RequestModel
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }
        public int QualityProfileId { get; set; }
        public string Name { get; set; } = String.Empty;

        public Guid UserId { get; set; }
        public UserModel? User { get; set; } = null;
    }
}
