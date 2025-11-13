# 🎓 College Event Registration System

A comprehensive MERN stack application for managing college events, student registrations, and event organization. Built with React, Node.js, Express.js, and MongoDB, featuring a beautiful UI with Tailwind CSS and shadcn/ui components.

## ✨ Features

### 🎯 Student Side
- **Event Discovery**: Browse upcoming events with detailed information
- **Easy Registration**: Simple registration process with form validation
- **Payment Integration**: Dummy payment system with transaction IDs
- **Winner Tracking**: View past year winners and achievements
- **AI Chatbot**: Get instant help and answers to FAQs
- **Certificate Generation**: Download certificates for winning events
- **Personal Dashboard**: Track registrations and event history

### 🧑‍💼 Event Organizer Side
- **Event Management**: Create, edit, and manage events
- **Registration Overview**: View and manage participant registrations
- **Winner Management**: Mark winners and generate results
- **Certificate System**: Automatically generate certificates for winners
- **Analytics Dashboard**: Track event performance and participation

### 🔧 Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live data synchronization
- **Secure Authentication**: JWT-based authentication system
- **Role-based Access**: Different interfaces for students and organizers
- **Modern UI/UX**: Beautiful animations and smooth interactions

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **PDFKit** - PDF generation for certificates

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd college-event-registration
```

### 2. Install Dependencies

Install all dependencies for both client and server:

```bash
npm run install-all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the server directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college-events
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Database Setup

Make sure MongoDB is running on your system, or update the `MONGODB_URI` in your `.env` file to point to your MongoDB instance.

## 🚀 Running the Application

### Development Mode

Run both client and server concurrently:

```bash
npm run dev
```

This will start:
- **Server**: http://localhost:5000
- **Client**: http://localhost:3000

### Production Mode

```bash
# Build the client
npm run build

# Start the server
npm start
```

### Individual Services

```bash
# Start only the server
npm run server:dev

# Start only the client
npm run client
```

## 📁 Project Structure

```
college-event-registration/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── package.json       # Backend dependencies
│   └── server.js          # Main server file
├── package.json            # Root package.json
└── README.md              # Project documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (organizer only)
- `PUT /api/events/:id` - Update event (organizer only)
- `DELETE /api/events/:id` - Delete event (organizer only)

### Registrations
- `POST /api/registrations` - Register for an event
- `GET /api/registrations/user/:userId` - Get user registrations
- `GET /api/registrations/event/:eventId` - Get event registrations

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/user/:userId` - Get user payments

## 🎨 UI Components

The application uses a custom design system built with Tailwind CSS:

- **Color Palette**: Custom college-themed colors
- **Typography**: Inter and Poppins font families
- **Components**: Cards, buttons, forms, and navigation
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first responsive design

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Role-based Access**: Different permissions for students and organizers
- **Input Validation**: Server-side validation and sanitization
- **Rate Limiting**: API rate limiting to prevent abuse

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly mobile interface

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/college-event-registration/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- **Tailwind CSS** for the amazing utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **MongoDB** for the flexible database solution
- **Express.js** for the robust backend framework

---

**Happy Coding! 🎉**

Built with ❤️ for college event management










