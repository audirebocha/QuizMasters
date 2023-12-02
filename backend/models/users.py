from mongoengine import Document ,StringField,IntField

class Users(Document):
    email = StringField(required=True)
    username = StringField(max_length=50)
    password = StringField(max_length=50)
    score = IntField(max_length=50, default=0)