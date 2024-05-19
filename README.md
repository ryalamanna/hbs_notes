
# Project Title

#### Digital Notebook
##### Save your Thoughts on the go!

# Description

This Notes App is a personal project built using Express.js to help you keep track of everything you learn. It features a variety of tools to make your note-taking experience easy and efficient. With this app, you can:

* #### Write and Format Notes: 
    Create notes with various formatting options including bold text, font size adjustments, underlining, and more to enhance readability and organization.

* #### Save YouTube Video URLs: 
    Store YouTube video links for easy reference and play them directly within the app.

* #### Save Reference Links: 
    Keep track of important websites and other reference materials by saving their URLs for quick access.
    
This app is designed to be a simple yet powerful tool to organize your learning process and make your notes easily accessible
## Tech Stack

Node, Express, Handlebars, Mongodb


## Screenshots

![App Screenshot](https://ryal-s3bucket-1.s3.amazonaws.com/projectScreenshots/hbs-gif.gif)

![App Screenshot](https://ryal-s3bucket-1.s3.amazonaws.com/projectScreenshots/hbs-notes-edit-screen.png)


## MongoDB

Setup MongoDB

* Create a Database
* Create a collection with name `notes`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB` - Contains the mongodb URI


## Run Locally

Clone the project

```bash
  git clone https://github.com/ryalamanna/hbs_notes.git
```

Go to the project directory

```bash
  cd hbs_notes
```

Install dependencies

```bash
  npm install
```

Seed the database

```bash
  node seed.js
```

Start the server

```bash
  npm run dev
```

