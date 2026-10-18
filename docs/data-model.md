# Data Model Specification

### Storage Solution Justification: SQL vs. NoSQL

For a note-taking application handling 1 million concurrent users, a relational database (SQL) engine like PostgreSQL is selected. Quicknotes relies heavily on structured constraints (like strict character boundaries for titles) and clear identity validation across accounts. SQL handles ACID compliance reliably, ensuring notes are never lost or orphaned during unexpected node connections.

---

### Database Schemas

#### 1. `users` Table

| Field Name | Data Type    | Constraints / Rules         |
| :--------- | :----------- | :-------------------------- |
| `user_id`  | INT          | PRIMARY KEY, AUTO_INCREMENT |
| `username` | VARCHAR(50)  | UNIQUE, NOT NULL            |
| `email`    | VARCHAR(100) | UNIQUE, NOT NULL            |

#### 2. `notes` Table

| Field Name | Data Type    | Constraints / Rules                     |
| :--------- | :----------- | :-------------------------------------- |
| `note_id`  | VARCHAR(36)  | PRIMARY KEY, UUID                       |
| `user_id`  | INT          | FOREIGN KEY references `users(user_id)` |
| `title`    | VARCHAR(100) | NOT NULL (Length validation <= 100)     |
| `body`     | TEXT         | NULL (Optional field parameter)         |

#### 3. `tags` Table

| Field Name | Data Type   | Constraints / Rules         |
| :--------- | :---------- | :-------------------------- |
| `tag_id`   | INT         | PRIMARY KEY, AUTO_INCREMENT |
| `tag_name` | VARCHAR(30) | UNIQUE, NOT NULL            |

#### 4. `note_tags` (Many-to-Many Relationship Mapping Table)

| Field Name | Data Type   | Constraints / Rules                     |
| :--------- | :---------- | :-------------------------------------- |
| `note_id`  | VARCHAR(36) | FOREIGN KEY references `notes(note_id)` |
| `tag_id`   | INT         | FOREIGN KEY references `tags(tag_id)`   |
