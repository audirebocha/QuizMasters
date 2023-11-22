from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
DB_URI = "mongodb+srv://root:123@cluster0.u5atqck.mongodb.net/test?retryWrites=true&w=majority"
config = {
  'ORIGINS': [
    'http://localhost:5173',  # React
    'http://127.0.0.1:8080',  # React
  ],

  'SECRET_KEY': 'suinm'
}
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)


@app.route('/')
def home():
    return {'message':'Hi I am QuizMaster'}


@app.route('/register',methods=['GET',"POST"])
def register():
    print(request.get_json())
    return jsonify({'hellow':'world'})


@app.route('/login',methods=['GET',"POST"])
def login():
    print(request.get_json())
    return jsonify({'hellow':'world'})

@app.route('/users')
def get_users():
    client = MongoClient(DB_URI)
    db = client["test"]
    user = db["user"]
    result= user.find()
    users=list(result)
    return jsonify(users)

app.run(host='0.0.0.0',debug=True)