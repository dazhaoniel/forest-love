# Forest Love

[Forest Love](http://www.forestlove.org/) supports Forest Conservation

### Forest and Ocean Conservation Initiatives

- [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1dL76TT10nuzUwiT3-OjzagR74NjHBR-TybOrmb6j6Vw/edit?usp=sharing) of Forest and Ocean Conservation Initiatives we support

### Data Sources

Airport city and codes pickled from orginal `.dat` data from [OpenFlights Airport data](https://openflights.org/data.html)

### Installation

## Backend Server
- Ensure that Python (v3.7+) and pip is installed 
- Install virtualenv `pip install virtualenv`
- from main root, `forest-love`, run `virtualenv venv`
- run `source venv/bin/activate`
- install dependencies via `pip install -r requirements.txt`
- `cd app` and run `python app.py`
- Make posts to endpoints in API.md with sample payload

## Front end client
- Ensure that node and npm are installed
- cd into `client` and run a npm install
- `npm start` to start the front end developmental server
- Package.json is serving from "localhost:3000" via the "proxy" key/value, so REST requests default to this; this will need to be changed eventually
