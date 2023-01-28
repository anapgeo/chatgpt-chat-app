
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
def add_todo():
        todo_data = request.get_json()
        content = todo_data['content']
        f = open("demofile2.txt", "a")
        f.write(content)
        f.close
        return 'Done', 201  
  
# Route for seeing a data
@app.route('/data')
def get_time():
    
    f = open("demofile2.txt", "r")
    prompt=f.read(14)
    f.close()
    f = open("demofile2.txt", "a")
    f.write(prompt)
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
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python",
        "data": response.choices[0].text
        }
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)