# 🏗️ PostSmith AI — System Design Document

## 1. Architecture Overview

PostSmith AI is built using a modular client-server architecture, designed for scalability, maintainability, and extensibility. The system consists of a React-based frontend, a Node.js/Express backend, a MongoDB Atlas database, and integration with the Google Gemini AI API for content generation.

### High-Level Architecture Diagram

```
+---------+        HTTPS        +----------------+        HTTPS        +-------------------+
|  User   | <-----------------> |   Frontend     | <-----------------> |     Backend       |
+---------+    (Browser)        |  (React App)   |    (REST API)      | (Node.js/Express) |
                                  |                |                    |
                                  |                |                    |
                                  |                |                    v
                                  |                |              +-------------------+
                                  |                |              |   MongoDB Atlas   |
                                  |                |              +-------------------+
                                  |                |
                                  |                v
                                  |         +-------------------+
                                  |         | Google Gemini API |
                                  |         +-------------------+
```

---

## 2. Data Design

### Entities & Schemas

#### User Input

- **topic**: `String` — Subject of the LinkedIn post.
- **audience**: `String` — Target audience (e.g., recruiters, peers).
- **tone**: `String` — Desired tone (e.g., formal, friendly).
- **length**: `String` — Approximate length (e.g., short, medium, long).
- **hashtags**: `[String]` — Relevant hashtags.

#### Generated Post

- **_id**: `ObjectId` — Unique identifier.
- **content**: `String` — Generated post text.
- **createdAt**: `Date` — Timestamp.
- **parameters**: `Object` — Stores input parameters.
- **userId**: `String` (optional) — For future multi-user support.

#### MongoDB Collections

- **posts**: Stores generated posts and metadata.
- **users**: (optional, for future multi-user features).

#### Example Post Document

```json
{
  "_id": "ObjectId",
  "content": "Excited to share my latest project...",
  "createdAt": "2025-09-16T12:34:56Z",
  "parameters": {
    "topic": "AI automation",
    "audience": "LinkedIn professionals",
    "tone": "enthusiastic",
    "length": "medium",
    "hashtags": ["#AI", "#Automation"]
  },
  "userId": "user123"
}
```

---

## 3. Component Breakdown

### Frontend (React + Tailwind CSS)

- **Input Form Component**
  - Collects user parameters for post generation.
  - Validates input and triggers API calls.
- **Preview Component**
  - Displays generated LinkedIn post in real-time.
  - Allows user to edit before saving.
- **Dashboard Component**
  - Lists saved posts.
  - Search, filter, and manage posts.
- **API Service**
  - Handles communication with backend endpoints.
  - Manages authentication (future).

### Backend (Node.js + Express)

- **API Endpoints**
  - `POST /generate`: Accepts user input, invokes AI agent, returns generated post.
  - `GET /posts`: Retrieves saved posts.
  - `POST /posts`: Saves a generated post.
  - `DELETE /posts/:id`: Deletes a post (future).
- **AI Agent Module**
  - Orchestrates reasoning, planning, drafting, polishing, and applies guardrails using Gemini API.
  - Modular design for future multi-agent support.
- **Database Layer**
  - Interfaces with MongoDB Atlas for storing/retrieving posts.
  - Handles schema validation and error management.

### External Integrations

- **Google Gemini API**
  - Used for AI-powered content generation.
  - Secure API key management via environment variables.
- **(Planned) RAG/MCP/Custom Tools**
  - For multi-agent collaboration and advanced features.

---

## 4. Chosen Technologies & Rationale

- **React**
  - Component-based architecture for maintainable UI.
  - Fast rendering and rich ecosystem.
- **Tailwind CSS**
  - Utility-first CSS for rapid, responsive design.
- **Node.js + Express**
  - Non-blocking, event-driven backend.
  - Easy integration with AI APIs and MongoDB.
- **MongoDB Atlas**
  - Cloud-hosted, scalable NoSQL database.
  - Flexible schema for unstructured content.
- **Google Gemini API**
  - State-of-the-art AI for natural language generation.
- **Render & Vercel**
  - Simple, reliable cloud deployment for backend and frontend.

---

## 5. Reasoning Behind Choices

- **Scalability:**  
  Chosen stack supports scaling to more users and features (multi-agent, scheduling).
- **Extensibility:**  
  Modular design allows easy addition of new agents, integrations, and operational features.
- **Developer Experience:**  
  Popular tools and frameworks for rapid development and community support.
- **Security:**  
  Sensitive data managed via environment variables; future plans for authentication and access control.
- **Maintainability:**  
  Clear separation of concerns and use of modern best practices.

---

## 6. Future Extensions

- **Multi-agent Collaboration:**  
  Planner + Executor agents for more complex workflows.
- **External Integrations:**  
  RAG, MCP, and custom tools for enhanced capabilities.
- **Scheduling & Batch Execution:**  
  Automate posting and batch content generation.
- **Plan Monitoring & Editing:**  
  UI for reviewing and editing the agent’s plan.
- **User Authentication:**  
  Support for multiple users and personalized dashboards.

---

## 7. Deployment & Operations

- **Frontend:**  
  Deployed on Vercel for fast, global delivery.
- **Backend:**  
  Deployed on Render for scalable API hosting.
- **Database:**  
  Managed by MongoDB Atlas for reliability and backups.
- **Environment Variables:**  
  All secrets (API keys, DB URIs) stored securely.

---

**PostSmith AI** — Designed for intelligent automation, extensibility, and real