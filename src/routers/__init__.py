from main import app
from auth import requires_auth
from flask import abort, jsonify, json, request
from models import Actor, Movie


@app.route('/')
def index():
    return jsonify("Healthy")

# Actor
@app.route('/actors', methods = ['GET'])
def get_actors():
    try:
        actors = Actor.query.order_by(Actor.id).all()
        actors_fm = []
        
        if len(actors) > 0:
            actors_fm = [ac.format() for ac in actors]
        
        return jsonify({
            'success': True,
            'actors': actors_fm,
            'message': 'Get list actors success!'
        })
    except:
        abort(422)

@app.route('/actors', methods = ['POST'])
@requires_auth('post:actors')
def create_actor(jwt):
    try:
        body = request.get_json()
        
        name = body.get('name', None)
        age = body.get('age', None)
        gender = body.get('gender', None)
        
        actor = Actor(name = name, age = age, gender = gender)
    
        actor.insert()
        return jsonify({
            'success': True,
            'message': 'Create actor success!',
            'actor_name': actor.name
        })
    except Exception as e:
        print(e)
        abort(422)

@app.route('/actors/<int:id>', methods = ['PATCH'])
@requires_auth('patch:actors')
def edit_actor(jwt,id):
    try:
        body = request.get_json()
        
        name = body.get('name', None)
        age = body.get('age', None)
        gender = body.get('gender', None)
        
        actor = Actor.query.filter(Actor.id == id).one_or_none()
        
        if actor:
            actor.name = name
            actor.age = age
            actor.gender = gender
            
            actor.update()
        else:
            abort(400)
            
        return jsonify({
            'success': True,
            'message': 'Update actor success!',
            'id_up': id
        })
    except:
        abort(422)


@app.route('/actors/<int:id>', methods = ['DELETE'])
@requires_auth('delete:actors')
def delete_actor(jwt, id):
    try:
        actor = Actor.query.filter(Actor.id == id).one_or_none()
        
        if actor:
            actor.delete()
        else:
            abort(400)
        
        return jsonify({
            'success': True,
            'message': 'Delete actor success!',
            'id_del': id
        })
    except:
        abort(422)

# Movie
@app.route('/movies', methods = ['GET'])
def get_movies():
    try: 
        movies = Movie.query.order_by(Movie.id).all()
        movies_fm = []
        
        if len(movies) > 0: 
            movies_fm = [mv.format() for mv in movies]
        
        return jsonify({
            'success': True,
            'movies': movies_fm,
            'message': 'Get list movies success!'
        })
    except: 
        abort(422)

@app.route('/movies', methods = ['POST'])
@requires_auth('post:movies')
def create_movie(jwt):
    try:
        body = request.get_json()
        
        title = body.get('title', None)
        release = body.get('release', None)
        content = body.get('content', None)
        
        movie = Movie(title, release, content)
        movie.insert()
        
        return jsonify({
            'success': True,
            'message': 'Create movie success!'
        })
    except:
        abort(422)

@app.route('/movies/<int:id>', methods = ['PATCH'])
@requires_auth('patch:movies')
def edit_movie(jwt, id):
    try:
        body = request.get_json()
        
        title = body.get('title', None)
        release = body.get('release', None)
        content = body.get('content', None)
        
        movie = Movie.query.filter(Movie.id == id).one_or_none()
        
        if movie:
            movie.title = title
            movie.release = release
            movie.content = content
            
            movie.update()
        else:
            abort(400)
        return jsonify({
            'success': True,
            'message': 'Update movie success!',
            'id_up': id
        })
    except:
        abort(422)


@app.route('/movies/<int:id>', methods = ['DELETE'])
@requires_auth('delete:movies')
def delete_movies(jwt, id):
    try:
        movie = Movie.query.filter(Movie.id == id).one_or_none()
        
        if movie:
            movie.delete()
        else:
            abort(400)    
        return jsonify({
            'success': True,
            'message': 'Delete movie success!',
            'id_del': id
        })
    except:
        abort(422)
