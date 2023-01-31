
import string
from flask import Flask
from flask import request
import datetime
import os
import openai


  
x = datetime.datetime.now()
content="" 
# Initializing flask app
app = Flask(__name__)

@app.route('/post', methods=['POST'])
def add_question():
        question = request.get_json()
        
        f = open("demofile2.txt", "a")
        f.write(question)
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
    openai.api_key = "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"
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
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)