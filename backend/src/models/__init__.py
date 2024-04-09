from flask_sqlalchemy import SQLAlchemy
from flask_moment import Moment
from flask_migrate import Migrate
from sqlalchemy import Column, String, Integer, Identity, Table

db = SQLAlchemy()

def setup_db(app, path):
    
    app.config['SQLALCHEMY_DATABASE_URI'] = path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.app_context().push()
    db.app = app
    db.init_app(app)
    # db.create_all()
    
    moment = Moment(app)
    migrate = Migrate(app, db)

#Temporary table
Actor_Movie = db.Table('Actor_Movie',
    Column('actor_id', Integer, db.ForeignKey('Actor.id'), primary_key=True),
    Column('movie_id', Integer, db.ForeignKey('Movie.id'), primary_key=True),
    )

from .actor import Actor
from .movie import Movie