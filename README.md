# Purchase Requests Dashboard

This project is an Angular application that implements a Purchase Requests dashboard.
It demonstrates how to structure an Angular app for scale, apply a design system, and deliver a polished user experience.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Extensions Implemented](#extensions-implemented)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)

## Tech Stack

- Angular 15+
- Angular Material
- TypeScript, RxJS, SCSS

## Features

- **Routing & Layout**: `/tasks` route with a sidebar layout (Tasks, Users, Settings — only Tasks is functional).
- **List View**: Table display of tasks with:
  - Sorting by UID, Title, Status, Priority, Due Date, Assignee.
  - Pagination (5, 10, 20 items per page).
  - Text filter (search by title or requester).
  - Filter by status.
- **Detail / Edit**: Click a row to open a modal with editable fields. The same form component is used for both create and edit.

## Extensions Implemented

1.  **State management**: Angular Signals are used for reactive state management within the application. The `TaskService` utilizes signals to manage the list of tasks and users, providing a simple yet powerful way to handle data flow and updates.
2.  **Theme switcher**: Implemented a light and dark theme switcher, driven by SCSS variables (design tokens) and dynamically applied via Angular Material's theming system.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd purchase-dashboard
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Application

To run the application locally, execute the following command:

```bash
npm start / ng serve
```

Open your browser and navigate to `http://localhost:4200/`.

## Running Tests

### Unit Tests

To run the unit tests, execute:

```bash
ng test
```

### End-to-End Tests (Outline)

A detailed E2E test plan is outlined in `ARCHITECTURE.md`.

## TODOs for Future Work


- Implement real services using REST API for task CRUD operations.
- Add a new user administration page.
- Add a new configuration page.
