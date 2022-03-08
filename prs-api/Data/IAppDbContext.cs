using Microsoft.EntityFrameworkCore;

namespace prs_api.Data
{
    public interface IAppDbContext
    {
        public DbSet<User> AppUsers { get; set; }
        public DbSet<MovieRequest> MovieRequests { get; set; }
        public DbSet<TvRequest> TvRequests { get; set; }
    }
}
