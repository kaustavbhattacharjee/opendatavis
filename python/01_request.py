import requests;
import json;
#https://www.youtube.com/watch?v=tb8gHvYlCFs
'''
response = requests.get('https://png.pngtree.com/png-clipart/20190603/original/pngtree-ink-chinese-dragon-png-image_223230.jpg')
print(response)
#print(response.status_code)
#print(response.json)
#print(response.headers['server'])
for i in response.headers:
    print(i,"------",response.headers[i])
#print(response.content)

with open('comic.jpeg','wb') as f:
    f.write(response.content);
'''
# HTTP GET request
'''
payload={'page':2,'count':25}
r = requests.get('https://httpbin.org/get',params=payload)
print(r.text)
print(r.url)
'''
# HTTP POST request
payload={'name':'A','password':'Testing'}
r = requests.post('http://127.0.0.1:5000/json',json=payload)
#print(r.text)
#print(type(r.json()))
# r.json() returns the json response
print(r.json()['var1'])
#print(r.url)
