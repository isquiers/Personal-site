from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app_passcode = os.getenv("APP_PASSCODE")

app = Flask(__name__, template_folder='.')

@app.route('/')
def index():
    # TODO: fetch slot data from the backend and pass it to the template
    return render_template('index.html')

@app.route('/coaching.html')
def coaching():
    return render_template('coaching.html')

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'iansquiers321@gmail.com'
app.config['MAIL_PASSWORD'] = app_passcode
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        email = request.form['email']
        name = request.form['name']
        date = request.form['date']
        timebox = request.form.get('timebox', default='not selected')
        print(f"Email: {email}")
        print(f"Name: {name}")
        print(f"Date: {date}")
        print(f"Timebox: {timebox}")
        msg = Message('Lesson Request', sender='your_email@gmail.com', recipients=['youremail@gmail.com'])
        msg.body = f"I am requesting a lesson in the {timebox} on the date {date}.\nHere is my name and email: {name}, {email}"
        mail.send(msg)
        return 'Email sent!'
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
