from flask import Flask, render_template, redirect, url_for

app = Flask(__name__, template_folder='.')

@app.route('/')
def index():
    # TODO: fetch slot data from the backend and pass it to the template
    return render_template('index.html')

@app.route('/reserve/<int:slot_id>')
def reserve(slot_id):
    # TODO: implement reservation logic
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
