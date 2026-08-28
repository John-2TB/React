# 🎌 Animepedia

A modern and responsive anime discovery web application built with **React**, **Tailwind CSS**, **Tenrai API**, and **Appwrite**.

Animepedia allows users to search for anime, browse popular anime, filter anime by genre, view detailed anime information, watch available trailers, and discover trending anime based on search activity.

The project was built as a practical React application to demonstrate working with APIs, asynchronous JavaScript, React state management, reusable components, database integration, and responsive UI design.

---
## 🌐 Live Demo
[View the live application](react-vert-theta.vercel.app)



---
## 📸 Preview
![Animepedia Screenshots](/public/screenshots/header.png)
![Animepedia Screenshots](/public/screenshots/trending.png)
![Animepedia Screenshots](/public/screenshots/main.png)
![Animepedia Screenshots](/public/screenshots/modal-1.png)
![Animepedia Screenshots](/public/screenshots/modal-2.png)


---

## ✨ Features

### 🔎 Anime Search

Users can search for anime by title.

The application uses a debounced search input so that an API request isn't sent every time the user presses a key.

Instead, the application waits briefly after the user stops typing before performing the search.

This helps reduce unnecessary API requests.

---

### 🎭 Genre Filtering

Users can filter anime by genre.

The application retrieves genre information from the anime data and generates a list of unique genres.

When a genre is selected, its corresponding genre ID is sent to the API.

For example:

```text
Action → Genre ID
Adventure → Genre ID
Mystery → Genre ID
```
The API then returns anime belonging to the selected genre.

---
### 📚 Anime Pagination
Anime results are divided into pages.

Users can navigate between pages using the pagination controls.

The application keeps track of:

- Current page
- Whether another page exists
- Loading state
- Search query
- Selected genre

This allows the application to request only the anime needed for the current page.

---
### 🔥 Trending Anime
The application includes a Trending Anime section.

Trending data is stored in Appwrite.

Whenever a user searches for an anime, the search term and anime information can be stored in the Appwrite database.

Search counts are then used to determine which anime are trending.

The most frequently searched anime appear in the Trending Anime section.

---
### 🎬 Anime Details Modal
Clicking an anime opens a modal containing additional information.

The modal displays information such as:

- Anime title
- Rating
- Release year
- Age rating
- Number of episodes
- Poster
- Trailer
- Genres
- Overview
- Release date
- Source
- Airing status
- Demographics
- Producers
- Studios

The modal also supports closing through the close button.

---
### 🎥 Anime Trailers
If an anime has an available trailer embed URL, the application displays the trailer directly inside the modal.

If an embedded trailer isn't available but a trailer URL exists, the application displays a trailer thumbnail that links to the trailer.

If neither exists, a fallback image is displayed.

---
### 🚫 Content Filtering

The application excludes certain anime genres from the displayed results.

For example, anime belonging to the Ecchi genre are filtered out.

The application checks the genre ID before displaying an anime.

If all results are excluded because of this restriction, the application displays a custom message instead of displaying the anime.

```text
This site doesn't support these anime. JESUS loves you.
```
🙏

---
### 📱 Responsive Design

The application is designed to work across different screen sizes, including:

- Desktop
- Laptop
- Tablet
- Mobile devices

Tailwind CSS is used extensively for responsive layouts and styling.

---
### 🛠️ Technologies Used
Frontend
- React
- JavaScript
- JSX
- Tailwind CSS
- HTML5
- CSS3

APIs & Backend Services
- Tenrai API
- Appwrite

Libraries
- React Use
- Vite

Development Tools
- VS Code
- Git
- GitHub
- Vercel
- Postman

---
### 🧠 How the Application Works

The application can be divided into several major parts.

                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  React Frontend  │
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       Search Anime     Genre Filter      Pagination
             │               │                │
             └───────────────┼────────────────┘
                             ▼
                    ┌──────────────────┐
                    │   Tenrai API     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Anime Data       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Anime Components │
                    └──────────────────┘


       Search Statistics
              │
              ▼
       ┌──────────────┐
       │   Appwrite   │
       └──────┬───────┘
              │
              ▼
       Trending Anime

---
### 📂 Project Structure
```bash
src/
│
├── components/
│   ├── AnimeCard.jsx
│   ├── AnimeModal.jsx
│   ├── Filter.jsx
│   ├── Pagination.jsx
│   ├── Search.jsx
│   └── Spinner.jsx
│
├── appwrite.js
├── App.jsx
├── index.css
└── main.jsx
│
├── public/
│   ├── hero-image.png
│   ├── Rating.svg
│   ├── no-poster.avif
│   └── no-video.avif
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---
### 🧩 Component Breakdown
**App.jsx**

App.jsx acts as the main controller of the application.

It manages most of the application's state and coordinates the different components.

Important states include:
```bash
const [searchTerm, setSearchTerm] = useState("");
const [animeList, setAnimeList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [page, setPage] = useState(1);
const [selectedAnime, setSelectedAnime] = useState(null);
const [selectedGenre, setSelectedGenre] = useState("");
```
**searchTerm**

Stores what the user types into the search box.

**animeList**

Stores the anime returned by the API.

**isLoading**

Determines whether the application should display the loading spinner.

**page**

Stores the current pagination page.

**selectedAnime**

Stores the anime currently selected by the user.

When it contains an anime object, the modal is displayed.

When it is *null*, the modal is closed.

**selectedGenre**

Stores the genre ID selected by the user.

---
### 🔍 Debounced Search

The project uses useDebounce from react-use.

```bash
useDebounce(
  () => setDebouncedSearchTerm(searchTerm.toLowerCase()),
  750,
  [searchTerm]
);
```

Instead of immediately searching every time the user types, the application waits approximately 750ms after the user stops typing.

For example:

```text
User types:

N
Na
Nar
Naru
Naru...
Naruto
       ↓
   wait 750ms
       ↓
API request
```

This prevents unnecessary API requests.

---
### 🌐 API Requests

The project uses the Tenrai API.

The base URL is:

```bash
const API_URL = 'https://api.tenrai.org/v1';
```

Depending on the user's action, different API endpoints are requested.

**Search**
```bash
/anime?q=SEARCH_TERM&page=PAGE
```

**Genre**
```bash
/anime?genres=GENRE_ID&page=PAGE
```

**Top Anime**
```bash
/top/anime?page=PAGE
```

The application decides which endpoint to use based on the current search and genre state.

---
### 🎭 Genre Filtering

The Filter component receives anime data from App.jsx.

```bash
<Filter
  genres={setSelectedGenre}
  animes={animeList}
/>
```

The component extracts all genres from the anime list.

```bash
const allGenres = animes.flatMap(
  (anime) => anime.genres
);
```

Because multiple anime can have the same genre, duplicate genres are removed using a Map.

```bash
const uniqueGenres = [
  ...new Map(
    allGenres.map(
      (genre) => [genre.mal_id, genre]
    )
  ).values()
];
```

The result is a unique list of genres that can be displayed as filter buttons.

---
### 🗄️ Appwrite Integration

Appwrite is used to store anime search statistics.

The application stores information such as:

```text
searchTerm
count
anime_id
poster_url
```
Example document:

```bash
{
  "searchTerm": "naruto",
  "count": 15,
  "anime_id": 20,
  "poster_url": "https://example.com/poster.jpg"
}
```

---
### 📈 Search Count System

When a user searches for an anime, the application checks whether the search term already exists in Appwrite.

If it exists:
```bash
count + 1
```

If it doesn't exist:
```bash
Create a new document
count = 1
```

This allows the application to track popular searches.

---
### 🔥 Trending Algorithm

Trending anime are determined using the search count stored in Appwrite.

The application requests the documents sorted by their search count:
```bash
Query.orderDesc('count')
```

and limits the results:
```bash
Query.limit(5)
```

This means the application retrieves the five most searched anime.

---
### 🛡️ Error Handling

The application handles several types of errors.

For example:
```bash
if (!response.ok) {
  throw new Error(
    `HTTP Error Status: ${response.status}`
  );
}
```

Errors are caught using try...catch.

```bash
try {
  // API request
} catch (error) {
  console.error(error);
}
```

The application then displays a user-friendly error message instead of crashing the entire interface.

---
### ⏳ Loading States

The application uses loading states to provide feedback while data is being retrieved.

For example:
```bash
const [isLoading, setIsLoading] = useState(false);
```

When a request begins:
```bash
setIsLoading(true);
```

When the request finishes:
```bash
setIsLoading(false);
```

While loading, the application displays the *Spinner* component.

---
### 🪟 Modal System

The selected anime is stored in:
```bash
const [selectedAnime, setSelectedAnime] = useState(null);
```

When an anime is clicked:
```bash
setSelectedAnime(anime);
```

The modal is then rendered:
```bash
{selectedAnime && (
  <AnimeModal
    anime={selectedAnime}
    onSelect={setSelectedAnime}
  />
)}
```

To close the modal:
```bash
onSelect(null);
```

This demonstrates how state can be passed between React components using props.

---
### 🔒 Body Scroll Lock

When the modal is open, the application prevents the background page from scrolling.
```bash
useEffect(() => {
  document.body.style.overflowY =
    selectedAnime ? 'hidden' : '';
}, [selectedAnime]);
```
When the modal closes, normal scrolling is restored.

---
### 🚫 Restricted Genre Handling

Before rendering anime cards, the application creates a safer list:

```bash
const safeAnimeList = animeList.filter(
  (anime) =>
    !anime.genres?.some(
      (genre) => genre.mal_id === 9
    )
);
```

The application checks each anime's genres.

If an anime contains the restricted genre ID, it is removed from the displayed list.

This allows the API results to remain untouched while controlling what is displayed to the user.

---
### 🔐 Environment Variables

Appwrite configuration values are stored in environment variables.

Example:
```bash
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

These values are accessed using:
```bash
import.meta.env.VITE_APPWRITE_PROJECT_ID
```

Important

Vite variables beginning with VITE_ are exposed to the browser.

Therefore, never place private secrets such as API secrets, passwords, or Appwrite API keys in these variables.

Project IDs and other identifiers that are intended for frontend use can be exposed, provided the Appwrite permissions are configured correctly.

---
### 🚀 Installation
1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```
```bash
2. Enter the project directory
cd YOUR_REPOSITORY
```
3. Install dependencies
```bash
npm install
```
4. Create the environment file

Create a file called:
```bash
.env
```

Add:
```bash
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

Replace the values with your Appwrite project information.

5. Start the development server
```bash
npm run dev
```

The application should then be available at the local development URL provided by Vite.

---
### 🏗️ Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```
---
### ☁️ Deployment

The project can be deployed using platforms such as Vercel.

When deploying, make sure the required environment variables are also added to the deployment platform.

For Vercel, add:
```bash
VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID
```

After adding or changing environment variables, redeploy the application.

---
### 🎨 UI Design

The interface focuses on:

- Dark anime-inspired design
- Responsive layouts
- Large anime artwork
- Clear typography
- Card-based anime displays
- Modal-based anime details
- Simple filtering controls
- Loading indicators
- Error messages
- Responsive navigation and layouts

Tailwind CSS is used to create most of the responsive styling.

---
### 📊 Data Flow

A simplified example of the data flow is:

```text
User
 │
 │ searches
 ▼
Search Component
 │
 ▼
searchTerm state
 │
 ▼
Debounce
 │
 ▼
fetchTopAnimes()
 │
 ▼
Tenrai API
 │
 ▼
Anime data
 │
 ▼
animeList state
 │
 ▼
AnimeCard
```

For anime details:
```text
AnimeCard
    │
    │ click
    ▼
setSelectedAnime(anime)
    │
    ▼
selectedAnime state
    │
    ▼
AnimeModal
```

For trending anime:
```text
User Search
     │
     ▼
updateSearchCount()
     │
     ▼
Appwrite Database
     │
     ▼
Search Count
     │
     ▼
getTrendingAnimes()
     │
     ▼
Trending Anime
```

---
### - 🔮 Future Improvements

Possible future improvements include:

- ⭐ User anime ratings
- ❤️ Favorite anime system
- 📌 Watchlist functionality
- 🔐 User authentication
- 💾 Persisted user preferences
- 🎬 Better trailer handling
- 🔍 More advanced search filters
- 📊 More detailed anime statistics
- 🌙 Theme customization
- 📱 Improved mobile navigation
- ⚡ Better API caching
- 🖼️ Image lazy loading
- ♾️ Infinite scrolling
- 🧪 Automated testing
- 🔔 Notifications
- 🗃️ More advanced Appwrite database features

---
### 🐛 Known Considerations

Because the application depends on an external anime API, API availability and response times can affect the application.

Potential issues include:

- API downtime
- Slow API responses
- Missing anime information
- Missing trailers
- Missing images
- Incomplete metadata
- Rate limits

The application therefore uses loading states, fallback values, and error handling to provide a better user experience.

---
### 📚 What I Learned

Building this project helped me practice and understand:

- React component architecture
- React state management
- React props
- useEffect
- API integration
- Fetch API
- Async/Await
- Promise handling
- Error handling
- Debouncing
- Pagination
- Dynamic filtering
- Array manipulation
- Conditional rendering
- Modal implementation
- Appwrite database integration
- Environment variables
- Responsive design
- Tailwind CSS
- Git and GitHub
- Deployment with Vercel

More importantly, the project helped me understand how individual React concepts work together to create a complete application.

---
### 🙏 Purpose

Animepedia was created as a learning project to improve my frontend development skills while building something practical and enjoyable.

The project combines my interest in anime with my goal of becoming a stronger software developer.
```text
"Whatever you do, work at it with all your heart, as working for the Lord."
```

— Colossians 3:23

---
### 👨‍💻 Author

**Koto Temiloluwa John**

Frontend / Full-Stack Developer in training.

Interested in:

- React
- JavaScript
- TypeScript
- Node.js
- Express
- MongoDB
- APIs
- Backend Development
- Software Engineering

---
### ⭐ Acknowledgements

Special thanks to the developers and services that make this project possible:

- Tenrai API
- Appwrite
- React
- Tailwind CSS
- Vite

---
### ⭐ If you like this project
Kindly give it star.

Feel free to explore the source code, learn from it, or use the ideas to build your own project.

Made with ❤️, JavaScript, React, and a lot of anime.