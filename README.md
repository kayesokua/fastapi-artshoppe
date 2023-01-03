# Artshoppe DATA API
An e-commerce web app for artists in-the-making. It follows a decoupled architecture, where the backend is built with Python's FASTAPI and the website client (frontend) is built with ReactJS-MUI Framework.

⚠️ The project is still in progress. Not all intended models and schemas are implemented yet. You can only sign up (with password hashing), sign in, and create a product item and review with basic authentication.

Drafted ERD:

![Image](https://raw.githubusercontent.com/kayesokua/artshoppe/master/artshoppe.png)

[Check Diagram Here](https://dbdiagram.io/d/635a80c56848d85eee851fab)


## Install and Run the App

### Backend
1. Go to the respective backend folder
```
cd/backend
```

2. Create and activate the virtual environment
```
python3 -m venv venv
source venv/bin/activate
```
3. Install the required packages
```
pip3 install -r requirements.txt
```

4. Run the local server. The default port will be 'localhost:8000'. This should directly lead you to the API docs. If you delete the test.db, this will automatically regenerate a new sqlite database.

```
uvicorn main:app --reload
```

![Image](https://raw.githubusercontent.com/kayesokua/artshoppe/master/screen1.png)


### Website Client
1. Go to the respective backend folder
```
cd/frontend
```

2. Install the required modules via npm
```
npm install
```
3. Run the app on local server. The default port is 'localhost:3000'
```
npm start
```

![Image](https://raw.githubusercontent.com/kayesokua/artshoppe/master/screen2.png)

### Testing
Random data generator for testing: https://gist.github.com/kayesokua/178affc5af73e01e9a7baa917dea23fa
