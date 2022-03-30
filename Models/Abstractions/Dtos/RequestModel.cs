namespace Prs_Api.Models.Dtos.Abstractions
{
    public class RequestModel
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }
        public int QualityProfileId { get; set; }
        public string Name { get; set; } = String.Empty;


        public string UserId { get; set; } = String.Empty;
        public UserModel? User { get; set; } = null;
    }
}
