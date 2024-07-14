import requests
import json
from datetime import datetime, timedelta

# Base URL da API
BASE_URL = "http://localhost:3000/users"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMDkxMzczMiwiZXhwIjoxNzIwOTE3MzMyfQ.-b1i9w6SgVdg_DvvnSmSAfBm3TQsWjyw39cmaMXngRg"

headers = {"Authorization": f"Bearer {token}"}
response = requests.post(f"{BASE_URL}/generate-api-key", headers=headers)


if response.status_code == 200:
    print("API key generated successfully!")
else:
    print(f"Failed to generate API key: {response.status_code}")
    print(response.json())
