package hu.nye.webapp.movies.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * Model class representing a movie.
 */
public class MovieDTO {

    private Long id;

    @NotBlank
    private String title;

    private String tagline;

    @Min(value = 0)
    @Max(value = 100)
    private double voteAverage;

    @Min(value = 0)
    private int voteCount;

    private Date releaseDate;

    @NotBlank
    private String posterPath;

    @NotBlank
    private String overview;

    @Min(value = 0)
    private int budget;

    @Min(value = 0)
    private int revenue;

    private Set<@NotBlank String> genres;

    @NotNull
    @Min(value = 0)
    private Integer runtime;

    public MovieDTO() {
    }

    private MovieDTO(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.tagline = builder.tagline;
        this.voteAverage = builder.voteAverage;
        this.voteCount = builder.voteCount;
        this.releaseDate = builder.releaseDate;
        this.posterPath = builder.posterPath;
        this.overview = builder.overview;
        this.budget = builder.budget;
        this.revenue = builder.revenue;
        this.genres = builder.genres;
        this.runtime = builder.runtime;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getTagline() {
        return tagline;
    }

    public double getVoteAverage() {
        return voteAverage;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getOverview() {
        return overview;
    }

    public int getBudget() {
        return budget;
    }

    public int getRevenue() {
        return revenue;
    }

    public Set<String> getGenres() {
        return genres;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public void setVoteAverage(double voteAverage) {
        this.voteAverage = voteAverage;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public void setRevenue(int revenue) {
        this.revenue = revenue;
    }

    public void setGenres(Set<String> genres) {
        this.genres = genres;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MovieDTO movieDTO = (MovieDTO) o;

        return new EqualsBuilder()
            .append(id, movieDTO.id)
            .append(voteAverage, movieDTO.voteAverage)
            .append(voteCount, movieDTO.voteCount)
            .append(budget, movieDTO.budget)
            .append(revenue, movieDTO.revenue)
            .append(runtime, movieDTO.runtime)
            .append(title, movieDTO.title)
            .append(tagline, movieDTO.tagline)
            .append(releaseDate, movieDTO.releaseDate)
            .append(posterPath, movieDTO.posterPath)
            .append(overview, movieDTO.overview)
            .append(genres, movieDTO.genres)
            .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
            .append(id)
            .append(title)
            .append(tagline)
            .append(voteAverage)
            .append(voteCount)
            .append(releaseDate)
            .append(posterPath)
            .append(overview)
            .append(budget)
            .append(revenue)
            .append(genres)
            .append(runtime)
            .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
            .append("id", id)
            .append("title", title)
            .append("tagline", tagline)
            .append("voteAverage", voteAverage)
            .append("voteCount", voteCount)
            .append("releaseDate", releaseDate)
            .append("posterPath", posterPath)
            .append("overview", overview)
            .append("budget", budget)
            .append("revenue", revenue)
            .append("genres", genres)
            .append("runtime", runtime)
            .toString();
    }

    /**
     * Builder for {@link MovieDTO}.
     */
    public static final class Builder {
        private Long id;
        private String title;
        private String tagline;
        private double voteAverage;
        private int voteCount;
        private Date releaseDate;
        private String posterPath;
        private String overview;
        private int budget;
        private int revenue;
        private Set<String> genres;
        private Integer runtime;

        private Builder() {
        }

        public Builder withId(Long id) {
            this.id = id;
            return this;
        }

        public Builder withTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder withTagline(String tagline) {
            this.tagline = tagline;
            return this;
        }

        public Builder withVoteAverage(double voteAverage) {
            this.voteAverage = voteAverage;
            return this;
        }

        public Builder withVoteCount(int voteCount) {
            this.voteCount = voteCount;
            return this;
        }

        public Builder withReleaseDate(Date releaseDate) {
            this.releaseDate = releaseDate;
            return this;
        }

        public Builder withPosterPath(String posterPath) {
            this.posterPath = posterPath;
            return this;
        }

        public Builder withOverview(String overview) {
            this.overview = overview;
            return this;
        }

        public Builder withBudget(int budget) {
            this.budget = budget;
            return this;
        }

        public Builder withRevenue(int revenue) {
            this.revenue = revenue;
            return this;
        }

        public Builder withGenres(Set<String> genres) {
            this.genres = genres;
            return this;
        }

        public Builder withRuntime(Integer runtime) {
            this.runtime = runtime;
            return this;
        }

        public MovieDTO build() {
            return new MovieDTO(this);
        }
    }
}
