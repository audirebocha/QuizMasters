from mongoengine import Document ,StringField

class Users(Document):
    email = StringField(required=True)
    username = StringField(max_length=50)
    password = StringField(max_length=50)