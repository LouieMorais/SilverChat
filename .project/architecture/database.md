**SilverChat - The 60+ Companionship Network** - *Alpha 1 Release*

# Relational Database Schema



---



- [Relational Database Schema](#relational-database-schema)
  - [1. Member-Centric Tables](#1-member-centric-tables)
    - [1.1. Lookup Tables](#11-lookup-tables)
    - [1.2. Core Data Tables](#12-core-data-tables)
  - [2. Member-to-Members Tables](#2-member-to-members-tables)
    - [2.1. Lookup Tables](#21-lookup-tables)
    - [2.2. Core Data Tables](#22-core-data-tables)
  - [3. SQL Statements](#3-sql-statements)
  - [4. Evolution](#4-evolution)



---



## 1. Member-Centric Tables



### 1.1. Lookup Tables



**Table: `title`**

| Column Name | Data Type     | Constraints       | Description                                    | Example Values                                               |
| :---------- | :------------ | :---------------- | :--------------------------------------------- | :----------------------------------------------------------- |
| `id`        | `SERIAL`      | `PRIMARY KEY`     | Auto-incrementing unique identifier for title. | 1, 2, 3, 4, 5, 6, 7, 8, 9                                    |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the title option.                      | 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr', 'Prof', 'Prefer not to say', 'Other' |



**Table: `member_type`** (Internal Use)

| Column Name | Data Type     | Constraints       | Description                                   | Example Values                                       |
| :---------- | :------------ | :---------------- | :-------------------------------------------- | :--------------------------------------------------- |
| `id`        | `SERIAL`      | `PRIMARY KEY`     | Auto-incrementing unique identifier for type. | 1, 2, 3                                              |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the member type (e.g., 'Standard').   | 'Standard', 'Former', 'Admin', 'Family', 'Supporter' |



**Table: `verification_state`** 

(Used for both identity and address checks - feeds into `identity_verification_status_id` and `address_verification_status_id`)

| Column Name | Data Type     | Constraints       | Description                                    | Example Values                                               |
| :---------- | :------------ | :---------------- | :--------------------------------------------- | :----------------------------------------------------------- |
| `id`        | `SERIAL`      | `PRIMARY KEY`     | Auto-incrementing unique identifier for state. | 1, 2, 3, 4, 5                                                |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of a verification step state.             | 'Not Started', 'Pending Review', 'Verified', 'Failed', 'Requires Resubmission' |



**Table: `member_status`** (Internal Use)

| Column Name | Data Type     | Constraints       | Description                                     | Example Values                                               |
| :---------- | :------------ | :---------------- | :---------------------------------------------- | :----------------------------------------------------------- |
| `id`        | `SERIAL`      | `PRIMARY KEY`     | Auto-incrementing unique identifier for status. | 1, 2, 3, 4, 5                                                |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the member account status (internal).   | 'Pending Verification', 'Active', 'Suspended', 'Under Investigation', 'Expelled' |



**Table: `gender`**

| Column Name | Data Type   | Constraints       | Description                                     | Example Values                                             |
| :---------- | :---------- | :---------------- | :---------------------------------------------- | :--------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for gender. | 1, 2, 3, 4, 5                                              |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the gender option.                      | 'Woman', 'Man', 'Non-binary', 'Prefer not to say', 'Other' |



**Table: `marital_status`**

| Column Name | Data Type   | Constraints       | Description                                          | Example Values                                                                 |
| :---------- | :---------- | :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------- |
| `id`        | `SERIAL`    | `PRIMARY KEY`     | Auto-incrementing unique identifier for marital status. | 1, 2, 3, 4, 5, 6                                                               |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the marital status option.                   | 'Single', 'Married', 'Civil Partnership', 'Divorced', 'Widowed', 'Prefer not to say' |



---



### 1.2. Core Data Tables



**Table: `member`**

| Column Name                       | Data Type      | Constraints                                            | Description                                                  |
| :-------------------------------- | :------------- | :----------------------------------------------------- | :----------------------------------------------------------- |
| `id`                              | `SERIAL`       | `PRIMARY KEY`                                          | Auto-incrementing unique identifier for the member.          |
| `email`                           | `VARCHAR(255)` | `UNIQUE NOT NULL`                                      | Member's unique email address (for login).                   |
| `password_hash`                   | `VARCHAR(255)` | `NOT NULL`                                             | Securely hashed password.                                    |
| `first_name`                      | `VARCHAR(100)` | `NOT NULL`                                             | Member's first name(s).                                      |
| `middle_names`                    | `VARCHAR(100)` |                                                        | Member's middle name(s) (Optional).                          |
| `last_name`                       | `VARCHAR(100)` | `NOT NULL`                                             | Member's last name(s).                                       |
| `date_of_birth`                   | `DATE`         | `NOT NULL`                                             | Member's date of birth.                                      |
| `bio`                             | `TEXT`         |                                                        | Short profile description (Optional). **Note: this field is likely to be moved to another table, as I consider this to be part of the data produced for the interest of other members. - Louie** |
| `gender_id`                       | `INTEGER`      | `REFERENCES gender(id)`                                | Foreign key to `gender` table (Optional/Nullable).           |
| `title_id`                        | `INTEGER`      | `REFERENCES title(id)`                                 | Foreign key to `title` table (Optional/Nullable).            |
| `marital_status_id`               | `INTEGER`      | `REFERENCES marital_status(id)`                        | Foreign key to `marital_status` table (Optional/Nullable).   |
| `preferred_pronoun`               | `VARCHAR(50)`  |                                                        | Free-text preferred pronouns (Optional).                     |
| `preferred_title`                 | `VARCHAR(50)`  |                                                        | Free-text preferred title (Optional, e.g., if title is 'Other'). |
| `preferred_gender`                | `VARCHAR(50)`  |                                                        | Free-text preferred gender (Optional, e.g., if gender is 'Other'). |
| `member_status_id`                | `INTEGER`      | `NOT NULL DEFAULT 1 REFERENCES member_status(id)`      | Foreign key to `member_status` table (Default: 'Pending Verification'). |
| `identity_verification_status_id` | `INTEGER`      | `NOT NULL DEFAULT 1 REFERENCES verification_state(id)` | Foreign key to `verification_state` (Default: 'Not Started'). |
| `address_verification_status_id`  | `INTEGER`      | `NOT NULL DEFAULT 1 REFERENCES verification_state(id)` | Foreign key to `verification_state` (Default: 'Not Started'). |
| `member_type_id`                  | `INTEGER`      | `NOT NULL DEFAULT 1 REFERENCES member_type(id)`        | Foreign key to `member_type` table (Default: 'Standard').    |
| `created_at`                      | `TIMESTAMPTZ`  | `NOT NULL DEFAULT NOW()`                               | Timestamp of record creation.                                |



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



## 2. Member-to-Members Tables



### 2.1. Lookup Tables



**Table: `friendship_status`**

| Column Name | Data Type     | Constraints       | Description                                    | Example Values                                  |
| :---------- | :------------ | :---------------- | :--------------------------------------------- | :---------------------------------------------- |
| `id`        | `SERIAL`      | `PRIMARY KEY`     | Auto-incrementing unique identifier for title. | 1, 2, 3, 4, 5, 6, 7, 8, 9                       |
| `name`      | `VARCHAR(50)` | `UNIQUE NOT NULL` | Name of the friendship status option.          | 'Connected', 'Blocked', 'Invited', 'Restrained' |



### 2.2. Core Data Tables



**Table: `member_network`**

| Column Name            | Data Type | Constraints             | Description                                    | Example Values                                  |
| :--------------------- | :-------- | :---------------------- | :--------------------------------------------- | :---------------------------------------------- |
| `id`                   | `SERIAL`  | `PRIMARY KEY`           | Auto-incrementing unique identifier for title. | 1, 2, 3, 4, 5, 6, 7, 8, 9                       |
| `member_id`            | `INTEGER` | `REFERENCES member(id)` | Foreign key to `member` table.                 |                                                 |
| `friendship_status_id` | `INTEGER` | `UNIQUE NOT NULL`       | Name of the friendship status option.          | 'Connected', 'Blocked', 'Invited', 'Restrained' |



---



## 3. SQL Statements



```sql
-- Lookup Tables

CREATE TABLE gender (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE title (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE marital_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE member_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE verification_state (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE member_type (
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
    gender_id INTEGER REFERENCES gender(id), -- Nullable
    title_id INTEGER REFERENCES title(id),   -- Nullable
    marital_status_id INTEGER REFERENCES marital_status(id), -- Nullable
    preferred_pronoun VARCHAR(50),
    preferred_title VARCHAR(50),
    member_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES member_status(id), -- Assuming 1 = 'Pending Verification'
    identity_verification_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES verification_state(id), -- Assuming 1 = 'Not Started'
    address_verification_status_id INTEGER NOT NULL DEFAULT 1 REFERENCES verification_state(id), -- Assuming 1 = 'Not Started'
    member_type_id INTEGER NOT NULL DEFAULT 1 REFERENCES member_type(id), -- Assuming 1 = 'Standard'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- Consider adding constraints like CHECK (date_of_birth <= NOW() - INTERVAL '60 years') via migrations
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

```



---



## 4. Evolution



As best practice, database schema changes in implementation should be managed using migration tools (e.g., knex, node-pg-migrate) rather than directly applying raw SQL like this repeatedly.