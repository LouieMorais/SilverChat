<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-long-logo.png" width="100%" alt="SilverChat - The 60+ Companionship network" /> 
*Alpha Release 1*



# Relational Database Schema 1: Member Account & Profile



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



- [Relational Database Schema 1: Member Account \& Profile](#relational-database-schema-1-member-account--profile)
  - [1. Member Account \& Profile Tables](#1-member-account--profile-tables)
    - [1.1. Lookup Tables](#11-lookup-tables)
    - [1.2. Core Data Tables](#12-core-data-tables)
  - [2. SQL Representation \& Implementation Notes](#2-sql-representation--implementation-notes)
    - [2.1. SQL Syntax](#21-sql-syntax)
    - [2.2. DBML Syntax](#22-dbml-syntax)
  - [3. Supporting Documentation](#3-supporting-documentation)
  - [4. Sources](#4-sources)



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



## 1. Member Account & Profile Tables

**Document 1: Relational Database Schema 1 - Member Account & Profile (Alpha Release 1)**

This schema defines the core tables required for member registration, authentication, basic profile information, status tracking, and address details for the SilverChat Alpha Release 1.


![SilverChat Database Schema 2: Member Networking](https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-db2-networking.png)

[View the live diagram on dbdiagram.io](https://dbdiagram.io/d/SilverChat-DB-1-Account-and-Profile-680bcc1b1ca52373f5650e84)



### 1.1. Lookup Tables

These tables provide predefined options for various fields, ensuring consistency.

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



### 1.2. Core Data Tables

These tables store the primary data about each member.

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
| `gender_id`                      | `INTEGER`     |                                                            | Foreign key to `gender` table (Optional/Nullable).                 |
| `title_id`                       | `INTEGER`     |                                                            | Foreign key to `title` table (Optional/Nullable).                  |
| `marital_status_id`              | `INTEGER`     |                                                            | Foreign key to `marital_status` table (Optional/Nullable).         |
| `preferred_pronoun`              | `VARCHAR(50)` |                                                            | Free-text preferred pronouns (Optional).                           |
| `preferred_title`                | `VARCHAR(50)` |                                                            | Free-text preferred title (Optional, e.g., if title is 'Other').    |
| `preferred_gender`               | `VARCHAR(50)` |                                                            | Free-text preferred gender (Optional, e.g., if gender is 'Other'). |
| `member_status_id`               | `INTEGER`     | `NOT NULL DEFAULT 1`                                       | Foreign key to `member_status` table (Default: 'Pending Verification'). |
| `identity_verification_status_id`| `INTEGER`     | `NOT NULL DEFAULT 1`                                       | Foreign key to `verification_state` (Default: 'Not Started').      |
| `address_verification_status_id` | `INTEGER`     | `NOT NULL DEFAULT 1`                                       | Foreign key to `verification_state` (Default: 'Not Started').      |
| `member_type_id`                 | `INTEGER`     | `NOT NULL DEFAULT 1`                                       | Foreign key to `member_type` table (Default: 'Standard').          |
| `created_at`                     | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                   | Timestamp of record creation.                                      |



**Table: `address`**

| Column Name         | Data Type     | Constraints                                               | Description                                                        |
| :------------------ | :------------ | :-------------------------------------------------------- | :----------------------------------------------------------------- |
| `id`                | `SERIAL`      | `PRIMARY KEY`                                             | Auto-incrementing unique identifier for the address.               |
| `member_id`         | `INTEGER`     | `UNIQUE NOT NULL`                                         | Foreign key to `member` table (One-to-one). Deletes if member does. |
| `house_number_name` | `VARCHAR(50)` |                                                           | House number or name.                                              |
| `street_name`       | `VARCHAR(100)` | `NOT NULL`                                                | Street name.                                                       |
| `address_line_2`    | `VARCHAR(100)` |                                                           | Optional address line 2.                                           |
| `address_line_3`    | `VARCHAR(100)` |                                                           | Optional address line 3.                                           |
| `town_city`         | `VARCHAR(100)` | `NOT NULL`                                                | Town or city name.                                                 |
| `county_province`   | `VARCHAR(100)` |                                                           | County or province (Optional).                                     |
| `postcode`          | `VARCHAR(10)` | `NOT NULL`                                                | Postcode (e.g., UK format).                                        |
| `country_code`      | `VARCHAR(2)`  | `NOT NULL DEFAULT 'GB'`                                   | ISO 3166-1 alpha-2 country code.                                   |
| `created_at`        | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()`                                  | Timestamp of record creation.                                      |



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" />



## 2. SQL Representation & Implementation Notes

The following SQL `CREATE TABLE` statements represent the database structure defined above. These are provided for illustrative and cross-referencing purposes. Actual implementation will use Knex.js migrations.



### 2.1. SQL Syntax

```sql
-- Illustrative SQL for Schema 1 (Alpha Release 1) - Actual implementation via Knex Migrations

-- Lookup Tables
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

-- Core Data Tables
CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_names VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    bio TEXT,
    gender_id INTEGER,
    title_id INTEGER,
    marital_status_id INTEGER,
    preferred_pronoun VARCHAR(50),
    preferred_title VARCHAR(50),
    preferred_gender VARCHAR(50),
    member_status_id INTEGER NOT NULL DEFAULT 1,
    identity_verification_status_id INTEGER NOT NULL DEFAULT 1,
    address_verification_status_id INTEGER NOT NULL DEFAULT 1,
    member_type_id INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Foreign Key Constraints
    FOREIGN KEY (gender_id) REFERENCES gender(id),
    FOREIGN KEY (title_id) REFERENCES title(id),
    FOREIGN KEY (marital_status_id) REFERENCES marital_status(id),
    FOREIGN KEY (member_status_id) REFERENCES member_status(id),
    FOREIGN KEY (identity_verification_status_id) REFERENCES verification_state(id),
    FOREIGN KEY (address_verification_status_id) REFERENCES verification_state(id),
    FOREIGN KEY (member_type_id) REFERENCES member_type(id)
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    member_id INTEGER UNIQUE NOT NULL,
    house_number_name VARCHAR(50),
    street_name VARCHAR(100) NOT NULL,
    address_line_2 VARCHAR(100),
    address_line_3 VARCHAR(100),
    town_city VARCHAR(100) NOT NULL,
    county_province VARCHAR(100),
    postcode VARCHAR(10) NOT NULL,
    country_code VARCHAR(2) NOT NULL DEFAULT 'GB',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Foreign Key Constraint
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
);
```



### 2.2. DBML Syntax

```dbml
// SilverChat - Schema 1: Member Account & Profile (Alpha Release 1)
// DBML Schema Definition

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
  gender_id INTEGER [ref: > gender.id]
  title_id INTEGER [ref: > title.id]
  marital_status_id INTEGER [ref: > marital_status.id]
  preferred_pronoun VARCHAR(50)
  preferred_title VARCHAR(50) [note: 'Free-text if title is Other']
  preferred_gender VARCHAR(50) [note: 'Free-text if gender is Other']
  member_status_id INTEGER [not null, default: 1, ref: > member_status.id, note: 'Default: Pending Verification']
  identity_verification_status_id INTEGER [not null, default: 1, ref: > verification_state.id, note: 'Default: Not Started']
  address_verification_status_id INTEGER [not null, default: 1, ref: > verification_state.id, note: 'Default: Not Started']
  member_type_id INTEGER [not null, default: 1, ref: > member_type.id, note: 'Default: Standard']
  created_at TIMESTAMPTZ [not null, default: `NOW()`]
}

Table address {
  id SERIAL [pk]
  member_id INTEGER [unique, not null] // FK defined via explicit Ref below
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
    member_id [unique]
  }
}

// --- Relationships ---
Ref address_member: address.member_id > member.id [delete: cascade]

```



<img src="https://raw.githubusercontent.com/LouieMorais/SilverChat/refs/heads/main/.project/architecture/img/silverchat-hr.png" width="100%" /> 



## 3. Supporting Documentation

* [SilverChat Project Scope (README)](https://github.com/LouieMorais/SilverChat/blob/main/readme.md)
* [SilverChat Technical Architecture](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/technical-architeture.md)
* [THIS DOCUMENT: SilverChat Relational Database Schema 1: Member Account and Profile](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-1-account-profile.md)
* [SilverChat Relational Database Schema 2: Member Networking](https://github.com/LouieMorais/SilverChat/blob/main/.project/architecture/database-2-networking.md)
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
