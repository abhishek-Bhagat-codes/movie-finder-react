# Movie Search App

A modern React application for searching and discovering movies using the TMDB API. Built with Vite, TailwindCSS, and React.

## Features

- Search for movies by title
- View trending/popular movies
- Responsive UI with TailwindCSS
- Loading spinner and error handling
- Movie cards with poster, rating, language, and release year

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/movie-page.git
   cd movie-page
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

## Usage

- Enter a movie title in the search bar to find specific movies.
- Explore movie details such as rating, language, and release year on the movie cards.

## Project Structure

```
movie-page/
├── public/
├── src/
│   ├── Components/
│   │   ├── Card.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local
├── package.json
├── vite.config.js
├── README.md
```

## Technologies Used

- React
- Vite
- TailwindCSS
- TMDB API

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for the movie data
- [Vite](https://vitejs.dev/) for the fast development setup
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
