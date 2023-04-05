from flask import Flask, jsonify, render_template
import sqlalchemy as sql
from sqlalchemy import create_engine, MetaData, Table, select
import pandas as pd


#################################################
# Database Setup
#################################################
app=Flask(__name__)
# Create SQL Alchemy engine
engine=sql.create_engine('sqlite:///data/banksdb.sqlite')

# Get a list of all table names in the database
metadata = MetaData()
metadata.reflect(bind=engine)
table_names = metadata.tables.keys()

#call upon the html file located in 'template' folder
@app.route('/')
def home(): 
    return render_template('index.html')

@app.route('/csv-to-json')
def csv_to_json():
    df = pd.read_csv('static/data/trendchart.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

# Define the banklist table
banklist_table = Table('banklist', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/banklist')
def get_banklist():
    conn = engine.connect()
    result = conn.execute(select([banklist_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

