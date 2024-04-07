from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.environ.get('DATABASE_URL')
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
ALGORITHMS = os.environ.get('ALGORITHMS')
API_AUDIENCE = os.environ.get('API_AUDIENCE')
TOKEN_TEST_PR = os.environ.get('TOKEN_TEST_PR')
TOKEN_TEST_DR = os.environ.get('TOKEN_TEST_DR')