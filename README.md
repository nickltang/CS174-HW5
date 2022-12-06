# CS174-HW5

Group Members: Nick Tang (014274559), Tiffany Phan (014112969), Ethan DeGuzman (013978029)

## Setup Instructions
1. Install npm and node if you don't have them
2. Install MySQL if not already installed (https://dev.mysql.com/doc/refman/8.0/en/installing.html)
3. In your terminal, navigate to the `CS174-HW5/client` directory, enter `npm i`.
4. In your terminal, navigate to the `CS174-HW5/server` directory, enter `npm i`.
5. Change the values in Config.js to match your MySQL credentials and desired ports.
6. In your terminal, navigate to the `CS174-HW5/server/config` directory, enter `node CreateDB.js`.

## To Run This App
1. In your terminal, navigate to `CS174-HW5/server` and enter `nodemon index.js`.
2. In a separate terminal window, navigate to `CS174-HW5/client` and enter `npm start`.
3. In your browser, navigate to `localhost:3000`.

## Click-Jacking
This Login Vulnerable page contains a React-Bootstrap overlay trigger that encloses the login button. 
When users click on the login button, they are rerouted to another webpage. 
Users can be rerouted to a malicious webpage. However, we decided to reroute the user to a youtube video. 

Instructions:
1. Open the app
2. Click on Login Vulnerable
3. Input username and password
4. Click Login
5. User will be rerouted to another webpage (youtube) 