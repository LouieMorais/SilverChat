<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-long-logo.png" width="100%" alt="SilverChat - The 60+ Companionship network" /> 
*Alpha Release 2*



# Relational Database Schema 2: Member Networking



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



- [Relational Database Schema 2: Member Networking](#relational-database-schema-2-member-networking)
  - [1. Member Networking Tables](#1-member-networking-tables)
    - [1.1. Lookup Tables](#11-lookup-tables)
    - [1.2. Core Data Tables](#12-core-data-tables)
  - [2. SQL Representation \& Implementation Notes](#2-sql-representation--implementation-notes)
    - [2.1. SQL Syntax](#21-sql-syntax)
    - [2.2. DBML Syntax](#22-dbml-syntax)
  - [3. Supporting Documentation](#3-supporting-documentation)
  - [4. Sources](#4-sources)



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 




## 1. Member Networking Tables
**SilverChat - Networking Feature Database Schema (Target: Alpha Release 2)**

This schema defines the tables required for member-to-member connections and interest clubs, building upon the core member profile schema established in Alpha 1.

![SilverChat Database Schema 2: Member Networking](https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-db2-networking.png)

[View the live diagram on dbdiagram.io](https://dbdiagram.io/d/SilverChat-DB-2-Networking-680c18471ca52373f56aa57e)



---



**Final Database Design - Alpha Releases 1, 2 & 3:**

![SilverChat Final Database Schema](https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-db1-2-3-all.png)

[View the live diagram on dbdiagram.io](https://dbdiagram.io/d/SilverChat-DB-0-Full-Picture-680c2e271ca52373f56b94e4)



---



### 1.1. Lookup Tables

**Table: `friendship_status`** (Lookup for connection states)

| Column Name | Data Type   | Constraints       | Description                                          | Example Values                                                                 |
| :---------- | :---------- | :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for friendship status. | 1, 2, 3, 4                                                                     |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the friendship status option.                | 'Invited', 'Connected', 'Blocked', 'Restrained' (*Note: 'Restrained' implies internal/safeguarding block*) |



**Table: `club_membership_role`** (Lookup for roles within a club)

| Column Name | Data Type   | Constraints       | Description                                          | Example Values                 |
| :---------- | :---------- | :---------------- | :--------------------------------------------------- | :----------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for club role.   | 1, 2, 3                        |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the role within a club.                      | 'Creator', 'Admin', 'Member' |



**Table: `club_membership_status`** (Lookup for member status within a club)

| Column Name | Data Type   | Constraints       | Description                                          | Example Values                               |
| :---------- | :---------- | :---------------- | :--------------------------------------------------- | :------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for club status. | 1, 2, 3, 4                                   |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the status within a club.                    | 'Invited', 'Active', 'Suspended', 'Banned' |



### 1.2. Core Data Tables

*(These tables depend on the `member` table defined in Schema 1: Member Account & Profile)*

**Table: `connection`** (Junction table for member-to-member connections)

| Column Name           | Data Type     | Constraints                                                                 | Description                                                                 |
| :-------------------- | :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `member_requester_id` | `INTEGER`     | `NOT NULL`                                                                  | Foreign key to the member initiating the connection request.                |
| `member_accepter_id`  | `INTEGER`     | `NOT NULL`                                                                  | Foreign key to the member receiving/accepting the request.                  |
| `friendship_status_id`| `INTEGER`     | `NOT NULL`                                                                  | Foreign key indicating the current status of the connection.                |
| `created_at`          | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the connection request was initiated.                        |
| `updated_at`          | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the connection status was last updated (e.g., accepted).     |
|                       |               | `PRIMARY KEY (member_requester_id, member_accepter_id)`                     | Composite primary key ensures uniqueness of a connection between two members. |
|                       |               | `CHECK (member_requester_id <> member_accepter_id)`                         | Prevents a member from connecting to themselves.                            |



**Table: `club`** (Defines interest clubs)

| Column Name   | Data Type     | Constraints                               | Description                                                        |
| :------------ | :------------ | :---------------------------------------- | :----------------------------------------------------------------- |
| `id`          | `SERIAL`      | `PRIMARY KEY`                             | Auto-incrementing unique identifier for the club.                  |
| `creator_id`  | `INTEGER`     | `NOT NULL`                                | Foreign key to the member who created the club.                    |
| `name`        | `VARCHAR(100)` | `UNIQUE NOT NULL`                         | Unique name of the club.                                           |
| `description` | `TEXT`        |                                           | Description of the club (Optional).                                |
| `rules`       | `TEXT`        |                                           | Rules of the club (Optional).                                      |
| `type`        | `VARCHAR(50)` | `NOT NULL`                                | Type of club (e.g., 'Public', 'Private', 'Hidden').                |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                  | Timestamp when the club was created.                               |



**Table: `club_membership`** (Junction table linking members to clubs)

| Column Name                | Data Type     | Constraints                                                                 | Description                                                                 |
| :------------------------- | :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `member_id`                | `INTEGER`     | `NOT NULL`                                                                  | Foreign key to the member joining the club.                                 |
| `club_id`                  | `INTEGER`     | `NOT NULL`                                                                  | Foreign key to the club being joined.                                       |
| `role_id`                  | `INTEGER`     | `NOT NULL DEFAULT 3`                                                        | Foreign key indicating the member's role (Default: 'Member').               |
| `status_id`                | `INTEGER`     | `NOT NULL DEFAULT 2`                                                        | Foreign key indicating the member's status in the club (Default: 'Active'). |
| `joined_at`                | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the member joined the club (or was invited).                 |
|                            |               | `PRIMARY KEY (member_id, club_id)`                                          | Composite primary key ensures a member has only one entry per club.         |



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" />



## 2. SQL Representation & Implementation Notes

The following SQL `CREATE TABLE` statements represent the database structure defined above. These are provided for illustrative and cross-referencing purposes. Actual implementation will use Knex.js migrations. The `member` table definition is included below **for context and validation purposes only**; it is part of Schema 1 and should not be re-created.



### 2.1. SQL Syntax

```sql
-- Illustrative SQL for Schema 2 (Alpha Release 2) - Actual implementation via Knex Migrations

-- =============================================================== --
-- START: Prerequisite Tables (Defined in Schema 1 - DO NOT RE-RUN) --
-- Included for context/validation only.                           --

-- Prerequisite: member Table (Simplified for context)
CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
    -- Other columns from Schema 1 assumed to exist...
);

-- END: Prerequisite Tables                                        --
-- =============================================================== --


-- START: Networking Feature Tables (Target: Alpha Release 2)            --

-- Lookup Tables for Networking
CREATE TABLE friendship_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE club_membership_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE club_membership_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Core Networking Tables
CREATE TABLE connection (
    member_requester_id INTEGER NOT NULL, -- FK defined below
    member_accepter_id INTEGER NOT NULL, -- FK defined below
    friendship_status_id INTEGER NOT NULL, -- FK defined below
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Primary Key Constraint
    PRIMARY KEY (member_requester_id, member_accepter_id),

    -- Check Constraint
    CHECK (member_requester_id <> member_accepter_id),

    -- Foreign Key Constraints
    FOREIGN KEY (member_requester_id) REFERENCES member(id) ON DELETE CASCADE, -- Refers to prerequisite member table
    FOREIGN KEY (member_accepter_id) REFERENCES member(id) ON DELETE CASCADE, -- Refers to prerequisite member table
    FOREIGN KEY (friendship_status_id) REFERENCES friendship_status(id)
);

-- Note: Need to add trigger for 'updated_at' on connection table if auto-update is desired

CREATE TABLE club (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER NOT NULL, -- FK defined below
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    rules TEXT,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Foreign Key Constraint
    FOREIGN KEY (creator_id) REFERENCES member(id) -- Refers to prerequisite member table
);

CREATE TABLE club_membership (
    member_id INTEGER NOT NULL, -- FK defined below
    club_id INTEGER NOT NULL, -- FK defined below
    role_id INTEGER NOT NULL DEFAULT 3, -- FK defined below, Default: Member
    status_id INTEGER NOT NULL DEFAULT 2, -- FK defined below, Default: Active
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Primary Key Constraint
    PRIMARY KEY (member_id, club_id),

    -- Foreign Key Constraints
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE, -- Refers to prerequisite member table
    FOREIGN KEY (club_id) REFERENCES club(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES club_membership_role(id),
    FOREIGN KEY (status_id) REFERENCES club_membership_status(id)
);

-- END: Networking Feature Tables                                  --
```



### 2.2. DBML Syntax

```dbml
// SilverChat - Schema 2: Member Networking (Alpha Release 2)
// DBML Schema Definition

// ===============================================================
// START: Prerequisite Tables (Defined in Schema 1)
// Included for context/validation only.

Table member { // PREREQUISITE - DO NOT RE-CREATE
  id SERIAL [pk]
  email VARCHAR(255) [unique, not null]
  // Other columns from Schema 1 assumed to exist...
}

// END: Prerequisite Tables
// ===============================================================


// START: Networking Feature Tables (Target: Alpha Release 2)

// --- Lookup Tables ---

Table friendship_status {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Connection states: Invited, Connected, Blocked, Restrained']
}

Table club_membership_role {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Roles within a club: Creator, Admin, Member']
}

Table club_membership_status {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Member status within a club: Invited, Active, Suspended, Banned']
}

// --- Core Data Tables ---

Table connection {
  member_requester_id INTEGER [not null] // FK defined via Ref below
  member_accepter_id INTEGER [not null] // FK defined via Ref below
  friendship_status_id INTEGER [not null, ref: > friendship_status.id]
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
  updated_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    (member_requester_id, member_accepter_id) [pk]
    // Note: CHECK constraint (member_requester_id <> member_accepter_id) needs to be added manually in SQL/migration
  }
}

Table club {
  id SERIAL [pk]
  creator_id INTEGER [not null] // FK defined via Ref below
  name VARCHAR(100) [unique, not null]
  description TEXT
  rules TEXT
  type VARCHAR(50) [not null, note: 'Public, Private, Hidden']
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
}

Table club_membership {
  member_id INTEGER [not null] // FK defined via Ref below
  club_id INTEGER [not null] // FK defined via Ref below
  role_id INTEGER [not null, default: 3, ref: > club_membership_role.id, note: 'Default: Member']
  status_id INTEGER [not null, default: 2, ref: > club_membership_status.id, note: 'Default: Active']
  joined_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    (member_id, club_id) [pk]
  }
}

// --- Relationships ---

// Connection FKs (referencing prerequisite member table)
Ref connection_requester: connection.member_requester_id > member.id [delete: cascade]
Ref connection_accepter: connection.member_accepter_id > member.id [delete: cascade]

// Club FKs (referencing prerequisite member table)
Ref club_creator: club.creator_id > member.id

// Club Membership FKs (referencing prerequisite member table and new club table)
Ref membership_member: club_membership.member_id > member.id [delete: cascade]
Ref membership_club: club_membership.club_id > club.id [delete: cascade]

// END: Networking Feature Tables
```



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



## 3. Supporting Documentation
* [SilverChat Project Scope (README)](https://github.com/LouieMorais/SilverChat/blob/main/readme.md)
* [SilverChat Technical Architecture](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/technical-architeture.md)
* [SilverChat Relational Database Schema 1: Member Account and Profile](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-1-account-profile.md)
* [THIS DOCUMENT: SilverChat Relational Database Schema 2: Member Networking](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-2-networking.md)
* [SilverChat Relational Database Schema 3: Member Messaging](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-3-messaging.md)



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
