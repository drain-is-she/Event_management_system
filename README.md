# Encore — Event Management System

A full-stack event discovery and ticket-booking project, built one file at a time as a learning journey for a BTech AI student.

## What are we building?

Encore will let attendees discover events, reserve tickets, complete sandbox checkout, and receive QR tickets. Organizers will create events and manage attendance. A later AI extension will recommend relevant events.

The first working journey is smaller:

**Browse an event → select a ticket quantity → reserve → save the booking → show confirmation.**

## Who uses it?

| Role | Planned actions |
|---|---|
| Attendee | Browse events, book tickets, view bookings, access tickets |
| Organizer | Publish and manage their own events, view registrations, check in attendees |
| Admin | Manage platform users, organizer approval, and reported events |

## How the pieces communicate

```text
React frontend in the browser
        |
        | HTTP requests to our web API; JSON responses
        v
Node.js + Express backend
        |
        | SQL queries through the pg database driver
        v
PostgreSQL database
```

- **Frontend:** the screens, forms, and buttons users interact with.
- **Backend:** server code that checks permissions, validates requests, and applies booking rules.
- **API:** an agreed interface for requesting operations. Our web API will expose endpoints such as `GET /api/events`.
- **Database driver:** a software library that connects backend code to a database. We plan to use `pg` for PostgreSQL.
- **Database:** persistent storage for accounts, events, bookings, and tickets.
- **Deployment:** running the application on servers so people can access it online.

Payments will use an additional external API. Our own API is needed even before payments exist.

## Planned technology stack

| Area | Technology | Purpose |
|---|---|---|
| Initial learning exercise | HTML and CSS | Understand page structure and styling |
| Frontend application | React and JavaScript | Build interactive screens |
| Development tooling | Vite and npm | Run and build the frontend; manage dependencies |
| Backend | Node.js and Express | Handle HTTP requests and business rules |
| Database | PostgreSQL and pg | Store data and execute SQL from the backend |
| Local database setup | Docker Compose | Run a reproducible PostgreSQL service |
| Testing | Node test runner; integration/browser tests as needed | Verify rules and user journeys |
| Version control | Git and GitHub | Track each explained increment |
| Deployment | Hosting provider to be selected | Publish frontend, backend, and database |

Redis and AI recommendations are later extensions. They will be introduced only with a clear purpose. Payment integration will begin in sandbox mode, without real charges.

## Project milestones

The checklist reflects **this repository**, not the separate reference prototype. The HTML/CSS/JavaScript learning page now supports event selection and ticket estimates. Backend and database integration remain planned.

- [x] **1. Project introduction:** explain the idea, architecture, roles, and learning plan.
- [x] **2. First webpage:** create a simple event card in HTML and explain every element.
- [x] **3. Styling:** add CSS, responsive layout, and a consistent visual design.
- [ ] **4. JavaScript basics:** represent events as data and implement filtering and interaction.
- [ ] **5. React application:** introduce components, props, state, and event discovery screens.
- [ ] **6. Backend API:** create Express endpoints and fetch events from the frontend.
- [ ] **7. Database:** draw an ER diagram, create tables and migrations, and connect PostgreSQL.
- [ ] **8. Reliable reservations:** persist bookings, enforce capacity, and test simultaneous requests and rollback.
- [ ] **9. Accounts:** add registration, login, secure password handling, sessions, roles, and ownership checks.
- [ ] **10. Management tools:** build organizer event editing, attendee booking history, admin controls, and reporting.
- [ ] **11. Seats and holds:** add numbered seats, expiring reservations, and protection against duplicate requests.
- [ ] **12. Sandbox payments:** verify webhooks and correctly handle success, failure, retries, and delayed confirmation.
- [ ] **13. Digital admission:** issue QR tickets, build the ticket wallet, and prevent duplicate check-in.
- [ ] **14. Quality and deployment:** complete integration tests, accessibility checks, CI, production configuration, backups, and a public demo.
- [ ] **15. Portfolio presentation:** add architecture diagrams, setup instructions, demo accounts, measured test results, and a walkthrough.
- [ ] **Optional AI extension:** compare interest/category matching with content-based event recommendations and document evaluation limitations.

## What will make this more than a basic CRUD app?

CRUD means creating, reading, updating, and deleting records. Encore will also need to enforce rules across multiple operations:

- Two customers cannot both buy the last available seat.
- Abandoned checkout must release temporary inventory.
- Repeated payment notifications must not create duplicate bookings.
- One organizer cannot modify another organizer's event.
- A ticket must not grant admission twice.

We will implement and test these behaviors before claiming they work.

## How we will learn and commit

Each learning increment will introduce one file whenever practical. For every file, we will explain:

1. Why it is needed.
2. Where it belongs.
3. What its important lines mean.
4. How it connects to existing files.
5. How to run or verify the change.

Some later features require coordinated changes to existing files; those changes will be explained explicitly. We will keep commits small and meaningful rather than copying the complete reference prototype into the repository at once.

## Current lesson: package.json

`package.json` lists the project's commands and development tools. `npm` reads it to install those tools and execute scripts. Vite serves the frontend locally and reloads it when files change; it is not our booking backend.

- `name` and `version`: project identity.
- `private`: prevents accidental publication as an npm package; it does not control GitHub visibility.
- `scripts.dev`: starts the learning frontend on port 5174, separate from the reference prototype on 5173.
- `scripts.check`: checks JavaScript syntax; this is not a functional test suite.
- `devDependencies`: tools used while developing, currently Vite.

Supporting files: `.gitignore` excludes installed dependencies and local configuration from Git. `package-lock.json` is generated by npm and records exact dependency resolutions; commit it, but do not edit it manually.

## Running the project

The current tool configuration was verified with Node.js 18.19.1 and npm 9.2.0. We will revisit runtime/tool versions before production deployment.

From this repository's directory:

```sh
npm install
npm run dev
```

Open http://localhost:5174. Stop the server with Ctrl+C. If the port is occupied, stop the existing server before restarting; strictPort prevents silently switching to a different port.

To check JavaScript syntax:

```sh
npm run check
```

The event data is still sample data in `events.js`. Ticket totals are browser estimates. No booking, payment, or database operation occurs. React and a production build command will be introduced in later lessons.
