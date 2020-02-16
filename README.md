# Quilt Calc API

## Summary
This app allows you to get real-time calculations of needed fabric for different quilt patterns. The user can choose from different classic quilt patterns and then change parameters such as length, width, and border sizes.

## Live Demo

https://quilt-calc.vreplicon.now.sh/

## Front End Repo

https://github.com/vreplicon/quilt-calc

## API Endpoints

### /api/quilts

A GET request to this endpoint will return all of the standard quilt patterns in the database
Use a POST request to add a new quilt to the database

### /api/quilts/lookup_id

Use a GET request to recieve the first quilt in the database with the given lookup_id

## Technologies Used

### Front End

React  

### Backend

Node.js, Express

### Testing

Chai, Supertest, Mocha