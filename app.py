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

#################################################
# Project 3 Data Definitions
#################################################

@app.route('/Project_3_Data_definitions')
def csv_to_json():
    df = pd.read_csv('static/data/Project_3_Data_definitions.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

#################################################
# Balance_Sheets_for_DB
#################################################

# Define the balance sheets table
balance_table = Table('balance_sheets_for_database', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/balance_sheets_for_database')
def get_balance():
    conn = engine.connect()
    result = conn.execute(select([balance_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)

#################################################
# Bank_data
#################################################

# Define the banklist table
bank_data_table = Table('bank_data', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/bank_data')
def get_bankdata():
    conn = engine.connect()
    result = conn.execute(select([bank_data_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)

#################################################
# Banklist Table
#################################################

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

#################################################
# banklist_for_dropdowndemo
#################################################

# Define the banklist table
banklist_for_dropdowndemo_table = Table('banklist_for_dropdowndemo', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/banklist_for_dropdowndemo')
def get_banklist_dropdown():
    conn = engine.connect()
    result = conn.execute(select([banklist_for_dropdowndemo_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)

#################################################
# trendchart
#################################################

# Define the banklist table
trendchart_table = Table('trendchart', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/trendchart')
def get_trendchart():
    conn = engine.connect()
    result = conn.execute(select([trendchart_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)


#################################################
# updated_banks_with_coordinates_qbfasset
#################################################

# Define the banklist table
updated_banks_with_coordinates_qbfasset_table = Table('updated_banks_with_coordinates_qbfasset', metadata, autoload=True, autoload_with=engine)

# Define a route function for the banklist endpoint
@app.route('/updated_banks_with_coordinates_qbfasset')
def get_qbfassets():
    conn = engine.connect()
    result = conn.execute(select([updated_banks_with_coordinates_qbfasset_table])).fetchall()
    conn.close()
    data = [dict(row) for row in result]
    return jsonify(data)





if __name__ == '__main__':
    app.run(debug=True)

