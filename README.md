# Smart Cart

An E-Commerce website powered by AI recommendations.

## Webapp

Built with React, using Tailwind CSS or Material-UI for styling and responsive design. It includes a clean navigation layout with routes for the homepage, product listing, product details, cart, and user authentication pages. The homepage features product carousels for “Featured” and “Recommended for You” items, dynamically rendered using React hooks and props.

## API

Leverages Spring Boot with a layered architecture (Controller → Service → Repository). It uses Spring Security with JWT for user authentication and role-based access (admin vs customer). Product and user data are persisted in a PostgreSQL database using JPA/Hibernate. AI recommendations generated from user's purchase history and tags to better serve them.

## Design

Credit to **Raouf Belakhdar** for the Figma E-Commerce [Wireframe](https://www.figma.com/community/file/1102233251923362930/e-commerce-ui-figma-ecommerce-ui-kit-demo-version).
