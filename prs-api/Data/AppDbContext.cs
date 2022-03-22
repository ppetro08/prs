using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace prs_api.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> AppUsers { get; set; }
        public DbSet<MovieRequest> MovieRequests { get; set; }
        public DbSet<TvRequest> TvRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            SeedUsers(modelBuilder);
            SeedRoles(modelBuilder);
            SeedUserRoles(modelBuilder);
            SeedMovieRequests(modelBuilder);
            SeedTvRequests(modelBuilder);
        }

        private void SeedUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            var admin = new User
            {
                Id = new Guid("103972dd-e25b-4ea6-a84a-b7db0cd9020d"),
                NormalizedEmail = "ADMIN@GMAIL.COM",
                Email = "admin@gmail.com",
                EmailConfirmed = true,
                NormalizedUserName = "ADMIN@GMAIL.COM",
                UserName = "admin@gmail.com",
                LastName = "Admin",
                SecurityStamp = new Guid().ToString()
            };
            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            admin.PasswordHash = passwordHasher.HashPassword(admin, "Testing123!");

            var requester = new User
            {
                Id = new Guid("2a37aec6-c674-46f4-b453-c7c4d1978cb9"),
                NormalizedEmail = "REQUESTER@GMAIL.COM",
                Email = "requester@gmail.com",
                EmailConfirmed = true,
                NormalizedUserName = "REQUESTER@GMAIL.COM",
                UserName = "requester@gmail.com",
                LastName = "Requester",
                SecurityStamp = new Guid().ToString()
            };
            passwordHasher = new PasswordHasher<User>();
            requester.PasswordHash = passwordHasher.HashPassword(requester, "Testing123!");

            modelBuilder.Entity<User>().HasData(admin, requester);
        }

        private void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .HasData(
                    new Role(Enums.Roles.Admin)
                    {
                        Id = new Guid("a873fe11-88ec-4d46-bf93-930840a945db"),
                        ConcurrencyStamp = "1",
                        NormalizedName = "Admin"
                    },
                    new Role(Enums.Roles.Movie_Add)
                    {
                        Id = new Guid("37ff759c-0b78-4039-92d6-132875abadcf"),
                        ConcurrencyStamp = "2",
                        NormalizedName = "User can add Movies"
                    },
                    new Role(Enums.Roles.Movie_Request)
                    {
                        Id = new Guid("e9415c2a-f804-4c6b-a849-b015f80a8348"),
                        ConcurrencyStamp = "3",
                        NormalizedName = "User can request Movies"
                    },
                    new Role(Enums.Roles.TvShow_Add)
                    {
                        Id = new Guid("6fd2f655-ed4c-4e54-bdcd-ef4e59e6683c"),
                        ConcurrencyStamp = "4",
                        NormalizedName = "User can add Tv Shows"
                    },
                    new Role(Enums.Roles.TvShow_Request)
                    {
                        Id = new Guid("6fe5a246-0e24-4260-9ca9-2abc9633ce46"),
                        ConcurrencyStamp = "5",
                        NormalizedName = "User can request Tv Shows"
                    }
                );
        }

        private void SeedUserRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasData(
                    new UserRole
                    {
                        RoleId = new Guid("a873fe11-88ec-4d46-bf93-930840a945db"),
                        UserId = new Guid("103972dd-e25b-4ea6-a84a-b7db0cd9020d")
                    },
                    new UserRole
                    {
                        RoleId = new Guid("e9415c2a-f804-4c6b-a849-b015f80a8348"),
                        UserId = new Guid("2a37aec6-c674-46f4-b453-c7c4d1978cb9")
                    },
                    new UserRole
                    {
                        RoleId = new Guid("6fe5a246-0e24-4260-9ca9-2abc9633ce46"),
                        UserId = new Guid("2a37aec6-c674-46f4-b453-c7c4d1978cb9")
                    }
                );
        }

        private void SeedMovieRequests(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieRequest>().ToTable("MovieRequest")
                .HasData(
                    new MovieRequest
                    {
                        Id = 1,
                        ApproveDate = DateTime.Now,
                        CreateDate = DateTime.Now,
                        MovieDbid = 1234,
                        UserId = new Guid("103972dd-e25b-4ea6-a84a-b7db0cd9020d")
                    },
                    new MovieRequest
                    {
                        Id = 2,
                        ApproveDate = null,
                        CreateDate = DateTime.Now,
                        MovieDbid = 1234,
                        UserId = new Guid("103972dd-e25b-4ea6-a84a-b7db0cd9020d")
                    }
                );
        }

        private void SeedTvRequests(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TvRequest>().ToTable("TvRequest");
        }
    }
}
