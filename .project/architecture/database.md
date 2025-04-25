**SilverChat - The 60+ Companionship Network** - *Alpha 1 Release*

# Relational Database Schema



---



- [Relational Database Schema](#relational-database-schema)
  - [1. Relational Database Overview](#1-relational-database-overview)
  - [2. Member-Centric Tables](#2-member-centric-tables)
    - [2.1. Lookup Tables](#21-lookup-tables)
    - [2.2. Core Data Tables](#22-core-data-tables)
  - [3. Connection \& Club Tables](#3-connection--club-tables)
  - [4. SQL Representation \& Implementation Notes](#4-sql-representation--implementation-notes)
    - [4.1. SQL Syntax](#41-sql-syntax)
    - [4.2. DBML Syntax](#42-dbml-syntax)
  - [5. Sources of Knowledge and Inspiration](#5-sources-of-knowledge-and-inspiration)



---



## 1. Relational Database Overview



![SilverChat - Relational Database Schema](W:\learning\SilverChat\.project\architecture\SilverChat - The 60+ Companionship Network - Alpha 1 Release.png)

[SilverChat - Relational Database Diagram on dbdiagram.io](https://dbdiagram.io/d/SilverChat-The-60-Companionship-Network-Alpha-1-Release-680bcc1b1ca52373f5650e84)

---



## 2. Member-Centric Tables



### 2.1. Lookup Tables

**Table: `title`**

| Column Name | Data Type   | Constraints       | Description                                   | Example Values                                           |
| :---------- | :---------- | :---------------- | :-------------------------------------------- | :------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for title.| 1, 2, 3, 4, 5, 6, 7, 8, 9                                |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the title option.                     | 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr', 'Prof', 'Prefer not to say', 'Other' |



**Table: `member_type`** (Internal Use)

| Column Name | Data Type   | Constraints       | Description                                   | Example Values                                  |
| :---------- | :---------- | :---------------- | :-------------------------------------------- | :---------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for type. | 1, 2, 3, 4, 5                                   |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the member type (e.g., 'Standard').   | 'Standard', 'Former', 'Admin', 'Family', 'Supporter' |



**Table: `verification_state`** (Used for identity and address checks)

| Column Name | Data Type   | Constraints       | Description                                   | Example Values                                                    |
| :---------- | :---------- | :---------------- | :-------------------------------------------- | :---------------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for state.| 1, 2, 3, 4, 5                                                     |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of a verification step state.            | 'Not Started', 'Pending Review', 'Verified', 'Failed', 'Requires Resubmission' |



**Table: `member_status`** (Internal Use - Overall account status)

| Column Name | Data Type   | Constraints       | Description                                   | Example Values                                                    |
| :---------- | :---------- | :---------------- | :-------------------------------------------- | :---------------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for status.| 1, 2, 3, 4, 5                                                     |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the member account status (internal). | 'Pending Verification', 'Active', 'Suspended', 'Under Investigation', 'Expelled' |



**Table: `gender`**

| Column Name | Data Type   | Constraints       | Description                                   | Example Values                                             |
| :---------- | :---------- | :---------------- | :-------------------------------------------- | :--------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for gender.| 1, 2, 3, 4, 5                                              |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the gender option.                    | 'Woman', 'Man', 'Non-binary', 'Prefer not to say', 'Other' |



**Table: `marital_status`**

| Column Name | Data Type   | Constraints       | Description                                          | Example Values                                                                 |
| :---------- | :---------- | :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for marital status. | 1, 2, 3, 4, 5, 6                                                               |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the marital status option.                   | 'Single', 'Married', 'Civil Partnership', 'Divorced', 'Widowed', 'Prefer not to say' |



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



### 2.2. Core Data Tables

**Table: `member`**

| Column Name                      | Data Type     | Constraints                                                | Description                                                        |
| :------------------------------- | :------------ | :--------------------------------------------------------- | :----------------------------------------------------------------- |
| `id`                             | `SERIAL`      | `PRIMARY KEY`                                              | Auto-incrementing unique identifier for the member.                |
| `email`                          | `VARCHAR(255)` | `UNIQUE NOT NULL`                                          | Member's unique email address (for login).                         |
| `password_hash`                  | `VARCHAR(255)` | `NOT NULL`                                                 | Securely hashed password.                                          |
| `first_name`                     | `VARCHAR(100)` | `NOT NULL`                                                 | Member's first name(s).                                            |
| `middle_names`                   | `VARCHAR(100)` |                                                            | Member's middle name(s) (Optional).                                |
| `last_name`                      | `VARCHAR(100)` | `NOT NULL`                                                 | Member's last name(s).                                             |
| `date_of_birth`                  | `DATE`        | `NOT NULL`                                                 | Member's date of birth.                                            |
| `bio`                            | `TEXT`        |                                                            | Short profile description (Optional).                              |
| `gender_id`                      | `INTEGER`     | `REFERENCES gender(id)`                                    | Foreign key to `gender` table (Optional/Nullable).                 |
| `title_id`                       | `INTEGER`     | `REFERENCES title(id)`                                     | Foreign key to `title` table (Optional/Nullable).                  |
| `marital_status_id`              | `INTEGER`     | `REFERENCES marital_status(id)`                            | Foreign key to `marital_status` table (Optional/Nullable).         |
| `preferred_pronoun`              | `VARCHAR(50)` |                                                            | Free-text preferred pronouns (Optional).                           |
| `preferred_title`                | `VARCHAR(50)` |                                                            | Free-text preferred title (Optional, e.g., if title is 'Other').    |
| `preferred_gender`               | `VARCHAR(50)` |                                                            | Free-text preferred gender (Optional, e.g., if gender is 'Other'). |
| `member_status_id`               | `INTEGER`     | `NOT NULL DEFAULT 1 REFERENCES member_status(id)`          | Foreign key to `member_status` table (Default: 'Pending Verification'). |
| `identity_verification_status_id`| `INTEGER`     | `NOT NULL DEFAULT 1 REFERENCES verification_state(id)`     | Foreign key to `verification_state` (Default: 'Not Started').      |
| `address_verification_status_id` | `INTEGER`     | `NOT NULL DEFAULT 1 REFERENCES verification_state(id)`     | Foreign key to `verification_state` (Default: 'Not Started').      |
| `member_type_id`                 | `INTEGER`     | `NOT NULL DEFAULT 1 REFERENCES member_type(id)`            | Foreign key to `member_type` table (Default: 'Standard').          |
| `created_at`                     | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                   | Timestamp of record creation.                                      |



**Table: `address`**

| Column Name         | Data Type     | Constraints                                               | Description                                                        |
| :------------------ | :------------ | :-------------------------------------------------------- | :----------------------------------------------------------------- |
| `id`                | `SERIAL`      | `PRIMARY KEY`                                             | Auto-incrementing unique identifier for the address.               |
| `member_id`         | `INTEGER`     | `UNIQUE NOT NULL REFERENCES member(id) ON DELETE CASCADE` | Foreign key to `member` table (One-to-one). Deletes if member does. |
| `house_number_name` | `VARCHAR(50)` |                                                           | House number or name.                                              |
| `street_name`       | `VARCHAR(100)` | `NOT NULL`                                                | Street name.                                                       |
| `address_line_2`    | `VARCHAR(100)` |                                                           | Optional address line 2.                                           |
| `address_line_3`    | `VARCHAR(100)` |                                                           | Optional address line 3.                                           |
| `town_city`         | `VARCHAR(100)` | `NOT NULL`                                                | Town or city name.                                                 |
| `county_province`   | `VARCHAR(100)` |                                                           | County or province (Optional).                                     |
| `postcode`          | `VARCHAR(10)` | `NOT NULL`                                                | Postcode (e.g., UK format).                                        |
| `country_code`      | `VARCHAR(2)`  | `NOT NULL DEFAULT 'GB'`                                   | ISO 3166-1 alpha-2 country code.                                   |
| `created_at`        | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                  | Timestamp of record creation.                                      |



---



## 3. Connection & Club Tables

**Table: `connection`** (Junction table for member-to-member connections)

| Column Name           | Data Type     | Constraints                                                                 | Description                                                                 |
| :-------------------- | :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `member_requester_id` | `INTEGER`     | `NOT NULL REFERENCES member(id) ON DELETE CASCADE`                          | Foreign key to the member initiating the connection request.                |
| `member_accepter_id`  | `INTEGER`     | `NOT NULL REFERENCES member(id) ON DELETE CASCADE`                          | Foreign key to the member receiving/accepting the request.                  |
| `friendship_status_id`| `INTEGER`     | `NOT NULL REFERENCES friendship_status(id)`                                 | Foreign key indicating the current status of the connection.                |
| `created_at`          | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the connection request was initiated.                        |
| `updated_at`          | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the connection status was last updated (e.g., accepted).     |
|                       |               | `PRIMARY KEY (member_requester_id, member_accepter_id)`                     | Composite primary key ensures uniqueness of a connection between two members. |
|                       |               | `CHECK (member_requester_id <> member_accepter_id)`                         | Prevents a member from connecting to themselves.                            |



**Table: `club`** (Defines interest clubs)

| Column Name   | Data Type     | Constraints                               | Description                                                        |
| :------------ | :------------ | :---------------------------------------- | :----------------------------------------------------------------- |
| `id`          | `SERIAL`      | `PRIMARY KEY`                             | Auto-incrementing unique identifier for the club.                  |
| `creator_id`  | `INTEGER`     | `NOT NULL REFERENCES member(id)`          | Foreign key to the member who created the club.                    |
| `name`        | `VARCHAR(100)` | `UNIQUE NOT NULL`                         | Unique name of the club.                                           |
| `description` | `TEXT`        |                                           | Description of the club (Optional).                                |
| `rules`       | `TEXT`        |                                           | Rules of the club (Optional).                                      |
| `type`        | `VARCHAR(50)` | `NOT NULL`                                | Type of club (e.g., 'Public', 'Private', 'Hidden').                |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                  | Timestamp when the club was created.                               |



**Table: `club_membership`** (Junction table linking members to clubs)

| Column Name                | Data Type     | Constraints                                                                 | Description                                                                 |
| :------------------------- | :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `member_id`                | `INTEGER`     | `NOT NULL REFERENCES member(id) ON DELETE CASCADE`                          | Foreign key to the member joining the club.                                 |
| `club_id`                  | `INTEGER`     | `NOT NULL REFERENCES club(id) ON DELETE CASCADE`                            | Foreign key to the club being joined.                                       |
| `role_id`                  | `INTEGER`     | `NOT NULL DEFAULT 3 REFERENCES club_membership_role(id)`                    | Foreign key indicating the member's role (Default: 'Member').               |
| `status_id`                | `INTEGER`     | `NOT NULL DEFAULT 2 REFERENCES club_membership_status(id)`                  | Foreign key indicating the member's status in the club (Default: 'Active'). |
| `joined_at`                | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                                    | Timestamp when the member joined the club (or was invited).                 |
|                            |               | `PRIMARY KEY (member_id, club_id)`                                          | Composite primary key ensures a member has only one entry per club.         |



---



## 4. SQL Representation & Implementation Notes

The following SQL `CREATE TABLE` statements represent the database structure defined above. **These are provided for illustrative and cross-referencing purposes only.**

During actual development, the database schema (creating tables, adding columns, defining constraints) and any subsequent changes will be managed using **Knex.js migration files**. Upon research, I discovered this is the standard practice for ensuring database changes are version-controlled, repeatable, and manageable across different development environments (like your local machine and potentially testing/production environments later).

Seeding scripts (also managed via Knex.js) will be used separately to populate the lookup tables (`title`, `member_type`, `verification_state`, `member_status`, `gender`, `marital_status`, `friendship_status`, `club_membership_role`, `club_membership_status`) with their initial defined values. This is novel for me but I am willing to try.



### 4.1. SQL Syntax

```sql
CREATE TABLE title (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE member_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE verification_state (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE member_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE gender (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE marital_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

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

CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_names VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    bio TEXT,
    gender_id INTEGER REFERENCES gender(id),
    title_id INTEGER REFERENCES title(id),
    marital_status_id INTEGER REFERENCES marital_status(id),
    preferred_pronoun VARCHAR(50),
    preferred_title VARCHAR(50),
    preferred_gender VARCHAR(50),
    member_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES member_status(id),
    identity_verification_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES verification_state(id),
    address_verification_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES verification_state(id),
    member_type_id INTEGER NOT NULL DEFAULT 1 REFERENCES member_type(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    member_id INTEGER UNIQUE NOT NULL REFERENCES member(id) ON DELETE CASCADE,
    house_number_name VARCHAR(50),
    street_name VARCHAR(100) NOT NULL,
    address_line_2 VARCHAR(100),
    address_line_3 VARCHAR(100),
    town_city VARCHAR(100) NOT NULL,
    county_province VARCHAR(100),
    postcode VARCHAR(10) NOT NULL,
    country_code VARCHAR(2) NOT NULL DEFAULT 'GB',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE connection (
    member_requester_id INTEGER NOT NULL REFERENCES member(id) ON DELETE CASCADE,
    member_accepter_id INTEGER NOT NULL REFERENCES member(id) ON DELETE CASCADE,
    friendship_status_id INTEGER NOT NULL REFERENCES friendship_status(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (member_requester_id, member_accepter_id),
    CHECK (member_requester_id <> member_accepter_id)
);


CREATE TABLE club (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER NOT NULL REFERENCES member(id),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    rules TEXT,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE club_membership (
    member_id INTEGER NOT NULL REFERENCES member(id) ON DELETE CASCADE,
    club_id INTEGER NOT NULL REFERENCES club(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL DEFAULT 3 REFERENCES club_membership_role(id), 
    status_id INTEGER NOT NULL DEFAULT 2 REFERENCES club_membership_status(id), 
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (member_id, club_id)
);

```



### 4.2. DBML Syntax



````sql

// SilverChat - The 60+ Companionship Network - Alpha 1 Release
// DBML Schema Definition (Revised - Single Relationship Definitions)

// --- Lookup Tables ---

Table title {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null]
}

Table member_type {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Internal Use: Standard, Former, Admin, Family, Supporter']
}

Table verification_state {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Used for identity and address checks: Not Started, Pending Review, Verified, Failed, Requires Resubmission']
}

Table member_status {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Internal Use - Overall account status: Pending Verification, Active, Suspended, Under Investigation, Expelled']
}

Table gender {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Woman, Man, Non-binary, Prefer not to say, Other']
}

Table marital_status {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Single, Married, Civil Partnership, Divorced, Widowed, Prefer not to say']
}

Table friendship_status {
  id SERIAL [pk]
  name VARCHAR(50) [unique, not null, note: 'Connection states: Invited, Connected, Blocked, Restrained (internal/safeguarding block)']
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

Table member {
  id SERIAL [pk]
  email VARCHAR(255) [unique, not null]
  password_hash VARCHAR(255) [not null]
  first_name VARCHAR(100) [not null]
  middle_names VARCHAR(100)
  last_name VARCHAR(100) [not null]
  date_of_birth DATE [not null]
  bio TEXT
  gender_id INTEGER [ref: > gender.id] // Inline FK definition
  title_id INTEGER [ref: > title.id] // Inline FK definition
  marital_status_id INTEGER [ref: > marital_status.id] // Inline FK definition
  preferred_pronoun VARCHAR(50)
  preferred_title VARCHAR(50) [note: 'Free-text if title is Other']
  preferred_gender VARCHAR(50) [note: 'Free-text if gender is Other']
  member_status_id INTEGER [not null, default: 1, ref: > member_status.id, note: 'Default: Pending Verification'] // Inline FK definition
  identity_verification_status_id INTEGER [not null, default: 1, ref: > verification_state.id, note: 'Default: Not Started'] // Inline FK definition
  address_verification_status_id INTEGER [not null, default: 1, ref: > verification_state.id, note: 'Default: Not Started'] // Inline FK definition
  member_type_id INTEGER [not null, default: 1, ref: > member_type.id, note: 'Default: Standard'] // Inline FK definition
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
}

Table address {
  id SERIAL [pk]
  // member_id defined via explicit Ref below to add ON DELETE CASCADE
  member_id INTEGER [unique, not null]
  house_number_name VARCHAR(50)
  street_name VARCHAR(100) [not null]
  address_line_2 VARCHAR(100)
  address_line_3 VARCHAR(100)
  town_city VARCHAR(100) [not null]
  county_province VARCHAR(100)
  postcode VARCHAR(10) [not null]
  country_code VARCHAR(2) [not null, default: 'GB']
  created_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    member_id [unique] // Explicit index for the unique FK
  }
}


// --- Connection & Club Tables ---

Table connection {
  // FKs defined via explicit Ref below to add ON DELETE CASCADE
  member_requester_id INTEGER [not null]
  member_accepter_id INTEGER [not null]
  friendship_status_id INTEGER [not null, ref: > friendship_status.id] // Inline FK definition
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
  updated_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    (member_requester_id, member_accepter_id) [pk] // Composite primary key
    // Note: CHECK constraint (member_requester_id <> member_accepter_id) needs to be added manually in SQL/migration
  }
}

Table club {
  id SERIAL [pk]
  creator_id INTEGER [not null, ref: > member.id] // Inline FK definition
  name VARCHAR(100) [unique, not null]
  description TEXT
  rules TEXT
  type VARCHAR(50) [not null, note: 'Public, Private, Hidden']
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
}

Table club_membership {
  // FKs defined via explicit Ref below to add ON DELETE CASCADE
  member_id INTEGER [not null]
  club_id INTEGER [not null]
  role_id INTEGER [not null, default: 3, ref: > club_membership_role.id, note: 'Default: Member'] // Inline FK definition
  status_id INTEGER [not null, default: 2, ref: > club_membership_status.id, note: 'Default: Active'] // Inline FK definition
  joined_at TIMESTAMPTZ [not null, default: `NOW()`]

  indexes {
    (member_id, club_id) [pk] // Composite primary key
  }
}


// --- Relationships (Explicit definitions ONLY for Cascades or Clarity) ---

// Address FK (One-to-One with Cascade)
Ref address_member: address.member_id > member.id [delete: cascade]

// Connection FKs (Many-to-Many via `connection` table with Cascade)
Ref connection_requester: connection.member_requester_id > member.id [delete: cascade]
Ref connection_accepter: connection.member_accepter_id > member.id [delete: cascade]
// Ref connection_status: connection.friendship_status_id > friendship_status.id // Defined inline above

// Club FKs
// Ref club_creator: club.creator_id > member.id // Defined inline above

// Club Membership FKs (Many-to-Many via `club_membership` table with Cascade)
Ref membership_member: club_membership.member_id > member.id [delete: cascade]
Ref membership_club: club_membership.club_id > club.id [delete: cascade]
// Ref membership_role: club_membership.role_id > club_membership_role.id // Defined inline above
// Ref membership_status: club_membership.status_id > club_membership_status.id // Defined inline above

````



---



## 5. Sources of Knowledge and Inspiration



![Me, designing a database from scraps found all over the web](https://static1.srcdn.com/wordpress/wp-content/uploads/2021/06/Charlies-Pepe-Silvia-conspiracy-in-Its-Always-Sunny.jpg)



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
- [BOOYAH! Facebook database schema | Reverse engineering by Anatoly Lu… | Flickr](https://www.flickr.com/photos/ikhnaton2/533233247/):



![](W:\learning\SilverChat\.project\architecture\facebook-reverse-engineered.jpg)
