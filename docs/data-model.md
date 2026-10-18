# Database Architecture & Storage Schemes

### Relational Table Design: `notes`

| Field Name   | Data Type    | Constraints / Rules                         |
| :----------- | :----------- | :------------------------------------------ |
| `note_id`    | VARCHAR(36)  | PRIMARY KEY, UUID Generation                |
| `user_id`    | INT          | FOREIGN KEY, Indexing cluster tracking      |
| `title`      | VARCHAR(100) | NOT NULL, Checked length <= 100 characters  |
| `body`       | TEXT         | Nullable, Core unstructured context payload |
| `created_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                   |
| `updated_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE         |

### Entity Relationship Model Constraints

```sql
CREATE TABLE notes (
    note_id VARCHAR(36) PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(title) <= 100),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_user_notes ON notes(user_id);
```
