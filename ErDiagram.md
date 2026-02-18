# Entity Relationship Diagram - NexaProductivity

```mermaid
erDiagram
    USER ||--o{ TASK : creates
    USER ||--o{ NOTE : writes
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ INTEGRATION : connects
    USER ||--o{ FOCUS_SESSION : tracks
    TASK ||--o{ TASK : "parent-child"

    USER {
        string id PK
        string name
        string email UK
        datetime created_at
    }

    TASK {
        string id PK
        string title
        string status
        string priority
        datetime due_date
        string user_id FK
        string parent_id FK
        datetime created_at
    }

    NOTE {
        string id PK
        string title
        text content
        string user_id FK
        datetime created_at
        datetime updated_at
    }

    NOTIFICATION {
        string id PK
        string type
        string title
        string user_id FK
        string subject
        datetime date
        string time
        string notify_before
        string email
        string status
        datetime created_at
    }

    INTEGRATION {
        string id PK
        string user_id FK
        string provider
        string status
        text config_json
        datetime last_sync_at
        datetime created_at
    }

    FOCUS_SESSION {
        string id PK
        string user_id FK
        string subject
        int duration
        string phase
        datetime started_at
        datetime ended_at
        datetime created_at
    }
```

## Entity Descriptions

### USER
Core entity representing a user of the platform. Each user can have multiple tasks, notes, notifications, integrations, and focus sessions.

### TASK
Represents a task or assignment. Supports hierarchical structure through self-referencing parent_id. Status can be pending, in-progress, or completed. Priority levels are low, medium, or high.

### NOTE
Stores user notes with title and content. Tracks creation and update timestamps for revision tracking.

### NOTIFICATION
Manages reminders for tasks and custom events. Supports email notifications with configurable notify-before intervals (e.g., "1 day", "2 hours").

### INTEGRATION
Tracks external service connections (Slack, Outlook). Stores provider-specific configuration as JSON and tracks last sync timestamp.

### FOCUS_SESSION
Records Pomodoro-style focus sessions. Tracks subject studied, duration in minutes, phase (work/break), and session timestamps for analytics.

## Relationships

- One USER can have many TASKS (1:N)
- One USER can have many NOTES (1:N)
- One USER can have many NOTIFICATIONS (1:N)
- One USER can have many INTEGRATIONS (1:N)
- One USER can have many FOCUS_SESSIONS (1:N)
- One TASK can have many child TASKS (1:N self-referencing)

## Cascade Behavior

All child entities (TASK, NOTE, NOTIFICATION, INTEGRATION, FOCUS_SESSION) are configured with CASCADE delete, meaning when a USER is deleted, all associated records are automatically removed.
