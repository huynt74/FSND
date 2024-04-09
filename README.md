## Introduction
- Request: The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. You are an Executive Producer within the company and are creating a system to simplify and streamline your process.
- Project contains: frontend, backend
- Project use heroku to deploy frontend and backend
- The project is a synthesis of all the knowledge learned from the beginning until now
- Can clone source from link git: https://github.com/huynt74/FSND/
    + Branch frontend: code FE
    + Branch backend: code BE
## DATA MODELING:
#### models
- Two classes with primary keys at least two attributes each:
    + Movies with attributes title and release date
    + Actors with attributes name, age and gender
- [Optional but encouraged] One-to-many or many-to-many relationships between classes
## Motivation behind the project
- After completion of course I got it new knowledge and improved programing skills. I can aplly its into my project final.
- understand how to create a web application full stack
## Tech Stack used in the project
- web full stack
- Frontend: Nextjs, jsonewbtoken, with javascript
- Backend: Flask, postgresql, unittest with python

## Installation instructions, Installation of the dependencies
- Frontend: 
    + git pull code from branch frontend
    + use nodejs v18.20.1 with npm 
    + use npm i to install all dependencies on package.json file
    + npm run dev to run application
- Backend:
    + git pull code from branch backend
    + use python 3.9
    + can use virtual enviroments: python -m vevn venv
    + .\venv\scripts\activate 
    + pip install -r requirements.txt 
    + Create environment variable in file: .env, .flaskenv
        in file .flaskenv: 
            FLASK_APP=src\main.py
            FLASK_ENV=development
            FLASK_DEBUG=True
    + flask run to run application

## Testing instructions
- Create test case use unittest in test_api.py file
- Run test case with command: python -m pytest src\test_api.py

## Roles and the permissions associated
# Describe:
- Casting Assistant:
    Can view actors and movies
- Casting Director:
    All permissions a Casting Assistant has and…
    Add or delete an actor from the database
Modify actors or movies
- Executive Producer:
    All permissions a Casting Director has and…
    Add or delete a movie from the database
# Create role, user, api, application on Auth0:
- Create api: 
    + enable: RBAC settings, Access settings
    + Create all permissions: get:actors, get:movies, post:actors, post:movies, patch:actors, patch:movies, delete:actors, delete:movies.
- Create role: 
    + Create 3 role with 3 request describe
    + Add permisssions with api created
- Create user:
    + Create user with 3 corresponding roles
    + Assign role on user
- Create application:
    + Create with nextjs
    + Allowed Callback URLs: https://myfsnd-frontend-202910eee642.herokuapp.com/api/auth/callback/
    + Allowed Logout URLs: https://myfsnd-frontend-202910eee642.herokuapp.com

## Documentation of the APIs
# Describe:
- Create api with 3 corresponding roles
- Use jwt to verify authentication
- Handle permissions
# Endpoints
GET /actors and /movies
DELETE /actors/ and /movies/
POST /actors and /movies 
PATCH /actors/<id> and /movies/<id>
# RBAC credentials and roles
Auth0 was set up to manage role-based access control for three users. The API documentation below describes, among others, by which user the endpoints can be accessed. Access credentials and permissions are handled with JWT tockens which must be included in the request header.

## Heroku Link
# link frontend
https://myfsnd-frontend-202910eee642.herokuapp.com/
# link backend
https://myapp-capstone-647518bcad02.herokuapp.com/