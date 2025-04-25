<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-long-logo.png" width="100%" alt="SilverChat - The 60+ Companionship network" /> 
*Alpha 3 Release*



# Relational Database Schema 3: Messaging



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



- [Relational Database Schema 3: Messaging](#relational-database-schema-3-messaging)
  - [1. Member Messaging Tables](#1-member-messaging-tables)
    - [1.1. Lookup Tables](#11-lookup-tables)
    - [1.2. Core Data Tables](#12-core-data-tables)
  - [2. SQL Representation \& Implementation Notes](#2-sql-representation--implementation-notes)
    - [2.1. SQL Syntax](#21-sql-syntax)
    - [2.2. DBML Syntax](#22-dbml-syntax)
  - [3. Supporting Documentation](#3-supporting-documentation)
  - [4. Sources](#4-sources)




<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" />



## 1. Member Messaging Tables

**SilverChat - Messaging Feature Database Schema (Target: Release 3)**

This document outlines the proposed database schema for handling member-to-member and club conversations within SilverChat, using PostgreSQL.



### 1.1. Lookup Tables

**Table: `conversation_type`**

| Column Name | Data Type   | Constraints       | Description                                      | Example Values     |
| :---------- | :---------- | :---------------- | :----------------------------------------------- | :----------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for type.    | 1, 2               |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the conversation type (e.g., 'direct'). | 'direct', 'club' |



### 1.2. Core Data Tables

**Table: `conversation`** (Represents a chat thread)

| Column Name            | Data Type     | Constraints                               | Description                                                        |
| :--------------------- | :------------ | :---------------------------------------- | :----------------------------------------------------------------- |
| `id`                   | `SERIAL`      | `PRIMARY KEY`                             | Auto-incrementing unique identifier for the conversation.          |
| `conversation_type_id` | `INTEGER`     | `NOT NULL`                                | Foreign key to `conversation_type` table.                          |
| `club_id`              | `INTEGER`     |                                           | Foreign key to `club` table (Nullable, used for club chats only). |
| `created_at`           | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                  | Timestamp when the conversation was initiated.                     |



**Table: `conversation_participant`** (Links members to conversations)

| Column Name           | Data Type     | Constraints                               | Description                                                        |
| :-------------------- | :------------ | :---------------------------------------- | :----------------------------------------------------------------- |
| `conversation_id`     | `INTEGER`     | `NOT NULL`                                | Foreign key to `conversation` table.                               |
| `member_id`           | `INTEGER`     | `NOT NULL`                                | Foreign key to `member` table.                                     |
| `joined_at`           | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                  | Timestamp when the member joined the conversation.                 |
| `last_read_timestamp` | `TIMESTAMPTZ` |                                           | Timestamp of the last message read by the member (Nullable).       |
|                       |               | `PRIMARY KEY (conversation_id, member_id)`| Composite primary key ensures uniqueness.                          |



**Table: `message`** (Stores individual chat messages)

| Column Name       | Data Type     | Constraints                               | Description                                                        |
| :---------------- | :------------ | :---------------------------------------- | :----------------------------------------------------------------- |
| `id`              | `BIGSERIAL`   | `PRIMARY KEY`                             | Auto-incrementing unique identifier (use BIGSERIAL for large volume). |
| `conversation_id` | `INTEGER`     | `NOT NULL`                                | Foreign key to `conversation` table.                               |
| `sender_id`       | `INTEGER`     | `NOT NULL`                                | Foreign key to `member` table (who sent the message).              |
| `content`         | `TEXT`        | `NOT NULL`                                | The actual content of the message.                                 |
| `created_at`      | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                  | Timestamp when the message was sent.                               |
|                   |               | `INDEX (conversation_id, created_at DESC)`| Crucial index for fetching messages efficiently.                   |



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" />



## 2. SQL Representation & Implementation Notes

These definitions assume integration into the existing PostgreSQL database used by SilverChat. Implementation should use Knex.js migrations.


https://dbdiagram.io/d/SilverChat-DB-3-Messaging-680c092a1ca52373f569e51f



### 2.1. SQL Syntax

*(Illustrative SQL - Actual implementation via Knex Migrations. Assumes `member` and `club` tables exist.)*

```sql
-- Lookup Table
CREATE TABLE conversation_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Core Data Tables
CREATE TABLE conversation (
    id SERIAL PRIMARY KEY,
    conversation_type_id INTEGER NOT NULL,
    club_id INTEGER, -- Nullable
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Foreign Key Constraints
    FOREIGN KEY (conversation_type_id) REFERENCES conversation_type(id),
    FOREIGN KEY (club_id) REFERENCES club(id) -- Assumes club table exists. Consider ON DELETE SET NULL?
);

CREATE TABLE conversation_participant (
    conversation_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_read_timestamp TIMESTAMPTZ, -- Nullable

    -- Primary Key Constraint
    PRIMARY KEY (conversation_id, member_id),

    -- Foreign Key Constraints
    FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE -- Assumes member table exists
);

CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL, -- Consider implications if sender member is deleted
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Foreign Key Constraints
    FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES member(id) -- Assumes member table exists. Default ON DELETE NO ACTION/RESTRICT is likely safest initially.
);

-- Index for efficient message retrieval
CREATE INDEX idx_message_conversation_created_at ON message (conversation_id, created_at DESC);

```



### 2.2. DBML Syntax

*(DBML representation for visualization and design tools.)*

```dbml
// SilverChat - Messaging Feature Schema (Target: Release 3)

Table conversation_type {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: "'direct', 'club'"]
}

Table conversation {
  id SERIAL [pk]
  conversation_type_id INTEGER [not null, ref: > conversation_type.id]
  club_id INTEGER [ref: > club.id, note: 'Nullable, used for club chats only']
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
}

Table conversation_participant {
  conversation_id INTEGER [not null] // FK defined via Ref below
  member_id INTEGER [not null] // FK defined via Ref below
  joined_at TIMESTAMPTZ [not null, default: `NOW()`]
  last_read_timestamp TIMESTAMPTZ [note: 'Nullable']

  indexes {
    (conversation_id, member_id) [pk]
  }
}

Table message {
  id BIGSERIAL [pk]
  conversation_id INTEGER [not null] // FK defined via Ref below
  sender_id INTEGER [not null] // FK defined via Ref below
  content TEXT [not null]
  created_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    (conversation_id, created_at) [note: 'Index includes DESC in SQL']
  }
}

// --- Relationships ---

Ref conversation_club: conversation.club_id > club.id // Assumes club table exists

Ref participant_conversation: conversation_participant.conversation_id > conversation.id [delete: cascade]
Ref participant_member: conversation_participant.member_id > member.id [delete: cascade] // Assumes member table exists

Ref message_conversation: message.conversation_id > conversation.id [delete: cascade]
Ref message_sender: message.sender_id > member.id // Assumes member table exists. ON DELETE behavior needs consideration (default: NO ACTION)

```




<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



## 3. Supporting Documentation

* [Project Scope (README)](https://github.com/LouieMorais/SilverChat/blob/main/readme.md)
* [Technical Architecture](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/architeture.md)
* [Relational Database Schema 1: Member Account and Profile](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-1-account-profile.md)
* [Relational Database Schema 2: Member Networking](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-2-networking.md)
* [THIS DOCUMENT: Relational Database Schema 3: Member Messaging](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-3-messaging.md)



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



## 4. Sources

- [Top 10 Free Database Diagram Design Tools in 2025](https://www.holistics.io/blog/top-5-free-database-diagram-design-tools/)
- [A thorough insight into the databases used @Facebook - Scaleyourapp](https://scaleyourapp.com/what-database-does-facebook-use-a-1000-feet-deep-dive/)
- [Resources: Database Design for Social Network - Code Dodle](https://www.codedodle.com/social-network-database.html)
- [Which database is best for creating a social networking application? - Quora](https://www.quora.com/Which-database-is-best-for-creating-a-social-networking-application)
- [Design Database For Social Network System In MySQL | Tutorials24x7](https://www.tutorials24x7.com/mysql/guide-to-design-database-for-social-network-system-in-mysql)
- [MySQL vs. MongoDB: The Pros and Cons When Building a Social Network](https://dzone.com/articles/mysql-vs-mongodb-the-pros-and-cons-when-building-a)
- [mysql - Implementing Comments and Likes in database - Stack Overflow](https://stackoverflow.com/questions/8112831/implementing-comments-and-likes-in-database)
- [How to Design Database for Social Media Platform | GeeksforGeeks](https://www.geeksforgeeks.org/how-to-design-database-for-social-media-platform/)
- [How to Design Database for Followers-Following Systems in Social Media Apps? | GeeksforGeeks](https://www.geeksforgeeks.org/design-database-for-followers-following-systems-in-social-media-apps/)
- [How to Design ER Diagrams for Social Media Networks | GeeksforGeeks](https://www.geeksforgeeks.org/how-to-design-er-diagrams-for-social-media-networks/)
- [yoosuf/Messenger: Messenger Database Design Concept](https://github.com/yoosuf/Messenger)
- [tutorials24x7/social-network-system-database-mysql: The Social Network System Database Design in MySQL to manage the Users, Friends, Follower, Messages, and Groups.](https://github.com/tutorials24x7/social-network-system-database-mysql)
- [Databases, SQL Server, and Data Models Examples](https://datamodels.databases.biz/)
- [SQLAlchemy: Designing a Social Network Database Schema - Sling Academy](https://www.slingacademy.com/article/sqlalchemy-designing-a-social-network-database-schema/)
- [Building a social Media Platform: How should the database schema be designed to efficiently store user data, content, and interactions? | by Brecht Corbeel | Medium](https://medium.com/@brechtcorbeel/building-a-social-media-platform-how-should-the-database-schema-be-designed-to-efficiently-store-9af5f0060627)
- [Social network schema design in DynamoDB - Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/data-modeling-schema-social-network.html)
- [Building a Social Network: Part I | by Kenneth Reilly | ITNEXT](https://itnext.io/building-a-social-network-part-i-25856fc693e1)
- [Database schema for Social Networking Platform - Surfside Media](https://www.surfsidemedia.in/post/database-schema-for-social-networking-platform)
- [Facebook database schema | Reverse engineering by Anatoly Lu… | Flickr](https://www.flickr.com/photos/ikhnaton2/533233247/):



![BOOYAH! FaceBook laid bare](https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/facebook-reverse-engineered.jpg)
