**SilverChat - The 60+ Companionship Network** - *Alpha 1 Release*

# Technical Architecture



[TOC] 

## 1. Phase 1: Alpha Development (Initial MVP)

**Objective:** To develop a functional Minimum Viable Product (MVP) demonstrating SilverChat's core user experience and foundational features using a strict Test-Driven Development (TDD) methodology. This phase validates the core concept and establishes the technical base.

**Methodology:** Development will rigorously follow TDD principles using Jest. Tests will be written _before_ implementation code for all functionalities, ensuring code quality, maintainability, and facilitating future development. The application will be structured using the Model-View-Controller (MVC) pattern.

**Alpha Features & TDD Application:**

1.  **User Authentication (Backend & Frontend):**
    *   Functionality: Secure user registration and login.
    *   _TDD Approach:_ Test registration success/failure (e.g., duplicate email), login success/failure, password security, session management. Test frontend validation.
2.  **Member Profile:**
    *   Functionality: Basic profile creation (username, bio, interests). View own/others' profiles.
    *   _TDD Approach:_ Test profile data storage, retrieval, and display logic.
3.  **Member Connections:**
    *   Functionality: Send, receive, accept, decline connection requests. View connections list.
    *   _TDD Approach:_ Test connection state changes, database updates, and correct list display.
4.  **Basic Text Chat:**
    *   Functionality: One-to-one text chat between connected members.
    *   _TDD Approach:_ Test message sending, receiving, storage, and history retrieval.
5.  **Member Groups (Basic):**
    *   Functionality: View predefined groups, join/leave groups, view group members.
    *   _TDD Approach:_ Test membership logic, database updates, list retrieval.
6.  **Notifications (Basic):**
    *   Functionality: In-app notifications for connection requests, new messages.
    *   _TDD Approach:_ Test notification generation, retrieval, display, and read-status updates.
7.  **'SilverChat Agent' Placeholder:**
    *   Functionality: A static UI element within the chat or profile interface visually representing where the future voice/video controls (as shown in the concept mock-up) will reside. No actual calling functionality in Alpha.
    *   _TDD Approach:_ Test the conditional rendering of these placeholder UI elements.

**Prototype:** A demonstration involving ~5 mock user profiles illustrating key user journeys (registration, connection, chat) and frontend-backend interaction.



---



## 2. Technical Stack

*   **Frontend:** Vanilla JavaScript (ES6+) - _Client-side logic and DOM manipulation._
*   **Backend:** Node.js with Express.js framework - _Server-side logic, API routing, and request handling._
*   **Database:** PostgreSQL - _Relational database for persistent data storage._
*   **Database Interaction & Migrations:** Knex.js - _SQL query builder for interacting with the database in code and a robust migration tool for managing database schema changes._
*   **Backend Testing:** Jest - _JavaScript testing framework for implementing Test-Driven Development (TDD) for backend logic._
*   **API Development/Testing Tool:** Insomnia (or similar like Postman) - _Used during development for sending requests to the backend API and inspecting responses._
*   **Architecture:** Model-View-Controller (MVC) - _Backend architectural pattern for separation of concerns._



---



## 3. Development Methodology & Team

*   **Methodology:** Strict Test-Driven Development (TDD) using Jest. Backend development will employ Object-Oriented Programming (OOP) principles using modern ES6+ JavaScript. Agile principles (iterative development, small testable units) applied. Red-Green-Refactor cycle enforced.  
*   **Team:** Louie Morais (Founder)
    *   Roles: Product Owner, UX/UI Designer, Full-Stack JavaScript Developer.



---



## 4. Structure



```Text
silverchat/
├── .gitignore    # Specifies intentionally untracked files that Git should ignore
├── README.md    # Project overview, setup instructions, etc.
│
├── backend/    # Contains all Node.js/Express backend code
│   ├── src/    # Source code for the backend application
│   │   ├── api/    # API route definitions (the 'V'iew layer in API context)
│   │   │   └── index.js   # Main router to aggregate all other route files
│   │   │   └── auth.routes.js
│   │   │   └── users.routes.js
│   │   │   └── connections.routes.js
│   │   │   └── messages.routes.js
│   │   │   └── groups.routes.js
│   │   │   └── notifications.routes.js
│   │   │
│   │   ├── controllers/   # Handles incoming requests, interacts with models/services (the 'C'ontroller)
│   │   │   └── auth.controller.js
│   │   │   └── users.controller.js
│   │   │   └── connections.controller.js
│   │   │   └── messages.controller.js
│   │   │   └── groups.controller.js
│   │   │   └── notifications.controller.js
│   │   │
│   │   ├── models/    # Handles data logic and database interaction (the 'M'odel)
│   │   │   └── user.model.js
│   │   │   └── connection.model.js
│   │   │   └── message.model.js
│   │   │   └── group.model.js
│   │   │   └── notification.model.js
│   │   │   └── db.js    # Database connection setup (e.g., PostgreSQL pool)
│   │   │
│   │   ├── middleware/    # Custom Express middleware (e.g., authentication checks, validation)
│   │   │   └── requireAuth.js
│   │   │   └── validateInput.js
│   │   │
│   │   ├── services/    # Optional: For complex business logic separating it from controllers
│   │   │
│   │   ├── config/    # Configuration files (database credentials, environment variables)
│   │   │   └── index.js
│   │   │   └── database.config.js
│   │   │
│   │   ├── utils/    # Utility/helper functions
│   │   │   └── passwordUtils.js
│   │   │
│   │   ├── app.js    # Express application setup (middleware, routes)
│   │   └── server.js    # Server initialisation (starts listening for requests)
│   │
│   ├── __tests__/    # Backend tests using Jest (Updated folder name convention)
│   │   ├── unit/    # Unit tests for models, utils, services
│   │   ├── integration/   # Integration tests for controllers, API endpoints
│   │   └── setup.js    # Global test setup/teardown (e.g., test database connection)
│   │
│   ├── .env    # Environment variables (DB connection strings, secrets) - MUST be in .gitignore
│   ├── .env.example    # Example environment variables file for reference
│   ├── package.json    # Backend dependencies and scripts
│   └── jest.config.js    # Jest configuration for the backend
│
└── frontend/    # Contains all Vanilla JS frontend code
    ├── public/    # Static assets served directly by the web server
    │   ├── index.html    # Main entry point for the application
    │   ├── css/    # CSS stylesheets
    │   │   └── main.css
    │   ├── images/    # Image assets
    │   └── favicon.ico
    │
    ├── src/    # Frontend JavaScript source code
    │   ├── js/    # Main JavaScript files
    │   │   └── main.js    # Main script, initializes the app
    │   │   └── apiService.js # Functions for making requests to the backend API
    │   │   └── auth.js    # Handles login/registration forms and logic
    │   │   └── chat.js    # Handles chat interface logic
    │   │   └── profile.js   # Handles profile display/editing logic
    │   │   └── uiComponents.js # Functions to create/update parts of the UI
    │   │   └── utils.js    # Frontend utility functions
    │
    └── __tests__/    # Frontend tests (using Jest, potentially with JSDOM) (Updated folder name convention)
        ├── unit/
        └── setup.js
        # Optional: package.json for frontend dev dependencies (linter, jest)
        # Optional: jest.config.js for frontend tests

```



---



## 5. Potential Challenges & Mitigation

- **Technical Complexity:** Implementing even basic real-time features requires careful planning. _Mitigation:_ Strict adherence to TDD, breaking down tasks, focusing on core MVP logic.
- **Scope Management:** Balancing the ambitious vision with achievable Alpha goals. _Mitigation:_ Rigorous adherence to the defined Alpha scope, logging future ideas.
- **TDD Implementation:** Ensuring effective TDD practice. _Mitigation:_ Consistent application of the Red-Green-Refactor cycle, starting with simple tests.