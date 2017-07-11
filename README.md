# Auth module
Authentication module for backend

## Setup
```bash
import AuthModule from 'Auth';
```

## Requirements
Database with tables:
1) users
2) roles
3) sessions

## Schemas for the above table should be:
For users:
```sql
CREATE TABLE users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(255),
    password character varying(255) NOT NULL
);
```
