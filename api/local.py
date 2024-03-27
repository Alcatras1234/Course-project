import requests

res = requests.get("http://localhost:3001/api/main/1")

print(res.json())