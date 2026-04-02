# Urgent Request APIs - Frontend Documentation

## Overview

The Urgent Request feature allows users to request emergency consultations when an expert has `emergencyAvailable=true` but no available time slots. Users pay Rs 25 to get access to the company phone number, call to coordinate, and if approved by admin, pay the full session amount for an immediate 1-hour session.

## Flow Summary

```
1. User initiates request (POST /initiate) → Gets Razorpay order for Rs 25
2. User pays Rs 25 → Verifies payment (POST /verify-request-fee) → Gets company phone number
3. User calls company phone to explain urgency
4. Admin reviews and approves/rejects the request
5. If approved → User gets email with 15-min payment deadline
6. User pays full amount (POST /:id/initiate-payment → POST /:id/verify-payment)
7. Appointment is created, starting in 5 minutes
```

## User APIs

### 1. Initiate Urgent Request

**Endpoint:** `POST /api/v1/urgent-requests/initiate`

**Auth:** Required (User)

**Request Body:**

```json
{
  "expertId": 123, // Optional - null for "any expert"
  "reason": "Brief description of urgency" // Optional, max 1000 chars
}
```

**Response (200):**

```json
{
  "message": "Urgent request initiated. Please complete payment.",
  "requestId": 1,
  "orderId": "order_xyz123",
  "amount": 2500, // In paise (Rs 25)
  "currency": "INR",
  "keyId": "rzp_xxx",
  "expiresAt": "2026-04-02T08:30:00.000Z"
}
```

**Error Responses:**

- `400` - Expert not found or doesn't accept emergency bookings
- `429` - Rate limit exceeded (max 3 requests/day)

```json
{
  "message": "You can only create 3 urgent requests per day",
  "nextAvailableAt": "2026-04-03T00:00:00.000Z"
}
```

---

### 2. Verify Request Fee (Rs 25 Payment)

**Endpoint:** `POST /api/v1/urgent-requests/verify-request-fee`

**Auth:** Required (User)

**Request Body:**

```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_string"
}
```

**Response (200):**

```json
{
  "message": "Payment verified",
  "requestId": 1,
  "companyPhone": "+91XXXXXXXXXX",
  "contactValidUntil": "2026-04-02T08:00:00.000Z",
  "contactValiditySeconds": 1800, // 30 minutes
  "userStatus": "Awaiting admin confirmation"
}
```

**Frontend Notes:**

- Display `companyPhone` prominently
- Show countdown timer using `contactValiditySeconds`
- After expiry, phone number should not be shown again

---

### 3. Get My Urgent Requests

**Endpoint:** `GET /api/v1/urgent-requests/my-requests`

**Auth:** Required (User)

**Query Params:**

- `status` - Filter by status (PENDING, APPROVED, PAYMENT_COMPLETED, REJECTED, EXPIRED, PAYMENT_EXPIRED)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 50)

**Response (200):**

```json
{
  "requests": [
    {
      "id": 1,
      "status": "APPROVED",
      "statusMessage": "Approved! Please complete payment within 15 minutes",
      "reason": "User's reason text",
      "expert": {
        "id": 123,
        "user": { "name": "Dr. Smith", "avatar": "url" }
      },
      "assignedExpert": {
        "id": 456,
        "user": { "name": "Dr. Jones", "avatar": "url" }
      },
      "appointment": null,
      "baseAmount": 1000,
      "emergencySurcharge": 300,
      "totalAmount": 1300,
      "paymentExpiresAt": "2026-04-02T07:45:00.000Z",
      "contactExpired": false,
      "contactRemainingSeconds": 1200,
      "companyPhone": "+91XXXXXXXXXX", // Only if not expired
      "createdAt": "2026-04-02T07:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### 4. Get Single Urgent Request

**Endpoint:** `GET /api/v1/urgent-requests/:id`

**Auth:** Required (User)

**Response (200):**

```json
{
  "id": 1,
  "status": "APPROVED",
  "statusMessage": "Approved! Please complete payment within 15 minutes",
  "reason": "User's reason text",
  "expert": { ... },
  "assignedExpert": {
    "id": 456,
    "user": { "name": "Dr. Jones", "email": "...", "avatar": "url" }
  },
  "appointment": null,
  "baseAmount": 1000,
  "emergencySurcharge": 300,
  "totalAmount": 1300,
  "paymentExpiresAt": "2026-04-02T07:45:00.000Z",
  "companyPhone": "+91XXXXXXXXXX",   // null if contact expired
  "contactExpired": false,
  "contactRemainingSeconds": 1200,
  "createdAt": "2026-04-02T07:00:00.000Z"
}
```

---

### 5. Initiate Final Payment (After Approval)

**Endpoint:** `POST /api/v1/urgent-requests/:id/initiate-payment`

**Auth:** Required (User)

**Response (200):**

```json
{
  "message": "Payment initiated",
  "requestId": 1,
  "orderId": "order_final123",
  "amount": 130000, // In paise (Rs 1300)
  "baseAmount": 1000,
  "emergencySurcharge": 300,
  "totalAmount": 1300,
  "currency": "INR",
  "keyId": "rzp_xxx",
  "paymentExpiresAt": "2026-04-02T07:45:00.000Z"
}
```

**Error Responses:**

- `400` - Request not approved / Payment window expired / No expert assigned

---

### 6. Verify Final Payment

**Endpoint:** `POST /api/v1/urgent-requests/:id/verify-payment`

**Auth:** Required (User)

**Request Body:**

```json
{
  "razorpay_order_id": "order_final123",
  "razorpay_payment_id": "pay_final456",
  "razorpay_signature": "signature_string"
}
```

**Response (200):**

```json
{
  "message": "Payment verified. Emergency session scheduled.",
  "appointment": {
    "id": 789,
    "startAt": "2026-04-02T07:35:00.000Z",
    "endAt": "2026-04-02T08:35:00.000Z",
    "meetLink": "https://meet.jit.si/mindcure-urgent-xxx",
    "communicationMedium": "CALL",
    "status": "SCHEDULED",
    "expertName": "Dr. Jones"
  },
  "sessionStartsIn": 5, // Minutes until session starts
  "appointmentDate": "Thursday, April 2, 2026",
  "appointmentTime": "01:05 PM - 02:05 PM IST"
}
```

---

## Admin APIs

### 1. List Urgent Requests

**Endpoint:** `GET /api/v1/admin/urgent-requests`

**Auth:** Required (Admin)

**Query Params:**

- `status` - Filter by status (comma-separated or "ALL")
- `expertId` - Filter by expert ID
- `userId` - Filter by user ID
- `dateFrom` - Filter from date (ISO string)
- `dateTo` - Filter to date (ISO string)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

**Response (200):**

```json
{
  "requests": [
    {
      "id": 1,
      "status": "PENDING",
      "statusMessage": "Awaiting admin confirmation",
      "user": {
        "id": 100,
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "+91..."
      },
      "expert": {
        "id": 123,
        "user": { "name": "Dr. Smith", "email": "...", "phoneNumber": "..." }
      },
      "assignedExpert": null,
      "reason": "Urgent need for consultation",
      "requestFeePaid": true,
      "expiresAt": "2026-04-02T08:30:00.000Z",
      "createdAt": "2026-04-02T07:30:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

---

### 2. Get Single Urgent Request (Admin)

**Endpoint:** `GET /api/v1/admin/urgent-requests/:id`

**Auth:** Required (Admin)

**Response:** Same as list but includes `auditLogs` array.

---

### 3. Approve Urgent Request

**Endpoint:** `PATCH /api/v1/admin/urgent-requests/:id/approve`

**Auth:** Required (Admin)

**Request Body:**

```json
{
  "assignedExpertId": 456,
  "communicationMedium": "CALL" // or "VIDEO"
}
```

**Response (200):**

```json
{
  "message": "Urgent request approved",
  "request": {
    "id": 1,
    "status": "APPROVED",
    "statusMessage": "Approved! Please complete payment within 15 minutes",
    ...
  },
  "paymentExpiresAt": "2026-04-02T07:45:00.000Z",
  "assignedExpert": {
    "id": 456,
    "name": "Dr. Jones",
    "pricePerHour": 1000
  }
}
```

**Error Responses:**

- `400` - Must assign expert / Must specify communication medium / Expert doesn't accept emergency
- `409` - Expert already has active urgent request

```json
{
  "message": "This expert already has an active urgent request or ongoing session",
  "conflictingRequests": [{ "id": 2, "status": "APPROVED" }]
}
```

---

### 4. Reject Urgent Request

**Endpoint:** `PATCH /api/v1/admin/urgent-requests/:id/reject`

**Auth:** Required (Admin)

**Request Body:**

```json
{
  "reason": "Expert not available" // Optional
}
```

**Response (200):**

```json
{
  "message": "Urgent request rejected",
  "request": { ... },
  "refundInitiated": true
}
```

---

### 5. Get Analytics

**Endpoint:** `GET /api/v1/admin/urgent-requests/analytics`

**Auth:** Required (Admin)

**Query Params:**

- `dateFrom` - Start date (default: 30 days ago)
- `dateTo` - End date (default: today)

**Response (200):**

```json
{
  "period": {
    "from": "2026-03-03T00:00:00.000Z",
    "to": "2026-04-02T23:59:59.999Z"
  },
  "summary": {
    "totalRequests": 50,
    "pendingCount": 2,
    "approvedCount": 10,
    "paymentCompletedCount": 35,
    "rejectedCount": 3,
    "expiredCount": 0,
    "paymentExpiredCount": 0
  },
  "rates": {
    "approvalRate": 90.0,
    "completionRate": 77.78
  },
  "performance": {
    "avgResponseTimeMs": 120000,
    "avgResponseTimeMinutes": 2
  },
  "revenue": {
    "totalAmount": 45500,
    "totalAmountFormatted": "Rs 45500"
  },
  "dailyAnalytics": [ ... ]
}
```

---

### 6. Get Audit Log

**Endpoint:** `GET /api/v1/admin/urgent-requests/:id/audit-log`

**Auth:** Required (Admin)

**Response (200):**

```json
{
  "requestId": 1,
  "auditLogs": [
    {
      "id": 1,
      "action": "APPROVED",
      "adminId": 1,
      "responseTimeMs": 120000,
      "details": {
        "assignedExpertId": 456,
        "communicationMedium": "CALL"
      },
      "createdAt": "2026-04-02T07:32:00.000Z"
    }
  ]
}
```

---

## Status Values and Messages

| Status              | Message                                             |
| ------------------- | --------------------------------------------------- |
| `PENDING`           | Awaiting admin confirmation                         |
| `APPROVED`          | Approved! Please complete payment within 15 minutes |
| `PAYMENT_COMPLETED` | Session scheduled                                   |
| `REJECTED`          | Request rejected                                    |
| `EXPIRED`           | Request expired - refund initiated                  |
| `PAYMENT_EXPIRED`   | Payment window expired                              |

---

## Important Constants

- **Request Fee:** Rs 25
- **Request Expiry:** 1 hour (for PENDING status)
- **Payment Window:** 15 minutes (after admin approval)
- **Contact Validity:** 30 minutes (company phone access)
- **Session Start Buffer:** 5 minutes (prep time before session)
- **Rate Limit:** 3 requests per user per day
- **Emergency Surcharge:** Rs 300

---

## Frontend Implementation Checklist

### User Flow

- [ ] Add "Request Emergency Consultation" button on expert profile (when `emergencyAvailable=true` but no slots)
- [ ] Implement Rs 25 payment flow using Razorpay
- [ ] Show company phone number with countdown timer after payment
- [ ] Display clear status messages for each request state
- [ ] Show "Pay Now" button when status is `APPROVED`
- [ ] Implement 15-minute countdown for payment deadline
- [ ] Handle `PAYMENT_EXPIRED` gracefully
- [ ] Show appointment details after successful payment

### Admin Dashboard

- [ ] Add "Urgent Requests" tab/section
- [ ] Show real-time count of pending requests
- [ ] Implement approval form with expert selection and communication medium
- [ ] Show double-booking warnings
- [ ] Display analytics dashboard
- [ ] Show audit trail for each request

---

## Error Codes Reference

| Code | Meaning                           |
| ---- | --------------------------------- |
| 400  | Bad request / Validation error    |
| 401  | Unauthorized                      |
| 403  | Forbidden (not your request)      |
| 404  | Request not found                 |
| 409  | Conflict (expert already engaged) |
| 429  | Rate limit exceeded               |
| 500  | Internal server error             |
