# Confrontos Corridos

A web application built with React, Redux, Next.js, and TypeScript that provides comprehensive data and insights about the Brazilian league (Brasileirão) during the points-based era (2003–2025). Users can explore head-to-head matchups, league tables, team campaigns, and collective records with advanced filtering, sorting, and visualization options.

---

## Demo

https://confrontos-corridos.site/

---

## Features

- **Head-to-Head Matchups**:
  - Compare two teams' historical confrontations, including wins, draws, losses, goals scored, and goals conceded.
  - Generate YouTube search links for match highlights.

- **League Table**:
  - View the league table for any season from 2023 to 2025.
  - Explore match results for each round.

- **Team Campaigns**:
  - Analyze team performances across all seasons, including points, wins, draws, losses, and goal statistics.
  - Filter campaigns by year or team.
  - Sort campaigns dynamically by any column.

- **Collective Records**:
  - Discover the best performances in league history, including:
    - Best first and second halves.
    - Best home and away seasons.
    - Biggest blowout games (by goal difference).
  - Explore streaks such as longest winning, unbeaten, and losing streaks.

  - **YouTube Highlights**:
  - Click on the YouTube icon next to matches to automatically search for match highlights on YouTube.

- **Responsive Design**:
  - Optimized for mobile and desktop devices.

- **State Management**:
  - Powered by Redux Toolkit for efficient state handling.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15.2.4)
- **Frontend**: [React](https://reactjs.org/) (v19.0.0)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (v2.6.1)
- **Styling**:
  - [Material-UI](https://mui.com/) (v7.0.1)
  - [Sass](https://sass-lang.com/) (v1.86.2)
- **HTTP Client**: [Axios](https://axios-http.com/) (v1.8.4)
- **Linting**: [ESLint](https://eslint.org/) (v9)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Grynberg34/confrontos-brasileirao
   cd confrontos-corridos

   2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

## Folder Structure

```
confrontos-corridos/
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js pages
│   │   ├── campanhas/     # Team campaigns page
│   │   ├── confrontos/    # Head-to-head matchups page
│   │   ├── recordes/      # Collective records page
│   │   ├── tabela/        # League table page
│   ├── components/        # React components
│   │   ├── Campanha/      # Components for campaigns
│   │   ├── Confronto/     # Components for confrontations
│   │   ├── Header/        # Header component
│   │   ├── Home/          # Components for the home page
│   │   ├── Recorde/       # Components for records
│   │   ├── Tabela/        # Components for the league table
│   ├── store/             # Redux store and slices
│   │   ├── slices/        # Redux slices for state management
│   │   ├── types/         # TypeScript types for state
│   ├── styles/            # Sass stylesheets
├── [package.json]         # Project dependencies and scripts
├── [README.md]            # Project documentation
```

---

## Dependencies

### Main Dependencies
- **Next.js**: Framework for server-rendered React applications.
- **React**: Library for building user interfaces.
- **Redux Toolkit**: Simplified state management.
- **Material-UI**: UI components for React.
- **Axios**: HTTP client for API requests.
- **Sass**: CSS preprocessor for styling.

### Dev Dependencies
- **TypeScript**: Type safety for JavaScript.
- **ESLint**: Linting for code quality.
- **@types/react**: TypeScript definitions for React.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---