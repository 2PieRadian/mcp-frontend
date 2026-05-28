# Frontend Implementation Contract: Expert Applications

Use this document as the frontend handoff for the expert application workflow.

## Base URLs

All endpoints are under `/api/v1`.

Public:

- `POST /api/v1/expert-applications`

Admin-only:

- `GET /api/v1/admin/expert-applications`
- `GET /api/v1/admin/expert-applications/:id/resume`
- `PATCH /api/v1/admin/expert-applications/:id/status`
- `POST /api/v1/admin/expert-applications/:id/accept`
- `POST /api/v1/admin/expert-applications/:id/reject`
- `POST /api/v1/admin/expert-applications/:id/shortlist`

## Shared types

```ts
export type ExpertApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "ACCEPTED"
  | "REJECTED";

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ApiFieldError[];
};
```

## 1. Public Expert Application Submit

### Endpoint

`POST /api/v1/expert-applications`

### Auth

No authentication required.

### Content type

`multipart/form-data`

### Form fields

All fields are required.

- `fullName`: `string`
- `email`: `string`
- `phone`: `string`
- `expertise`: `string`
- `experience`: `string`
- `resume`: `File` (`PDF` only)

### Validation rules

- `fullName`: required, trimmed, max `120`
- `email`: required, trimmed, valid email, max `254`
- `phone`: required, trimmed, min `7`, max `20`, allowed chars are digits, spaces, `+`, `(`, `)`, `-`
- `expertise`: required, trimmed, max `150`
- `experience`: required, trimmed, max `2000`
- `resume`: required, `application/pdf`, max `5MB`

### Request example

```ts
const formData = new FormData();
formData.append("fullName", values.fullName);
formData.append("email", values.email);
formData.append("phone", values.phone);
formData.append("expertise", values.expertise);
formData.append("experience", values.experience);
formData.append("resume", file);

const response = await fetch("/api/v1/expert-applications", {
  method: "POST",
  body: formData,
});

const data = await response.json();
```

### Success response

Status: `201`

```json
{
  "success": true,
  "message": "Expert application submitted successfully",
  "application": {
    "id": 1,
    "fullName": "Raman Bhardwaj",
    "email": "raman@gmail.com",
    "expertise": "Anxiety Counselling",
    "createdAt": "2026-05-25T12:30:00.000Z"
  }
}
```

```ts
export type CreateExpertApplicationSuccessResponse = {
  success: true;
  message: string;
  application: {
    id: number;
    fullName: string;
    email: string;
    expertise: string;
    createdAt: string;
  };
};
```

### Error responses

Missing resume:

Status: `400`

```json
{
  "success": false,
  "message": "resume PDF file is required"
}
```

Validation error:

Status: `400`

```json
{
  "success": false,
  "message": "email must be a valid email address",
  "errors": [
    {
      "field": "email",
      "message": "email must be a valid email address"
    }
  ]
}
```

Invalid file type:

Status: `400`

```json
{
  "success": false,
  "message": "Only PDF resume files are allowed"
}
```

File too large:

Status: `413`

```json
{
  "success": false,
  "message": "Resume file size must not exceed 5MB"
}
```

Server failure:

Status: `500`

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 2. Admin List Expert Applications

### Endpoint

`GET /api/v1/admin/expert-applications`

### Auth

Admin JWT required.

### Headers

```http
Authorization: Bearer <admin_token>
```

### Query params

- `page`: number, default `1`
- `limit`: number, default `20`, max `100`
- `search`: string, optional, case-insensitive partial match across `fullName`, `email`, `phone`, `expertise`
- `status`: `PENDING | REVIEWED | SHORTLISTED | ACCEPTED | REJECTED`
- `sortBy`: `createdAt | reviewedAt | fullName`
- `sortOrder`: `asc | desc`

Example:

```http
/api/v1/admin/expert-applications?page=1&limit=20&search=raman&status=PENDING&sortBy=createdAt&sortOrder=desc
```

### Success response

Status: `200`

```json
{
  "success": true,
  "message": "Applications fetched successfully",
  "applications": [
    {
      "id": 1,
      "fullName": "Raman Bhardwaj",
      "email": "raman@gmail.com",
      "phone": "7078497263",
      "expertise": "Anxiety Counselling",
      "experience": "6 years working with anxiety and stress clients.",
      "status": "PENDING",
      "reviewedAt": null,
      "reviewedByAdminId": null,
      "resumeOriginalName": "raman-resume.pdf",
      "resumeMimeType": "application/pdf",
      "resumeSize": 248192,
      "createdAt": "2026-05-25T12:30:00.000Z",
      "resumeUrl": "/api/v1/admin/expert-applications/1/resume"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 53,
    "totalPages": 3
  }
}
```

```ts
export type AdminExpertApplicationItem = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  status: ExpertApplicationStatus;
  reviewedAt: string | null;
  reviewedByAdminId: string | null;
  resumeOriginalName: string;
  resumeMimeType: string;
  resumeSize: number;
  createdAt: string;
  resumeUrl: string;
};

export type GetAdminExpertApplicationsResponse = {
  success: true;
  message: string;
  applications: AdminExpertApplicationItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
```

### Error responses

Invalid query params:

Status: `400`

```json
{
  "success": false,
  "message": "Invalid request body"
}
```

Unauthorized:

Status: `401` or `403`

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## 3. Admin View or Download Resume

### Endpoint

`GET /api/v1/admin/expert-applications/:id/resume`

For download:

`GET /api/v1/admin/expert-applications/:id/resume?download=true`

### Auth

Admin JWT required.

### Response behavior

- default: PDF streams with `Content-Disposition: inline`
- if `download=true`: PDF streams with `Content-Disposition: attachment`

### Frontend usage

If admin auth is cookie-based:

```ts
window.open(`/api/v1/admin/expert-applications/${id}/resume`, "_blank");
```

If admin auth uses bearer token:

```ts
const response = await fetch(`/api/v1/admin/expert-applications/${id}/resume`, {
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}

const blob = await response.blob();
const url = URL.createObjectURL(blob);
window.open(url, "_blank");
```

Force download:

```ts
const response = await fetch(
  `/api/v1/admin/expert-applications/${id}/resume?download=true`,
  {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  },
);

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}

const blob = await response.blob();
const url = URL.createObjectURL(blob);
const anchor = document.createElement("a");
anchor.href = url;
anchor.download = resumeOriginalName;
anchor.click();
URL.revokeObjectURL(url);
```

### Resume endpoint errors

Invalid id:

Status: `400`

```json
{
  "success": false,
  "message": "Invalid expert application ID"
}
```

Application not found:

Status: `404`

```json
{
  "success": false,
  "message": "Expert application not found"
}
```

File missing on disk:

Status: `404`

```json
{
  "success": false,
  "message": "Resume file not found on disk"
}
```

Stream failure:

Status: `500`

```json
{
  "success": false,
  "message": "Internal server error: Failed to stream resume"
}
```

## 4. Admin Update Application Status

### Primary endpoint

`PATCH /api/v1/admin/expert-applications/:id/status`

### Auth

Admin JWT required.

### Headers

```http
Authorization: Bearer <admin_token>
Content-Type: application/json
```

### Request body

```json
{
  "status": "ACCEPTED"
}
```

Allowed values:

- `REVIEWED`
- `SHORTLISTED`
- `ACCEPTED`
- `REJECTED`

`PENDING` is not accepted in the update endpoint.

### Success response

Status: `200`

```json
{
  "success": true,
  "message": "Application status updated successfully",
  "application": {
    "id": 1,
    "status": "ACCEPTED",
    "reviewedAt": "2026-05-25T14:00:00.000Z",
    "reviewedByAdminId": "1"
  }
}
```

```ts
export type UpdateExpertApplicationStatusRequest = {
  status: Exclude<ExpertApplicationStatus, "PENDING">;
};

export type UpdateExpertApplicationStatusResponse = {
  success: true;
  message: string;
  application: {
    id: number;
    status: ExpertApplicationStatus;
    reviewedAt: string | null;
    reviewedByAdminId: string | null;
  };
};
```

### Convenience endpoints

- `POST /api/v1/admin/expert-applications/:id/accept`
- `POST /api/v1/admin/expert-applications/:id/reject`
- `POST /api/v1/admin/expert-applications/:id/shortlist`

Each returns the same response shape as the main status update endpoint.

### Transition behavior frontend should know

- `PENDING -> REVIEWED | SHORTLISTED | ACCEPTED | REJECTED` is allowed
- `REVIEWED -> SHORTLISTED | ACCEPTED | REJECTED` is allowed
- `SHORTLISTED -> ACCEPTED | REJECTED` is allowed
- once status is `ACCEPTED` or `REJECTED`, backend rejects further changes
- sending the same status again is accepted and returns the updated application

### Status update errors

Invalid id:

Status: `400`

```json
{
  "success": false,
  "message": "Invalid expert application ID"
}
```

Invalid status:

Status: `400`

```json
{
  "success": false,
  "message": "Invalid option: expected one of \"REVIEWED\"|\"SHORTLISTED\"|\"ACCEPTED\"|\"REJECTED\""
}
```

Not found:

Status: `404`

```json
{
  "success": false,
  "message": "Expert application not found"
}
```

Transition blocked:

Status: `400`

```json
{
  "success": false,
  "message": "Cannot change application status after it is ACCEPTED"
}
```

## Recommended frontend submit type

```ts
export type ExpertApplicationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  resume: File | null;
};
```

## Suggested admin table columns

- Applicant Name
- Email
- Phone
- Expertise
- Status
- Applied At
- Reviewed At
- Resume File Name
- Resume Size
- Actions

Suggested actions:

- `View Resume`
- `Download Resume`
- `Mark Reviewed`
- `Shortlist`
- `Accept`
- `Reject`

## Important backend constraints

- Resume access is never public
- There is no direct file URL to the storage folder
- `resumeUrl` is protected and must still be called with admin auth
- Uploaded PDFs remain on VM disk storage
- The database stores metadata only and uses `resumeStoredName` internally instead of an absolute path
- Admin listing supports pagination, search, filtering, and sorting
- There is still no delete application API
