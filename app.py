from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base

app = Flask(__name__)
CORS(app)
engine = create_engine('sqlite:///grades.db',echo=True)
Base = declarative_base()

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key = True)
    name = Column(String(80),unique = True, nullable = False)
    grade = Column(Integer)
Base.metadata.create_all(engine)

@app.route('/grades', methods=['GET','POST'])
def getGrades():
    if (request.method == 'POST'):
        name = request.json.get('name')
        grade = request.json.get('grade')
        if (name and grade):
            session = Session(engine)
            new_student = Student(name=name, grade=grade)
            session.add(new_student)
            session.commit()
            session.close()
            return jsonify({'message':'Added grade'})
    else:
        session = Session(engine)
        students = session.query(Student).all()
        result = []
        for student in students:
            result.append({
                'name': student.name,
                'grade': student.grade
            })
        session.close()
        return jsonify(result)

@app.route('/grades/<name>', methods=['GET','PUT','DELETE'])
def getStuGrade(name):
    if (request.method == 'GET'):
        session = Session(engine)
        student = session.query(Student).filter_by(name=name).first()
        if student:
            result = {
                'name': student.name,
                'grade': student.grade
            }
            session.close()
            return jsonify(result)
        else:
            session.close()
            return jsonify({'message':'Student name not found!'})
    
    elif (request.method == 'DELETE'):
        session = Session(engine)
        student = session.query(Student).filter_by(name=name).first()
        session.delete(student)
        session.commit()
        session.close()

    elif (request.method == 'PUT'):
       newGrade = request.json.get('grade')
       session = Session(engine)
       student = session.query(Student).filter_by(name=name).first()
       if (student):
                student.grade = newGrade
                session.commit()
                session.close()
       else:
           session.close()
           return jsonify({'message':'Student name not found!'})
    
if __name__ == '__main__':
    app.run(debug=True,port=5000)

