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