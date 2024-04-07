from main import app
from flask import jsonify
from auth import AuthError
@app.errorhandler(404)
def not_found(error):
    return (
        jsonify({
            "success": False, "error": 404, "message": "resource not found"}),
            404,
    )

@app.errorhandler(422)
def unprocessable(error):
    return (
        jsonify({
            "success": False, "error": 422, "message": "unprocessable"}),
            422,
    )

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False, "error": 400, "message": "bad request"}), 400

@app.errorhandler(500)
def internl_server(error):
    return jsonify({
        'success': False,
        'error': 500,
        'message': 'Internal Server Error'
        }), 500
    
@app.errorhandler(AuthError)
def handle_auth_error(ex: AuthError):
    response = jsonify(ex.error)
    response.status_code = ex.status_code

    return response