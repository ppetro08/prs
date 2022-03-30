using Microsoft.EntityFrameworkCore;
using Prs_Api.Models;

namespace Prs_Api.Data
{
    public interface IAppDbContext
    {
        public DbSet<User> AppUsers { get; set; }
        public DbSet<MovieRequest> MovieRequests { get; set; }
        public DbSet<TvRequest> TvRequests { get; set; }
    }
}
