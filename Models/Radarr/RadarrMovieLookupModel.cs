namespace Prs_Api.Models.Radarr
{
    public class RadarrMovieLookupModel
    {
        public RadarrMovieLookupModel()
        {
            Genres = new List<string>();
            Tags = new List<string>();
            Images = new List<RadarrImage>();
            AlternateTitles = new List<RadarrAlternateTitle>();
        }

        public DateTime Added { get; set; }
        public string Certification { get; set; } = string.Empty;
        public string CleanTitle { get; set; } = string.Empty;
        public string Folder { get; set; } = string.Empty;
        public string FolderName { get; set; } = string.Empty;
        public List<string> Genres { get; set; }
        public bool HasFile { get; set; }
        public int Id { get; set; }
        public string ImdbId { get; set; } = string.Empty;
        public DateTime InCinemas { get; set; }
        public bool IsAvailable { get; set; }
        public string MinimumAvailability { get; set; } = string.Empty;
        public bool Monitored { get; set; }
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string? Path { get; set; }
        public DateTime PhysicalRelease { get; set; }
        public int QualityProfileId { get; set; }
        public string RemotePoster { get; set; } = string.Empty;
        public string RootFolderPath { get; set; } = string.Empty;
        public int Runtime { get; set; }
        public int SecondaryYearSourceId { get; set; }
        public int SizeOnDisk { get; set; }
        public string SortTitle { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Studio { get; set; } = string.Empty;
        public List<string> Tags { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TitleSlug { get; set; } = string.Empty;
        public int TmdbId { get; set; }
        public string Website { get; set; } = string.Empty;
        public int Year { get; set; }
        public string YoutubeTrailerId { get; set; } = string.Empty;

        public RadarrAddMovieOptions? AddOptions { get; set; }
        public List<RadarrAlternateTitle> AlternateTitles { get; set; }
        public RadarrCollection? Collection { get; set; }
        public List<RadarrImage> Images { get; set; }
        public RadarrRatings? Ratings { get; set; }
    }

    public class RadarrAddMovieOptions
    {
        public bool SearchForMovie { get; set; }
    }

    public class RadarrAlternateTitle
    {
        public int MovieId { get; set; }
        public int SourceId { get; set; }
        public string SourceType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int VoteCount { get; set; }
        public int Votes { get; set; }
        public RadarrLanguage? Language { get; set; }
    }

    public class RadarrCollection
    {
        public RadarrCollection()
        {
            Images = new List<RadarrImage>();
        }

        public string Name { get; set; } = string.Empty;
        public int Tmdbid { get; set; }
        public List<RadarrImage> Images { get; set; }
    }

    public class RadarrImage
    {
        public string CoverType { get; set; } = string.Empty;
        public string RemoteUrl { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    public class RadarrRatings
    {
        public int Value { get; set; }
        public int Votes { get; set; }
    }

    public class RadarrLanguage
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
