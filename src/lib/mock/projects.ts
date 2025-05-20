export type Project = {
  id: string
  title: string
  overview: string
  description: string
  image: string
  techStack: string[]
  features: string[]
  learnings: string[]
  improvements: string[]
  liveUrl: string
  githubUrl: string
  category: string // Added category field
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    overview:
      "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
    description:
      "This e-commerce platform provides a comprehensive solution for online stores. It features a responsive design that works seamlessly across all devices, advanced product filtering and search capabilities, and a streamlined checkout process with multiple payment options including Stripe and PayPal.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Stripe API"],
    features: [
      "User authentication and profile management",
      "Product catalog with categories and filters",
      "Shopping cart with persistent storage",
      "Secure checkout with multiple payment options",
      "Order tracking and history",
      "Admin dashboard for product and order management",
    ],
    learnings: [
      "Implemented complex state management with React Context API",
      "Integrated third-party payment gateways securely",
      "Optimized database queries for better performance",
      "Implemented image optimization techniques for faster loading",
    ],
    improvements: [
      "Add real-time inventory tracking",
      "Implement product recommendation engine",
      "Add multi-language support",
      "Optimize for better mobile performance",
    ],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "React",
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    overview: "A collaborative task management application with real-time updates and team collaboration features.",
    description:
      "This task management application helps teams organize their work efficiently. It provides a clean, intuitive interface for creating, assigning, and tracking tasks. The app includes features like task prioritization, deadline tracking, and team collaboration tools to enhance productivity.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["React", "Firebase", "Tailwind CSS", "Redux", "React DnD"],
    features: [
      "Drag-and-drop task organization",
      "Real-time updates and notifications",
      "Team collaboration with comments",
      "Task filtering and sorting options",
      "Deadline tracking with reminders",
      "File attachments and sharing",
    ],
    learnings: [
      "Implemented real-time database with Firebase",
      "Created complex drag-and-drop interfaces",
      "Managed application state with Redux",
      "Designed responsive layouts for all device sizes",
    ],
    improvements: [
      "Add time tracking functionality",
      "Implement calendar view for deadlines",
      "Add integration with popular tools like Slack",
      "Improve offline functionality",
    ],
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/username/task-management",
    category: "React",
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracker",
    overview:
      "A comprehensive fitness tracking application that helps users monitor workouts, nutrition, and progress.",
    description:
      "This fitness tracking application enables users to record and analyze their fitness journey. It includes workout planning, nutrition tracking, and progress visualization through charts and statistics. The app is designed to motivate users by setting goals and celebrating achievements.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["React Native", "Node.js", "Express", "MongoDB", "Chart.js"],
    features: [
      "Workout planning and tracking",
      "Nutrition and calorie monitoring",
      "Progress visualization with charts",
      "Goal setting and achievement tracking",
      "Exercise library with instructions",
      "Social sharing and community features",
    ],
    learnings: [
      "Developed cross-platform mobile app with React Native",
      "Created RESTful API with Node.js and Express",
      "Implemented data visualization with Chart.js",
      "Designed user-friendly mobile interfaces",
    ],
    improvements: [
      "Add integration with fitness wearables",
      "Implement AI-based workout recommendations",
      "Add video tutorials for exercises",
      "Improve offline functionality",
    ],
    liveUrl: "https://example.com/fitnesstracker",
    githubUrl: "https://github.com/username/fitness-tracker",
    category: "React Native",
  },
  {
    id: "portfolio-website",
    title: "Developer Portfolio",
    overview: "A modern developer portfolio website showcasing skills, projects, and professional experience.",
    description:
      "This portfolio website serves as a professional showcase for a web developer. It features a clean, modern design with sections for projects, skills, experience, and contact information. The site is fully responsive and optimized for all devices.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["JavaScript", "HTML5", "CSS3", "GSAP", "Webpack"],
    features: [
      "Interactive project showcase",
      "Animated page transitions",
      "Skills visualization",
      "Contact form with validation",
      "Performance optimized images",
      "Dark/light theme toggle",
    ],
    learnings: [
      "Created custom animations with GSAP",
      "Implemented responsive design principles",
      "Optimized site performance and loading speed",
      "Designed intuitive navigation experience",
    ],
    improvements: [
      "Add blog section",
      "Implement internationalization",
      "Add more interactive elements",
      "Create case studies for major projects",
    ],
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    category: "JavaScript",
  },
  {
    id: "blog-platform",
    title: "Personal Blog Platform",
    overview: "A custom blog platform with content management system and reader engagement features.",
    description:
      "This blog platform provides a complete solution for content creators. It includes a user-friendly content management system, reader engagement tools, and analytics. The platform is designed to be fast, SEO-friendly, and easy to customize.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["WordPress", "PHP", "MySQL", "JavaScript", "CSS3"],
    features: [
      "Custom theme development",
      "Advanced content editor",
      "Comment system with moderation",
      "Social media integration",
      "SEO optimization tools",
      "Performance caching",
    ],
    learnings: [
      "Developed custom WordPress theme",
      "Created custom post types and taxonomies",
      "Implemented caching for performance",
      "Optimized database queries",
    ],
    improvements: [
      "Add membership functionality",
      "Implement newsletter integration",
      "Add more customization options",
      "Create mobile app companion",
    ],
    liveUrl: "https://example.com/blog",
    githubUrl: "https://github.com/username/blog-platform",
    category: "WordPress",
  },
  {
    id: "ecommerce-theme",
    title: "Custom Shopify Theme",
    overview: "A premium Shopify theme designed for fashion and apparel online stores.",
    description:
      "This custom Shopify theme is specifically designed for fashion and apparel brands. It features a clean, modern design with emphasis on product photography. The theme includes custom product pages, collection layouts, and a streamlined checkout process.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["Shopify", "Liquid", "JavaScript", "SCSS", "Themekit"],
    features: [
      "Custom product page layouts",
      "Advanced filtering options",
      "Quick view functionality",
      "Instagram feed integration",
      "Size guide popup",
      "Product recommendations",
    ],
    learnings: [
      "Mastered Shopify's Liquid templating language",
      "Implemented custom section settings",
      "Created reusable components",
      "Optimized theme for performance",
    ],
    improvements: [
      "Add AR product visualization",
      "Implement advanced search functionality",
      "Add more customization options",
      "Create companion mobile app",
    ],
    liveUrl: "https://example.com/shopify-theme",
    githubUrl: "https://github.com/username/shopify-theme",
    category: "Shopify",
  },
  {
    id: "weather-app",
    title: "Weather Forecast App",
    overview: "A weather forecast application with location-based weather data and interactive visualizations.",
    description:
      "This weather application provides users with accurate weather forecasts based on their location. It features interactive maps, hourly and daily forecasts, and weather alerts. The app is designed to be user-friendly and visually appealing.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["JavaScript", "HTML5", "CSS3", "OpenWeatherMap API", "Chart.js"],
    features: [
      "Location-based weather forecasts",
      "Interactive weather maps",
      "Hourly and daily forecasts",
      "Weather alerts and notifications",
      "Temperature and precipitation charts",
      "Saved locations",
    ],
    learnings: [
      "Integrated third-party weather API",
      "Created interactive data visualizations",
      "Implemented geolocation features",
      "Designed responsive mobile-first interface",
    ],
    improvements: [
      "Add more detailed weather data",
      "Implement offline functionality",
      "Add weather history feature",
      "Create widget for home screen",
    ],
    liveUrl: "https://example.com/weather-app",
    githubUrl: "https://github.com/username/weather-app",
    category: "JavaScript",
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    overview: "A modern website for a restaurant with online ordering and reservation system.",
    description:
      "This restaurant website provides a complete online presence for a dining establishment. It features an elegant design showcasing the restaurant's ambiance and menu. The site includes online ordering, reservation system, and event booking functionality.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    techStack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "CSS3"],
    features: [
      "Online menu with filtering options",
      "Reservation system integration",
      "Online ordering and payment",
      "Event booking functionality",
      "Photo gallery and virtual tour",
      "Customer reviews and testimonials",
    ],
    learnings: [
      "Customized WordPress for restaurant needs",
      "Integrated reservation system",
      "Implemented online ordering with WooCommerce",
      "Created custom post types for menu items",
    ],
    improvements: [
      "Add loyalty program integration",
      "Implement table management system",
      "Add multilingual support",
      "Create mobile app for ordering",
    ],
    liveUrl: "https://example.com/restaurant",
    githubUrl: "https://github.com/username/restaurant-website",
    category: "WordPress",
  },
]

// Get unique categories from projects
export const getCategories = (): string[] => {
  const categories = projects.map(project => project.category)
  return ['All', ...Array.from(new Set(categories))]
}
