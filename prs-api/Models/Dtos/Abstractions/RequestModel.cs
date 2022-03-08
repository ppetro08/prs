namespace prs_api.Models.Dtos.Abstractions
{
    public class RequestModel
    {
        public int Id { get; set; }
        public bool Approved { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }

        public string UserId { get; set; } = String.Empty;
        public UserModel? User { get; set; } = null;
    }
}
