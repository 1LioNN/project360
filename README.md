# [Project 360](https://project360.me)

[https://project360.me](https://project360.me) is developed by the _Project 360_ team.

### Team members

##### Lion Su - 1007271523

Lion worked on Three.js, Web Audio, deployment, and majority of the frontend.

##### Vanshika Virmani - 1006865251

Vanshika worked on auth0, socket.io, sentry, and some of the backend.

##### Lander Joshua Vitug - 1006560366

Lander worked on sengrid, auth0, socket.io + redis, and some of the backend.

## Project Description

_Project 360_ is an interactive and immersive 3D collaborative interior designer web app that empowers users to create and design customized interior spaces. The app offers users the option to create canvases of varying dimensions. Users can bring their vision to life with ease as they place all sorts of furniture from tables, to beds, chairs, to sofas.

Users can view their canvas spaces from a 360-degree camera perspective, which is navigable by dragging the screen with a mouse. Collaboration between users is indeed possible. This feature allows users to place items together in real time, offering a dynamic and social experience for designing interior spaces.

_Project 360_ also includes an invitation system, allowing users to invite collaborators to their canvases via email. Users can easily share their designs with others, making it a valuable tool for professionals in the interior design industry or anyone looking to create a virtual space for a project.

Overall, _Project 360_ is an innovative and user-friendly web app that offers an engaging and collaborative experience for designing and visualizing interior spaces in 3D.

### Tech Stack

- ReactJS for the frontend
- NodeJS for the backend
- PostgreSQL for the database

### Method for Deployment

- DigitalOcean Droplets
- Docker
- Nginx
- Github Actions
- Let's Encrypt

### Complexity Points

- Three.js (2 points)
  - Will be used for the building and rendering of our 3-D space for rooms, and the items we place in it.
- auth0 (1 point)
  - Will be used for authenticating the users that sign up (for creating an account) and sign in (for logging into) to our website
  - Will use scopes for User information (name, email, maybe a profile picture)
- socket.io (2 points)
  - Will be used for allowing users to collaborate on dragging the furniture to the room in real time.
  - Will also include the usage of redis to work with multiple replicas
  - Canvas updates will give users the ability to:
    - Place items on the canvas
    - Move items around on the canvas
    - Rotate items on the canvas
    - Clear/ delete items from the canvas
- sendgrid (2 points)
  - Will be used for sending emails for invitations to the individual rooms
  - The person who 'created' a canvas will be allowed to invite other users (who must sign up for the website) to collaborate on the same canvas. This invitation will involve sending a Room ID (or a secret key / link) to the user for authorization purposes.
- sentry (1 point)
  - Will be used for the handling and automatic reporting of errors or exceptions that users run into while using our application.
- web audio (1 point)
  - Will be used for an enhanced user experience by adding audio indicators whenever the user interacts with the furniture, i.e. having sound effects for dragging and dropping the furniture.

## Video Link

https://www.youtube.com/watch?v=UIVucGdnpj8
