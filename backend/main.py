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
    'https://sir-chir.web.app'
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
        questionss.append({'id':str(question.id),'question':str(question.question),'choices':list(question.choices),'answer':str(question.answer)})
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
    try:
        email=session["email"]
    except:
        email=None
    res={'email':email}
    return jsonify(res)


@app.route('/update_score',methods=['GET',"POST"])
def update_score():
    user_data=request.get_json()
    try:
        email=session["email"]
    except:
        email=None
    new_score=user_data['score']
    if email is not None:
        user = Users.objects(email=email).first()
        user.update(set__score=user.score+user_data['score'])
        return jsonify({'status':'success','code':5})
    else:
        return jsonify({'status':'failed','code':6})
    

@app.route('/get_leader_board',methods=['GET',"POST"])
def get_leader_board():
    user_data=request.get_json()
    try:
        email=session["email"]
    except:
        email=None
    connect(host=DB_URI)
    users=Users.objects.all()
    if email is not None:
        userss=[]
        for user in users:
            if(user.email==email):
                userss.append({'username':'you','score':user.score})
            else:
                userss.append({'username':str(user.username),'score':user.score})
        return jsonify({'status':'success','data':userss,'code':7})
    else:
        return jsonify({'status':'failed','code':6})



app.run(host='0.0.0.0',debug=True)