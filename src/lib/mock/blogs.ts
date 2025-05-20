export type TBlog = {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    image: string
  }
  date: string
  tags: string[]
  image: string
  readTime: string
}

export const blogs: TBlog[] = [
  {
    id: "modern-web-development-trends",
    title: "Modern Web Development Trends in 2025",
    excerpt:
      "Explore the latest trends in web development including AI integration, serverless architecture, and more that are shaping the future of the web.",
    content: `
# Modern Web Development Trends in 2025

The landscape of web development is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we move through 2025, several key trends are shaping how developers build and deploy web applications.

## AI-Powered Development Tools

Artificial Intelligence has revolutionized the way we approach web development. AI-powered tools now assist developers in writing code, debugging applications, and even designing user interfaces. These tools analyze patterns in code and suggest improvements, helping developers work more efficiently and reduce errors.

Some notable AI development tools include:

- GitHub Copilot X for advanced code suggestions
- AI-driven design systems that generate responsive layouts
- Automated testing tools that identify potential bugs before deployment

## Serverless Architecture

Serverless computing continues to gain popularity as it allows developers to build and run applications without thinking about servers. This approach enables automatic scaling, reduced operational costs, and faster deployment cycles.

Key benefits of serverless architecture:

1. **Pay-per-use pricing model**: Only pay for the compute time you consume
2. **Automatic scaling**: Applications automatically scale based on demand
3. **Reduced maintenance**: No server management required
4. **Faster time to market**: Focus on code rather than infrastructure

## WebAssembly (Wasm)

WebAssembly has matured significantly, allowing developers to run high-performance code in the browser. This technology enables complex applications like video editing, 3D rendering, and games to run efficiently on the web.

## Edge Computing

Edge computing brings computation closer to the data source, reducing latency and improving user experience. With frameworks like Next.js and Vercel's Edge Functions, developers can run code at the edge of the network, delivering faster responses to users worldwide.

## Micro-Frontends

The micro-frontend architecture extends microservices principles to frontend development. By breaking down frontend applications into smaller, independent pieces, teams can work more autonomously and deploy changes more frequently.

## Conclusion

As web development continues to evolve, staying updated with these trends is essential for building modern, efficient, and user-friendly applications. By embracing AI tools, serverless architectures, WebAssembly, edge computing, and micro-frontends, developers can create better web experiences for users around the world.
    `,
    author: {
      name: "Alex Johnson",
      image: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    date: "May 15, 2025",
    tags: ["Web Development", "Technology", "AI", "Serverless"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readTime: "5 min read",
  },
  {
    id: "mastering-react-hooks",
    title: "Mastering React Hooks: Beyond the Basics",
    excerpt:
      "Take your React skills to the next level by mastering advanced hooks patterns and creating custom hooks for reusable logic.",
    content: `
# Mastering React Hooks: Beyond the Basics

React Hooks have transformed how we build React applications since their introduction. While most developers are familiar with basic hooks like useState and useEffect, there's a whole world of advanced patterns and custom hooks that can take your React applications to the next level.

## Advanced useEffect Patterns

The useEffect hook is powerful but can be tricky to use correctly. Here are some advanced patterns:

### Dependency Array Optimization

One common mistake is including too many dependencies in the dependency array:

\`\`\`jsx
// Instead of this
useEffect(() => {
  // Effect code
}, [prop1, prop2, prop3, prop4, prop5]);

// Consider extracting a custom hook or using useMemo
const derivedValue = useMemo(() => {
  return computeValueFrom(prop1, prop2, prop3);
}, [prop1, prop2, prop3]);

useEffect(() => {
  // Effect code
}, [derivedValue, prop4, prop5]);
\`\`\`

### Cleanup Functions

Always implement cleanup functions for subscriptions, timers, and event listeners:

\`\`\`jsx
useEffect(() => {
  const subscription = subscribeToData(dataId);
  
  return () => {
    subscription.unsubscribe();
  };
}, [dataId]);
\`\`\`

## Creating Custom Hooks

Custom hooks allow you to extract component logic into reusable functions. Here's an example of a custom hook for handling form state:

\`\`\`jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    callback();
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  };
}
\`\`\`

## useReducer for Complex State

When state logic becomes complex, useReducer provides a more structured approach:

\`\`\`jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  // Component code
}
\`\`\`

## Performance Optimization with useMemo and useCallback

These hooks help prevent unnecessary re-renders:

- **useMemo**: Memoizes computed values
- **useCallback**: Memoizes callback functions

\`\`\`jsx
// Memoize expensive calculations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);

// Memoize callback functions
const handleItemClick = useCallback((id) => {
  console.log('Item clicked:', id);
  // Additional logic
}, [/* dependencies */]);
\`\`\`

## Conclusion

Mastering React Hooks goes beyond knowing the API. It involves understanding patterns, optimizations, and when to create custom hooks. By applying these advanced techniques, you'll write more maintainable, performant, and reusable React code.
    `,
    author: {
      name: "Sarah Chen",
      image: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    date: "April 28, 2025",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readTime: "7 min read",
  },
  {
    id: "building-accessible-web-applications",
    title: "Building Truly Accessible Web Applications",
    excerpt:
      "Learn how to create web applications that are accessible to everyone, including people with disabilities, and why it matters.",
    content: `
# Building Truly Accessible Web Applications

Web accessibility is not just a nice-to-have feature—it's a necessity. Creating accessible web applications ensures that people with disabilities can use your website effectively. Beyond being the right thing to do, it also expands your user base and often improves the experience for all users.

## Understanding Web Accessibility

Web accessibility means designing and developing websites that people with disabilities can perceive, understand, navigate, and interact with. This includes accommodations for:

- Visual impairments (blindness, low vision, color blindness)
- Hearing impairments
- Motor impairments
- Cognitive disabilities

## Key Principles of Accessible Design

### 1. Perceivable Information

Users must be able to perceive the information being presented. This means providing text alternatives for non-text content:

- Add alt text to images
- Provide captions and transcripts for videos
- Ensure sufficient color contrast
- Make content adaptable to different viewing contexts

### 2. Operable Interface

Users must be able to operate the interface:

- Make all functionality available from a keyboard
- Give users enough time to read and use content
- Avoid content that could cause seizures
- Provide ways to help users navigate and find content

### 3. Understandable Information

Users must be able to understand the information and interface:

- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust Content

Content must be robust enough to be interpreted by a variety of user agents, including assistive technologies:

- Maximize compatibility with current and future tools
- Use proper semantic HTML
- Follow ARIA best practices when needed

## Practical Implementation

### Semantic HTML

Using the right HTML elements for their intended purpose is the foundation of accessibility:

\`\`\`html
<!-- Instead of this -->
<div class="button" onclick="submitForm()">Submit</div>

<!-- Use this -->
<button type="submit">Submit</button>
\`\`\`

### ARIA Attributes

When HTML isn't enough, ARIA (Accessible Rich Internet Applications) attributes can help:

\`\`\`html
<div role="alert" aria-live="assertive">
  Form submitted successfully!
</div>
\`\`\`

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

\`\`\`jsx
function AccessibleButton() {
  return (
    <button 
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      Click Me
    </button>
  );
}
\`\`\`

### Focus Management

Properly manage focus, especially in single-page applications:

\`\`\`jsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Save previous focus
      const previousFocus = document.activeElement;
      
      // Focus the modal
      modalRef.current.focus();
      
      return () => {
        // Restore focus when modal closes
        previousFocus.focus();
      };
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div 
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}
\`\`\`

## Testing for Accessibility

Regular testing is crucial for ensuring accessibility:

1. **Automated testing** with tools like Axe, Lighthouse, or WAVE
2. **Manual testing** with keyboard navigation and screen readers
3. **User testing** with people who have disabilities

## Conclusion

Building accessible web applications is not just about compliance with standards—it's about creating inclusive experiences that work for everyone. By following these principles and practices, you can ensure your web applications are truly accessible to all users.
    `,
    author: {
      name: "Marcus Lee",
      image: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    date: "March 12, 2025",
    tags: ["Accessibility", "Web Development", "UX", "HTML"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readTime: "6 min read",
  },
  {
    id: "optimizing-website-performance",
    title: "Optimizing Website Performance: Speed Matters",
    excerpt:
      "Discover practical techniques to improve your website's loading speed and overall performance for better user experience and SEO.",
    content: `
# Optimizing Website Performance: Speed Matters

In today's fast-paced digital world, website performance is more critical than ever. Users expect websites to load quickly, and search engines like Google consider page speed as a ranking factor. This article explores practical techniques to optimize your website's performance.

## Why Performance Matters

- **User Experience**: 53% of mobile users abandon sites that take longer than 3 seconds to load
- **Conversion Rates**: A 1-second delay in page load time can result in a 7% reduction in conversions
- **SEO Rankings**: Page speed is a direct ranking factor for search engines
- **Bounce Rates**: Slow sites have significantly higher bounce rates

## Core Web Vitals

Google's Core Web Vitals have become the standard metrics for measuring user experience:

### Largest Contentful Paint (LCP)

LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

Optimization techniques:
- Optimize server response times
- Remove render-blocking resources
- Optimize and compress images
- Implement proper resource prioritization

### First Input Delay (FID)

FID measures interactivity. Pages should have a FID of less than 100 milliseconds.

Optimization techniques:
- Minimize JavaScript execution time
- Break up long tasks
- Optimize event handlers
- Use web workers for complex operations

### Cumulative Layout Shift (CLS)

CLS measures visual stability. Pages should maintain a CLS of less than 0.1.

Optimization techniques:
- Always include size attributes on images and videos
- Reserve space for ads, embeds, and iframes
- Avoid inserting content above existing content
- Preload fonts to prevent layout shifts

## Image Optimization

Images often account for most of the downloaded bytes on a webpage. Optimizing them can significantly improve performance:

### Modern Image Formats

Use next-generation formats like WebP, AVIF, or JPEG XL:

\`\`\`jsx
// In Next.js
import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/example.jpg"
      alt="Description"
      width={800}
      height={600}
      priority
    />
  );
}
\`\`\`

### Responsive Images

Serve different image sizes based on the device:

\`\`\`html
<picture>
  <source media="(max-width: 600px)" srcset="small.jpg">
  <source media="(max-width: 1200px)" srcset="medium.jpg">
  <img src="large.jpg" alt="Description">
</picture>
\`\`\`

### Lazy Loading

Only load images when they're about to enter the viewport:

\`\`\`html
<img src="example.jpg" loading="lazy" alt="Description">
\`\`\`

## JavaScript Optimization

### Code Splitting

Split your JavaScript bundle into smaller chunks:

\`\`\`jsx
// React with dynamic imports
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

### Tree Shaking

Eliminate dead code from your bundles:

\`\`\`javascript
// Instead of
import * as utils from './utils';

// Use specific imports
import { specificFunction } from './utils';
\`\`\`

## CSS Optimization

### Critical CSS

Inline critical CSS and defer non-critical CSS:

\`\`\`html
<head>
  <style>
    /* Critical CSS here */
    .header { /* ... */ }
    .hero { /* ... */ }
  </style>
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
\`\`\`

### Reduce Unused CSS

Remove unused CSS rules with tools like PurgeCSS.

## Caching Strategies

Implement effective caching strategies:

\`\`\`
# Example Cache-Control headers
Cache-Control: public, max-age=31536000, immutable  # For versioned static assets
Cache-Control: no-cache  # For HTML
\`\`\`

## Conclusion

Website performance optimization is an ongoing process that requires attention to detail and regular monitoring. By focusing on Core Web Vitals and implementing the techniques outlined in this article, you can significantly improve your website's loading speed, user experience, and search engine rankings.

Remember that even small improvements can have a significant impact on user experience and business metrics. Start optimizing today!
    `,
    author: {
      name: "Priya Sharma",
      image: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    date: "February 8, 2025",
    tags: ["Performance", "Web Development", "SEO", "Optimization"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readTime: "8 min read",
  },
]
