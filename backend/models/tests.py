from mongoengine import Document ,StringField,ListField,IntField

class Tests(Document):
    name=StringField(max_length=60)
    email = StringField()
    question = StringField(max_length=500)
    choices = ListField()
    answer = IntField()