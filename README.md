# AI Expertise Matrix

A modern web application that helps users assess their expertise and AI adoption levels, providing personalized recommendations based on their position in the expertise matrix.

![AI Expertise Matrix Screenshot](https://aiexpertisematrix.netlify.app/og-image.jpg)

## 🚀 Features

- **Interactive Questionnaire**: Answer questions about your expertise and AI usage
- **Quadrant Analysis**: Get categorized into one of four quadrants based on your responses
- **Personalized Recommendations**: Receive tailored advice based on your quadrant
- **Progress Tracking**: Visualize your progress through the assessment
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful, consistent icons
- [ESLint](https://eslint.org/) - JavaScript/TypeScript linter
- [Prettier](https://prettier.io/) - Code formatter

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jlsodai/ai-expertise-matrix.git
   cd ai-expertise-matrix
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 🏗️ Project Structure

```
├── public/               # Static files (images, fonts, etc.)
├── src/
│   ├── app/              # App router pages and layouts
│   │   └── ...
│   ├── components/       # Reusable UI components
│   │   ├── insights/     # Data visualization and insights components
│   │   ├── layout/       # Layout components (headers, footers, etc.)
│   │   ├── matrix/       # Matrix visualization components
│   │   ├── pathways/     # Learning path components
│   │   ├── questionnaire/# Questionnaire and assessment components
│   │   └── ui/           # Base UI components built with Radix UI
│   ├── data/            # Static data and configuration
│   ├── lib/             # Utility functions, helpers, and constants
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles and theme configuration
├── .gitignore          # Git ignore file
└── package.json        # Project dependencies and scripts
```

### Key Directories

- **`/public`**: Contains static assets like images, fonts, and other files that need to be served directly.
- **`/src/app`**: Contains the application's pages and layouts using Next.js 13+ App Router.
- **`/src/components`**: Houses all React components, organized by feature:
  - `insights/`: Components for data visualization and insights display
  - `layout/`: Layout components that structure the application
  - `matrix/`: Components related to the expertise matrix visualization
  - `pathways/`: Components for displaying learning paths
  - `questionnaire/`: Components for the assessment questionnaire
  - `ui/`: Reusable UI components built with Radix UI
- **`/src/data`**: Contains static data, mock data, and configuration files.
- **`/src/lib`**: Utility functions, API clients, and helper functions.
- **`/src/types`**: TypeScript type definitions and interfaces.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 Todo

- [ ] Implement user authentication
- [ ] Add data persistence
- [ ] Create admin dashboard
- [ ] Add more detailed analytics