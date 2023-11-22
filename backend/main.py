from flask import Flask,request,jsonify,session
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util, ObjectId
import json
from mongoengine import Document ,StringField,connect
from models.users import Users
from models.tests import Tests


app = Flask(__name__)
app.secret_key='fcvgbhjnkm'
DB_URI = "mongodb+srv://root:123@cluster0.u5atqck.mongodb.net/quizmasters?retryWrites=true&w=majority"
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
    new_user=request.get_json()
    connect(host=DB_URI)
    user=Users(username=new_user['user_name'],email=new_user['email'],password=new_user['password'])
    user.save()
    return jsonify({'message':'You are successfully logged in','status':'success',"code":1})


@app.route('/login',methods=['GET',"POST"])
def login():
    print(request.get_json())
    user_data=request.get_json()
    connect(host=DB_URI)
    user = Users.objects.filter(email=user_data['email']).first()
    if user:
        if user.password==user_data['password']:
            session["email"]=user_data['email']
            return jsonify({'message':'You are successfully logged in','status':'success','code':2})
        else:
            return jsonify({'message':'Invalid password','status':'failure','code':3})
    else:
      return jsonify({'message':'You are not signed up, please signup','code':4})
    

@app.route('/get_subjects',methods=['GET',"POST"])
def get_subjects():
    print(request.get_json())
    user_data=request.get_json()
    connect(host=DB_URI)
    subjects = Tests.objects.all().distinct(field='name')
    return jsonify(subjects)

@app.route('/get_questions',methods=['GET',"POST"])
def get_questions():
    print(request.get_json())
    user_data=request.get_json()
    connect(host=DB_URI)
    questions=Tests.objects.all().filter(name=user_data['subject'])
    questionss=[]
    for question in questions:
        questionss.append({'id':str(question.id),'question':str(question.question),'choices':list(question.choices)})
    return jsonify({'status':'success','code':101,'data':questionss})

@app.route('/users')
def get_users():
    client = MongoClient(DB_URI)
    db = client["test"]
    user = db["user"]
    result= user.find()
    users = json.loads(json_util.dumps(result))
    return jsonify(users)

@app.route('/user')
def get_me():
    connect(host=DB_URI)
    res=User.objects(email='mimi@mimi.com')
    return jsonify(res.to_dict())

app.run(host='0.0.0.0',debug=True)