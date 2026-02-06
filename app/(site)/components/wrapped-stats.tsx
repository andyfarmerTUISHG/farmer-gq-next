type WrappedFilm = {
  _id: string;
  title: string;
  slug: string;
  status: "watched";
  isSecretScreening?: boolean;
  year?: number;
  dateWatched: string;
  cinemaLocation?: string;
  personalRating?: number;
  personalNotes?: string;
  dateAddedToWishlist?: string;
  waitTime?: number;
};

type WrappedStatsProps = {
  films: WrappedFilm[];
  year: string;
};

export default function WrappedStats({ films }: WrappedStatsProps) {
  if (!films || films.length === 0) {
    return null;
  }

  // Basic statistics
  const totalFilms = films.length;
  const ratedFilms = films.filter(f => f.personalRating);
  const averageRating = ratedFilms.length > 0
    ? ratedFilms.reduce((sum, f) => sum + (f.personalRating || 0), 0) / ratedFilms.length
    : 0;

  const secretScreenings = films.filter(f => f.isSecretScreening).length;

  // Cinema statistics - sanitize to remove stega-encoded invisible characters
  const sanitizeCinema = (cinema?: string) => cinema?.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  
  const cinemaVisits = films.filter(f => f.cinemaLocation);
  const uniqueCinemas = [...new Set(cinemaVisits.map(f => sanitizeCinema(f.cinemaLocation)))];
  
  const cinemaFrequency = cinemaVisits.reduce((acc: Record<string, number>, film) => {
    const cinema = sanitizeCinema(film.cinemaLocation);
    if (cinema) {
      acc[cinema] = (acc[cinema] || 0) + 1;
    }
    return acc;
  }, {});

  // Rating distribution
  const ratingDistribution = ratedFilms.reduce((acc: Record<number, number>, film) => {
    if (film.personalRating) {
      acc[film.personalRating] = (acc[film.personalRating] || 0) + 1;
    }
    return acc;
  }, {});

  // Wait time statistics
  const filmsWithWaitTime = films.filter(f => f.waitTime && f.waitTime > 0);
  const averageWaitTime = filmsWithWaitTime.length > 0
    ? filmsWithWaitTime.reduce((sum, f) => sum + (f.waitTime || 0), 0) / filmsWithWaitTime.length
    : 0;
  const longestWait = Math.max(...filmsWithWaitTime.map(f => f.waitTime || 0), 0);
  const shortestWait = filmsWithWaitTime.length > 0
    ? Math.min(...filmsWithWaitTime.map(f => f.waitTime || 0))
    : 0;

  // Monthly distribution
  const monthlyDistribution = films.reduce((acc: Record<string, number>, film) => {
    const month = new Date(film.dateWatched).toLocaleDateString("en-GB", { month: "long" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const busiestMonth = Object.entries(monthlyDistribution)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="space-y-8">
      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">
            {totalFilms}
          </div>
          <div className="text-blue-100">Films Watched</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">
            {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
          </div>
          <div className="text-green-100">Average Rating</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">{secretScreenings}</div>
          <div className="text-purple-100">Secret Screenings</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">{uniqueCinemas.length}</div>
          <div className="text-orange-100">Different Cinemas</div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cinema Statistics */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">🏆 Cinema Loyalty</h3>
          <div className="space-y-2">
            {Object.entries(cinemaFrequency)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([cinema, count]) => (
                <div key={cinema} className="flex justify-between">
                  <span className="truncate">{cinema}</span>
                  <span className="text-gray-600 font-semibold">{count} visits</span>
                </div>
              ))}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">⭐ Rating Breakdown</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = ratedFilms.length > 0 ? (count / ratedFilms.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-8">{"⭐".repeat(rating)}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wait Time Statistics */}
        {filmsWithWaitTime.length > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">⏱️ Patience Awards</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Average Wait Time</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(averageWaitTime)}
                  {" "}
                  days
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Longest Wait</p>
                  <p className="font-semibold">
                    {longestWait}
                    {" "}
                    days
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Shortest Wait</p>
                  <p className="font-semibold">
                    {shortestWait}
                    {" "}
                    days
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Activity */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">📅 Monthly Activity</h3>
          {busiestMonth && (
            <div className="mb-4">
              <p className="font-medium">
                Busiest Month:
                {busiestMonth[0]}
              </p>
              <p className="text-sm text-gray-600">
                {busiestMonth[1]}
                {" "}
                films
              </p>
            </div>
          )}
          <div className="space-y-2">
            {Object.entries(monthlyDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([month, count]) => (
                <div key={month} className="flex justify-between text-sm">
                  <span>{month}</span>
                  <span className="text-gray-600">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

    </div>
  );
}
