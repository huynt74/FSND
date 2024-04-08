# Describe
    - The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. You are an Executive Producer within the company and are creating a system to simplify and streamline your process.
# Models
- Movies with attributes title and release date
- Actors with attributes name, age and gender
# Account Auth0
- assistant@gmail.com/Abcd123456
- director@gmail.com/Abcd123456
- producer@gmail.com/Abcd123456
# unittest
- python -m pytest src\test_api.py

# Role

- Casting Assistant:
    Can view actors and movies
- Casting Director:
    All permissions a Casting Assistant has and…
    Add or delete an actor from the database
Modify actors or movies
- Executive Producer:
    All permissions a Casting Director has and…
    Add or delete a movie from the database

# Endpoints
GET /actors and /movies
DELETE /actors/ and /movies/
POST /actors and /movies 
PATCH /actors/<id> and /movies/<id>

# Use venv to run 
- cd backend
- python -m vevn venv
- .\venv\scripts\activate
- pip install -r requiments.txt
- Create environment variable in file: .env, flaskenv

## link backend
https://myapp-capstone-647518bcad02.herokuapp.com/