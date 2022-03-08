namespace prs_api.Data.Abstractions
{
    public class Request
    {
        public int Id { get; set; }
        public bool Approved { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ApproveDate { get; set; }

        public Guid UserId { get; set; }
        public virtual User? User { get; set; } = null;
    }
}
