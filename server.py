
import string
from flask import Flask
from flask import request
from flask import jsonify
import datetime
import os
import openai
import json

class ChatMessages:
    def __init__(self, name, message):
        self.name = name
        self.message = message

  
x = datetime.datetime.now()
i=0
content="" 
history=[]
# Initializing flask app
app = Flask(__name__)

@app.route('/post', methods=['POST'])
def add_question():
        question = request.get_json()
        
        f = open("demofile2.txt", "a")
        f.write(question)
        f.close
        return 'Done', 201  

@app.route('/add', methods=['POST'])
def add_history():
        history.append(request.get_json())
        
        f = open("demofile1.txt", "a")
        f.write(str(history))
        f.close

        
        
        return 'Done', 201  

# Route for seeing a data
@app.route('/data')
def get_data():
    
    f = open("demofile2.txt", "r")
    prompt=f.read(20)
    f.close()
    f = open("demofile2.txt", "w")
    f.close()
    openai.api_key = "YOUR_API_KEY" #Add your OPENAI api key here 
    response = openai.Completion.create(
    engine="davinci",
    prompt=prompt,
    temperature=0.1,
    max_tokens=100,
    top_p=1,
    frequency_penalty=0.5,
    presence_penalty=0)
    


  
    # Returning an api for showing in  reactjs
    return {
        "data": response.choices[0].text
        }


@app.route('/history')
def get_history():
    return jsonify(history)
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)