# Project 360

Developed by the _Project 360_ team.

### Team members

- Lion Su - 1007271523
- Vanshika Virmani - 1006865251
- Lander Joshua Vitug - 1006560366

## Project Description

_Project 360_ is an interactive and immersive 3D collaborative interior designer web app that empowers users to create and design customized interior spaces. The app offers users the option to select from preset canvases such as bedrooms, living rooms, or to define the size of the canvas themselves. With a vast array of placeable items and furniture to choose from, including essentials like chairs, desks, and beds, as well as decorative items like plants and paintings, users can bring their vision to life with ease.

Users can view their canvas spaces from a 360-degree camera perspective, which is navigable by dragging the screen with a mouse. Additionally, users can toggle between a 360-camera view or a first-person view for a more immersive experience. Collaboration between users is made possible, with up to 3-4 people per canvas. This feature allows users to place items together in real time, offering a dynamic and social experience for designing interior spaces.

_Project 360_ also includes an invitation system, allowing users to invite collaborators to their canvases via email. Users can save and export their canvases as SVL or PDF files. With these export options, users can easily share their designs with others, making it a valuable tool for professionals in the interior design industry or anyone looking to create a virtual space for a project.

Overall, _Project 360_ is an innovative and user-friendly web app that offers an engaging and collaborative experience for designing and visualizing interior spaces in 3D.

### Tech Stack

- React for the frontend
- FLASK for the backend
- PostgreSQL for the database

### Method for Deployment

- DigitalOcean Kubernetes

### Complexity Points

- Three.js (2 points)
  - Will be used for the building and rendering of our 3-D space for rooms, and the items we place in it.
- auth0 (1 point)
  - Will be used for authenticating the users that sign up (for creating an account) and sign in (for logging into) to our website
  - Will use scopes for User information (name, email, maybe a profile picture)
- socket.io (2 points)
  - Will be used for allowing users to collaborate on dragging the furniture to the room in real time.
  - Canvas updates will give users the ability to:
    - Place items on the canvas
    - Move items around on the canvas
    - Clear/ delete items from the canvas
- sendgrid (2 points)
  - Will be used for sending emails for invitations to the individual rooms
  - The person who 'created' a canvas will be allowed to invite other users (who must sign up for the website) to collaborate on the same canvas. This invitation will involve sending a Room ID (or a secret key / link) to the user for authorization purposes.
- sentry (1 point)
  - Will be used for the handling and automatic reporting of errors or exceptions that users run into while using our application.
- react dnd (1 point)
  - Will be used for implementing the drag and drop functionality of the furniture pieces onto the canvas

#### Challenge Factor

- web audio (1 point)
  - Will be used for an enhanced user experience by adding audio indicators whenever the user interacts with the furniture, i.e. having sound effects for dragging and dropping the furniture.

## Alpha Version (March 6, 2023)

- Setup the frontend, backend, and database
- Create and store canvases properly for each user
- Authentication
- Frontend design
- Sentry setup
- Setup as much of socket without the frontend

## Beta Version (March 20, 2023)

- Implement React dnd
- Allow editting of canvases
- Allow users to save their canvases

## Final Version (April 3, 2023)

- Collaboration should be working
- Email should be working
