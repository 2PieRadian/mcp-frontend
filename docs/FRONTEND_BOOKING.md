# Frontend guide — booking, payment, and sessions

Product behavior and **detailed HTTP API specs** for the booking client. Domain rules: [APPOINTMENTS.md](./APPOINTMENTS.md).

---

## Conventions

| Item             | Value                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API root**     | `{ORIGIN}/api/v1/appointments` for routes in `appointment.route.ts` (e.g. `https://api.example.com/api/v1/appointments`)                                   |
| **Content-Type** | `application/json` on requests with a body                                                                                                                 |
| **Auth**         | `Authorization: Bearer <JWT>` on every route marked **Auth** below. Missing/invalid token → **401** `{ "message": "Unauthorized" }` unless noted otherwise |
| **Dates/times**  | Send `startAt` / `endAt` as ISO 8601 strings (e.g. `2026-04-15T14:00:00.000Z`). Responses return JSON; Prisma `DateTime` fields serialize as ISO strings   |
| **IDs**          | Path `:id` is numeric appointment id                                                                                                                       |

**Checkout hold (server behavior):** Unfulfilled `PendingBooking` with `createdAt` within the **last 30 minutes** blocks **other users’** paid `initiate` and is treated as busy in **next-slot** / **next-10-days**. Not used inside `verify`’s appointment conflict check.

---

## Detailed API specifications

### GET `/availability/:expertId/next-10-days`

**Auth:** No.

**Path params**

| Param      | Type                    | Description        |
| ---------- | ----------------------- | ------------------ |
| `expertId` | integer (string in URL) | Expert primary key |

**Response `200` — JSON array**

Each element:

| Field   | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| `day`   | string | Prisma enum day: `SUNDAY` … `SATURDAY`  |
| `date`  | number | Calendar day (1–31)                     |
| `month` | number | 1–12                                    |
| `year`  | number | Full year                               |
| `slots` | array  | Non-overlapping template slots that day |

Each `slots[]` item:

| Field            | Type   | Description                 |
| ---------------- | ------ | --------------------------- |
| `availabilityId` | number | `Availability` row id       |
| `startTime`      | string | Time of day, e.g. `"09:00"` |
| `endTime`        | string | Time of day                 |

**Semantics:** Returns up to **10** future calendar days (from today) that have at least one free slot. A concrete window is **excluded** if it overlaps any non-`CANCELLED` **Appointment** or any **active** pending hold (see conventions) for that expert. Respects server **minimum lead** from `startTime` (see `BOOKING_MIN_LEAD_HOURS` in code; may be `0`).

**Errors**

| Status | Body                                                   |
| ------ | ------------------------------------------------------ |
| `400`  | `{ "message": "<parse error>" }` if `expertId` invalid |
| `500`  | Server error message                                   |

---

### GET `/availability/:expertId/next-slot`

**Auth:** No.

**Path params:** Same as next-10-days (`expertId`).

**Response `200`**

**Single next slot** — JSON object:

| Field       | Type   | Description           |
| ----------- | ------ | --------------------- |
| `day`       | string | `SUNDAY` … `SATURDAY` |
| `date`      | number | Day of month          |
| `month`     | number | 1–12                  |
| `year`      | number | Full year             |
| `startTime` | string | e.g. `"09:00"`        |
| `endTime`   | string | e.g. `"10:00"`        |

**No slot** — JSON `null` (still `200`).

**Errors:** Same style as next-10-days (`400` bad id, `500`).

---

### POST `/initiate`

**Auth:** Yes.

**Request body (JSON)**

| Field                 | Type                  | Required | Description                                                        |
| --------------------- | --------------------- | -------- | ------------------------------------------------------------------ |
| `expertId`            | number                | Yes      | Expert id                                                          |
| `startAt`             | string (ISO datetime) | Yes      | Session start (must be **strictly in the future** at request time) |
| `endAt`               | string (ISO datetime) | Yes      | Session end (**must be after** `startAt`)                          |
| `communicationMedium` | string                | Yes      | One of: `CALL`, `VIDEO`, `CHAT` (case-insensitive on server)       |
| `userConcern`         | string \| omitted     | No       | Trimmed; max **4000** chars; empty → stored as null                |

**Branching (server):**

1. If the user has **never** consumed the **free** session with this expert (`UserExpertFreeSession` absent) → **free path** (below).
2. Else → **paid path** (Razorpay + `PendingBooking`).

---

#### Response — Free path (`201 Created`)

| Field           | Type           | Description            |
| --------------- | -------------- | ---------------------- |
| `type`          | `"FREE"`       | Discriminator          |
| `appointmentId` | number         | New appointment        |
| `meetLink`      | string         | Jitsi URL              |
| `userConcern`   | string \| null | Stored value           |
| `message`       | string         | e.g. confirmation copy |

No Razorpay fields.

---

#### Response — Paid path — new or resumed order (`200 OK`)

| Field         | Type                | Description                                                                                                                           |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | `"PAID"`            | Discriminator                                                                                                                         |
| `orderId`     | string              | Razorpay order id (`razorpay_order_id` for verify)                                                                                    |
| `amount`      | number              | **Paise** (integer). For resumed checkout, `storedRupees × 100`                                                                       |
| `currency`    | string              | `"INR"`                                                                                                                               |
| `keyId`       | string \| undefined | Razorpay key id for Checkout (from env)                                                                                               |
| `userConcern` | string \| null      | From pending (resume) or request                                                                                                      |
| `message`     | string              | New: _"Razorpay order created. Complete payment on frontend."_ · Resume: _"Existing checkout resumed. Complete payment on frontend."_ |

**Resume:** Same authenticated user, **identical** `expertId`, `startAt`, `endAt` as an unfulfilled pending **younger than 30 minutes** → same `orderId`, no new Razorpay order.

---

#### Errors — `initiate`

| Status | When                                    | Example / shape                                                                                                                                                                                                                                                                   |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | Validation                              | `expertId, startAt, endAt, and communicationMedium are required` · invalid dates · `endAt must be after startAt` · `Cannot book a slot in the past` · bad `communicationMedium` · bad `userConcern` · `Expert has not set a valid price. Cannot create paid booking.` (paid only) |
| `404`  | Unknown expert                          | `{ "message": "Expert not found" }`                                                                                                                                                                                                                                               |
| `409`  | Conflict                                | **Exactly one** of these `message` strings (show to user or map to UI):                                                                                                                                                                                                           |
|        | Booked                                  | `"This time slot is already booked"`                                                                                                                                                                                                                                              |
|        | Other user’s hold                       | `"This time slot is reserved while another user completes payment. Try again in a few minutes."`                                                                                                                                                                                  |
|        | Same user, overlapping different window | `"You already have a payment in progress for an overlapping time with this expert. Complete that checkout or wait until it expires."`                                                                                                                                             |
| `500`  | Server                                  | `{ "message": "...", "error"?: string }`                                                                                                                                                                                                                                          |

---

### POST `/verify`

**Auth:** Yes.

**Request body (JSON)**

| Field                 | Type   | Required | Description |
| --------------------- | ------ | -------- | ----------- |
| `razorpay_order_id`   | string | Yes      | From initiate `orderId` |
| `razorpay_payment_id` | string | Yes      | From Razorpay payment success payload |
| `razorpay_signature`  | string | Yes      | HMAC signature for string `order_id|payment_id` per Razorpay docs |

**Response `201 Created` — success (new appointment)**

| Field           | Type   | Description                                                                                                                   |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `message`       | string | e.g. _"Payment verified and appointment booked successfully"_                                                                 |
| `appointmentId` | number | New row                                                                                                                       |
| `meetLink`      | string | Jitsi URL                                                                                                                     |
| `appointment`   | object | Full `Appointment` record (JSON), including `appointmentType`, `status`, `startAt`, `endAt`, `userConcern`, payment ids, etc. |

**Response `200 OK` — idempotent**

| Field           | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| `message`       | string | _"Appointment already created for this payment"_ |
| `appointmentId` | number | Existing                                         |
| `appointment`   | object | Full appointment                                 |

**Errors**

| Status | When                     | Body                                                                                                                                                    |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | Missing fields           | `razorpay_order_id, razorpay_payment_id, and razorpay_signature are required`                                                                           |
| `400`  | Bad signature            | `{ "message": "Invalid payment signature" }`                                                                                                            |
| `403`  | Wrong user               | `{ "message": "Forbidden: booking does not belong to you" }`                                                                                            |
| `404`  | No pending               | `{ "message": "No pending booking found for this order" }`                                                                                              |
| `409`  | Slot taken after payment | `{ "message": "Slot conflict: this time slot was booked by someone else. Please contact support for a refund." }` (also used on transactional conflict) |
| `500`  | Server                   | `{ "message": "Internal server error: Failed to verify payment", "error"?: string }`                                                                    |

---

### POST `/:id/join`

**Auth:** Yes.

**Path:** `id` = appointment id (integer).

**Request body (JSON)**

| Field           | Type             | Required | Description                                                               |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------- |
| `participantId` | string \| number | Yes      | **Must equal** authenticated user’s `id` (as string comparison on server) |
| `role`          | string           | Yes      | `"USER"` (booking user) or `"EXPERT"` (expert’s linked user)              |

**Response `200 OK` — success**

| Field         | Type              | Description                                                                                                    |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `message`     | `"Join recorded"` |                                                                                                                |
| `appointment` | object            | Updated appointment (join times, last seen, possibly `status: "IN_PROGRESS"` if both joined while `SCHEDULED`) |

**Response `200 OK` — terminal status (no DB change)**

| Field         | Type                            |
| ------------- | ------------------------------- |
| `message`     | `"No change (terminal status)"` |
| `unchanged`   | `true`                          |
| `appointment` | object                          |

**Errors**

| Status | Body                                                                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `participantId is required` · `role must be "USER" or "EXPERT"` · `participantId must match the authenticated user` · `Invalid appointment ID` |
| `401`  | Unauthorized                                                                                                                                   |
| `403`  | `Forbidden` (wrong user for role)                                                                                                              |
| `404`  | `Appointment not found`                                                                                                                        |
| `500`  | Server error                                                                                                                                   |

---

### POST `/:id/heartbeat`

**Auth:** Yes.

**Body:** Same as **join** (`participantId`, `role`).

**Response `200 OK`**

| Field         | Description                            |
| ------------- | -------------------------------------- |
| `message`     | `"Heartbeat recorded"`                 |
| `appointment` | Updated (user or expert `*LastSeenAt`) |

Terminal status: same pattern as join (`unchanged: true`, etc.).

**Errors:** Same classes as join (`400` / `401` / `403` / `404` / `500`).

**Recommendation:** Call about every **30s** while in the meeting.

---

### POST `/:id/leave`

**Auth:** Yes.

**Body:** Same as **join** (`participantId`, `role`).

**Response `200 OK`**

| Field         | Type           | Description                                  |
| ------------- | -------------- | -------------------------------------------- |
| `message`     | string         | _"Leave recorded and appointment evaluated"_ |
| `evaluation`  | object         | Server evaluation result (see below)         |
| `appointment` | object \| null | Appointment after evaluation                 |

**`evaluation` (informal contract)** — union-like object, examples:

- `{ "ok": false, "reason": "not_found" }`
- `{ "ok": true, "unchanged": true, "appointment": { ... } }` — already terminal
- `{ "ok": true, "appointment": { ... } }` — status may be `COMPLETED`, `FAILED`, `NO_SHOW`, etc.

After both sides are “gone” (leave or ~**60s** stale heartbeat), overlap rules apply: **FREE** ≥ **20 min** together → `COMPLETED`; **PAID** ≥ **40 min** → `COMPLETED`; shorter overlap → `FAILED` (other paths set `NO_SHOW` / `FAILED` for no-join cases — see APPOINTMENTS.md).

**Errors:** Same pattern as join/heartbeat.

### Meeting presence timing (join / heartbeat / leave)

By default the API **does not** require `now` to fall between `startAt` and `endAt`. You may call **join**, **heartbeat**, and **leave** while **`SCHEDULED`** or **`IN_PROGRESS`** even **well before** the scheduled start (e.g. an hour early for testing) or after `endAt`, unless the appointment is already in a **terminal** status.

Optional production hardening: set server env **`MEETING_PRESENCE_RESTRICT_TO_SLOT=true`** to return **403** for those routes when the current time is outside `[startAt, endAt]`.

---

### GET `/my-appointments`

**Auth:** Yes (booking user).

**Query (optional)**

| Param    | Type   | Description                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `status` | string | One of: `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `NO_SHOW`, `CANCELLED` (case normalized to upper) |

**Response `200 OK`**

| Field          | Type                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| `message`      | string                                                                 |
| `count`        | number                                                                 |
| `appointments` | array of appointments with `expert` → `user` nested (password omitted) |

**Errors:** `400` invalid status filter · `401` · `500`

---

### GET `/expert/upcoming-sessions`

**Auth:** Yes (**expert** account only).

**Response `200 OK`**

| Field      | Type                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `message`  | string                                                                                                                |
| `count`    | number                                                                                                                |
| `sessions` | appointments with `startAt >= now`, status in `SCHEDULED` \| `IN_PROGRESS`, ordered by `startAt` asc, includes `user` |

**Errors:** `401` · `403` if not expert · `500`

---

### GET `/expert/appointments`

**Auth:** Yes (expert).

**Query:** Optional `status` — same allowed values as `/my-appointments`.

**Response `200 OK`**

| Field          | Type                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `message`      | string                                                                                            |
| `count`        | number                                                                                            |
| `appointments` | array — each appointment includes nested `user` (password omitted), ordered by `startAt` **desc** |

**Errors:** `400` invalid status · `401` · `403` if not expert · `500`

---

### GET `/expert/earnings`

**Auth:** Yes (expert).

**Response `200 OK`**

| Field      | Type                                             |
| ---------- | ------------------------------------------------ |
| `message`  | string                                           |
| `earnings` | number (integer; expert lifetime earnings field) |

**Errors:** `401` · `403` if not expert · `404` expert missing · `500`

---

### PATCH `/:id/status`

**Auth:** Yes.

**Request body**

| Field    | Type   | Required | Description                                           |
| -------- | ------ | -------- | ----------------------------------------------------- |
| `status` | string | Yes      | Only `IN_PROGRESS` or `COMPLETED` (server uppercases) |

**Transitions:** `SCHEDULED` → `IN_PROGRESS` → `COMPLETED` only. Wrong jump → **400** (`message` includes expected next status). **Separate** from Jitsi **leave** evaluation.

**Response `200 OK` — `IN_PROGRESS`**

```json
{ "message": "Appointment status updated to IN_PROGRESS" }
```

**Response `200 OK` — `COMPLETED`**

| Field      | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| `message`  | e.g. _Appointment completed and expert earnings updated_                                  |
| `earnings` | `{ appointmentAmount, platformTax, gstOnTax, afterDeductions, expertEarnings }` (numbers) |

**Errors:** `400` invalid id / `status must be IN_PROGRESS or COMPLETED` / invalid transition · `404` · `500`

---

### PATCH `/:id/reschedule`

**Auth:** Yes — must be the **booking user** (`appointment.userId`) or the **expert’s user** (`expert.userId`).

**Path:** `id` = appointment id.

**Request body (JSON)**

| Field     | Type                  | Required | Description                                   |
| --------- | --------------------- | -------- | --------------------------------------------- |
| `startAt` | string (ISO datetime) | Yes      | New session start (**must be in the future**) |
| `endAt`   | string (ISO datetime) | Yes      | New end (**after** `startAt`)                 |

**Rules:** Appointment must be **`SCHEDULED`**. New window must lie **inside expert availability** on **one local calendar day**. No overlapping **Appointment** for that expert (this row excluded).

**Response `200 OK`**

| Field         | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `message`     | e.g. _Appointment rescheduled successfully_                |
| `appointment` | Updated row — new `meetLink`, participation fields cleared |

**Errors:** `400` (missing/invalid dates, past, not `SCHEDULED`, availability message) · `401` · `403` · `404` · `409` `{ "message": "This time slot is already booked" }` · `500`

---

### GET `/availability/:expertId/weekly-slots`

**Auth:** No (as mounted today).

**Response `200 OK`**

| Field     | Type                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| `message` | string                                                                               |
| `slots`   | array of `Availability` rows (`dayOfWeek`, `startTime`, `endTime`, `isAvailable`, …) |

**Errors:** `400` invalid `expertId` · `500`

---

### PUT `/availability/:expertId/weekly-slots`

**Auth:** No (as mounted today — protect at gateway or add server auth if this is public).

**Request body:** Normalized weekly slot payload per controller (per-day hour ranges); see `updateWeeklyAvailability` in `appointment.controller.ts` for exact shape and validation messages.

**Response `200`:** `{ "message": "Weekly availability updated successfully" }`

**Errors:** `400` validation · `500`

---

## Product / UX notes (summary)

- **Slot picker:** Trust **next-slot** / **next-10-days**; refetch after errors or long idle time.
- **Paid flow:** `initiate` (`200`) → Razorpay Checkout → `verify` (`201` / `200`). On verify **409**, show support / refund messaging.
- **Resume:** No extra endpoint — repeat `initiate` with the same slot; same `orderId` when eligible.
- **In-call:** `join` → repeated `heartbeat` → `leave`; optional copy on **20 min** (free) / **40 min** (paid) for successful completion.

---

## Related code

| Area               | Path                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| Routes             | `src/route/appointment.route.ts`                                                 |
| Handlers           | `src/controller/appointment.controller.ts`                                       |
| Session evaluation | `src/lib/appointmentParticipation.ts`                                            |
| Schema             | `prisma/schema.prisma` (`Appointment`, `PendingBooking`, `AppointmentStatus`, …) |
