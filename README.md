# Confrontos Corridos

Confrontos Corridos is a web application built with **Next.js**, **React**, and **Redux** where you choose two brazilian football teams and a complete history (with all matches and stats) between the teams in the Brazilian League (from 2003 to 2025) is shown.

---

## Features

- **Dynamic Sorting**: Sort matches by ascending or descending order.
- **Team Selection**: Select teams dynamically and prevent duplicate selections.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **YouTube Integration**: Generate YouTube search links for match highlights.
- **State Management**: Powered by Redux Toolkit for efficient state handling.

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
│   ├── components/        # React components
│   │   ├── Home/          # Components for the home page
│   │   ├── Confronto/     # Components for confrontations
│   ├── styles/            # Sass stylesheets
│   ├── store/             # Redux store and slices
│   ├── pages/             # Next.js pages
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
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