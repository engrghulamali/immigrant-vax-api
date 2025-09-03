# Immigrant Vaccination Tracker – API

## Setup

1) Install dependencies
```
npm i
```

2) Create `.env` from `.env.example` and fill in your MongoDB + Firebase Admin SDK creds.

3) Run dev server
```
npm run dev
```

4) (Optional) Seed sample country requirements
```
npm run seed:requirements
```

Base URL: `http://localhost:4000/api`

**Auth:** Send Firebase ID token in `Authorization: Bearer <id_token>` header for protected routes.

## Endpoints

### Profiles
- `GET    /api/profile/me` – get my profile
- `POST   /api/profile` – create profile
- `PUT    /api/profile` – update profile
- `DELETE /api/profile` – delete my profile & cascade my data

### Vaccinations
- `POST   /api/vaccinations` – add record
- `GET    /api/vaccinations` – list my records
- `GET    /api/vaccinations/:id` – get one
- `PUT    /api/vaccinations/:id` – update
- `DELETE /api/vaccinations/:id` – delete

### Requirements (public)
- `GET /api/requirements/:country` – requirements by country name (case-insensitive)

### Reminders
- `POST   /api/reminders` – add reminder
- `GET    /api/reminders` – list my reminders (optional `?dueBefore=YYYY-MM-DD`)
- `DELETE /api/reminders/:id` – delete

## Examples

### Create/Update Profile
```
POST /api/profile
{
  "firstName": "Amina",
  "lastName": "Khan",
  "dateOfBirth": "1995-08-10",
  "countryOfOrigin": "Pakistan",
  "notes": "Immigration process starts 2025"
}
```

### Add Vaccination
```
POST /api/vaccinations
{
  "vaccineName": "MMR",
  "doseNumber": 1,
  "dateAdministered": "2024-05-01",
  "provider": "City Clinic",
  "country": "Pakistan"
}
```

### Get Requirements
```
GET /api/requirements/United%20States
```

### Create Reminder
```
POST /api/reminders
{
  "title": "Second dose of MMR",
  "dueAt": "2025-10-01T09:00:00.000Z",
  "channel": "in-app"
}
```
