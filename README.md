# 🏨 Hotel Reservation System - Next.js

A modern, responsive hotel reservation website built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Mobile Responsive**: Optimized for all devices with hamburger navigation
- **Authentication System**: Login and signup pages with form validation
- **Room Gallery**: Interactive room cards with booking functionality
- **Type Safety**: Full TypeScript integration for better development experience
- **Performance**: Next.js 15 with Turbopack for fast development and builds

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Styling**: CSS3 with modern features
- **Icons**: React Icons
- **Development**: Turbopack for fast builds
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/samuelhany-cpu/Hotel-Rooms-Reservation.git
cd Hotel-Rooms-Reservation/hotel-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📱 Pages

- **Home** (`/`) - Main landing page with room gallery
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern Cards**: Enhanced room and gallery cards with hover effects
- **Navigation**: Desktop navigation with mobile hamburger menu
- **Authentication UI**: Professional login/signup forms with gradients
- **Smooth Animations**: CSS transitions and hover effects

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy
5. Your site will be live at `https://your-project.vercel.app`

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. The build output will be in the `.next` folder
3. Deploy the contents to your hosting provider

## 📁 Project Structure

```
hotel-nextjs/
├── app/                    # Next.js App Router
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Page footer
│   ├── RoomCard.tsx       # Room display cards
│   └── GalleryCard.tsx    # Gallery cards
├── public/               # Static assets
│   ├── images/           # Hotel images
│   └── css/              # Legacy CSS files
├── types/                # TypeScript definitions
└── package.json          # Dependencies and scripts
```

## 🔧 Development

The project uses modern development tools:

- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Next.js App Router**: Modern React development

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js 15 and TypeScript
