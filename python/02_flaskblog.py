from flask import Flask
from flask import request
from flask import jsonify, make_response
import sys
import os
import pandas as pd
import numpy as np
import glob
from flask_cors import CORS
# ----------------------------> All imports end here
flag='Test'
app = Flask(__name__)
CORS(app)
@app.route("/json", methods=["POST","GET"])
def json_example():
    #print(request.header, file=sys.stderr)
    if request.is_json:
        #get the json request
        req = request.get_json()
        if(req.get("name")=="A"):
            #print(dataprocess(), file=sys.stderr)
            print("Got A. Sending.....", file=sys.stderr)
            #The req object contains the json object
            #print(req, file=sys.stderr)
            r={"var1":"hellow var1","var2":"Hello var2"}
            return make_response(jsonify(r))
        elif(req.get("name")=="B"):
            print("Hello B", file=sys.stderr)
            return "Hello json";
        response_body = {
        "message": "JSON received!",
        "sender": flag
        }
        res = make_response(jsonify(response_body), 200)
       # print(res, file=sys.stderr)
        return res
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)
#----------------------------------------------------------------------------------------> Get Request
@app.route("/get",methods=["GET"])
def get_example():
    return "Hello GET"
#----------------------------------------------------------------------------------------> Get/POST Request
@app.route('/form-example', methods=['GET', 'POST']) #allow both GET and POST requests
def form_example():
    if request.method == 'POST': #this block is only entered when the form is submitted
        #prints the values of form as a dictionary
        print(request.form, file=sys.stderr)
    return '''<form method="POST">
                  Language: <input type="text" name="language"><br>
                  Framework: <input type="text" name="framework"><br>
                  <input type="submit" value="Submit"><br>
              </form>'''
#----------------------------------------------------------------------------------------> Processing function starts here
'''
def dataprocess():
    global flag;
    typesize=0;
    index=0;
    file = open("01/testfile.csv","w") 
    for filename in glob.glob('*.csv'):
        print(filename);
        # index should be set to zero for each datasets. otherwise index out of bounds error will happen
        index=0;
        data=pd.read_csv(filename);
        file.write(filename +",")
        file.write(str(data.shape[0])+",")
        file.write(str(data.shape[1])+",")
        if data.columns.size>typesize:
            typesize=data.columns.size
        for x in data.columns:
            # x is the column name.(__name__) to remove the class 
            file.write(x+"("+ str(type(data[data.columns[index]][0]).__name__)+"),")
            index=index+1
        file.write("\n")
    file.close()
    print(typesize) 
    #Read the existing text from file in READ mode
    f=open("01/testfile.csv","r")
    fline="Dataset,#Rows,#Columns"    #Prepending string
    for t in range(typesize+1):
            t=t+1
            #print(fline)
            fline=fline+",Column"+str(t)
    fline=fline+"\n"
    oline=f.readlines()
    #Here, we prepend the string we want to on first line
    oline.insert(0,fline)
    f.close()
    #We again open the file in WRITE mode 
    f=open("01/testfile.csv","w")
    f.writelines(oline)
    f.close()
    flag='Succes'
    return "Succes"
'''
#----------------------------------------------------------------------------------------> Processing function ends here
if __name__ == '__main__':
    app.run(host = '192.168.1.102',port='5006')
    app.run(debug=True)
    

