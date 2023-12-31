# my recipe website 
# my recipe website startup
## elevator pitch
When I was young, my diet consisted mostly of mac and cheese, toast, or packaged meals. As I grew up, my family and I realized that eating that way is not very healthy. We started looking for recipes that were healthy and tasted good, and slowly we started building up a binder of family recipes. Now, the binder is broken and greasy and starting to lose pages. I want to make a recipe website for my family so that our collection of recipes is safe and can grow bigger than our binder. 

## key features
One of the main features that I want to implement is an option to upload a pdf of a recipe, put in a link to a recipe (put in an iframe with wrapper), or type a recipe in manually. We have a lot of recipes from websites to put in, but we also have home recipes we need to write down. I also want to put in a 'favorite' option on each recipe, so each user can have a list of recipes they've favorited that they can view in their profile. Another thing that I want to include is a filter so you can view recipes by their tags (author, most recent, favorited, etc.).

## using each technology
HTML - used for the building blocks of the application and layout
CSS - styling
Javascript - calling APIs, dealing with data, handling WebSocket, login
Authentication - In order to favorite and create/upload recipes, you will have to log in. The option to log in will be in the right corner of the navbar, and after successful log in or sign up, the user's name will be shown where the log in option was. 
Database Data - All database data will be shown on multiple pages in the website, in the home page where a few recipes are shown by most recently added, and in the recipes tab where you can view all recipes in the database. 
WebSocket Data - In the bottom right corner of all pages will be a little heart icon, which will go off when someone favorites a recipe. (alt - when someone comments on a recipe)

## rough sketches
### home page
Includes an 'about' section about why I created the website and also a few of the most recently published recipes
![home page](<roughSketches/Screenshot 2023-09-19 at 8.47.40 AM.png>)
### recipe catalog
A way to view all recipes stored in the database, with the option to filter by tags, date etc
![recipe catalog](<roughSketches/Screenshot 2023-09-19 at 8.47.51 AM.png>)
### upload recipe
This view on upload recipe is based on the manual typing in of a recipe. Other views will be much more simple with just a button (or might not even get to implementing those)
![upload recipe page](<roughSketches/Screenshot 2023-09-19 at 8.48.04 AM.png>)
### login / my account
The highlighted button will take you to a login screen. After you login, you will see this screen with your profile (might not include a picture), contributed recipes, and favorited recipes.
![login / my account page](<roughSketches/Screenshot 2023-09-19 at 8.48.12 AM.png>)
### recipe view
When you click on a recipe, this is what you will see. If I have time, I will also add a feature where you can comment on recipes. There will also be a button to favorite the current recipe. 
![recipe view page](<roughSketches/Screenshot 2023-09-19 at 8.49.12 AM.png>)

# HTML Deliverable
### five page templates (html only) - most will show certain things conditionally
* links - each page has a navbar common to all pages with links to each different page. Clicking on a recipe will also take you to the recipe template page.
* text - most text will also be provided by users. Most text in the html is placeholder text, but in other places (ex forms) that's how the text will be. 
* images - all images are placeholders. Images for recipes will be held in the database so when recipes are loaded, they will be loaded with a unique picture
* login - pressing on the account link in the navbar will open a login prompt
* database - recipes and users will be held in the database
* websocket - the heart icon in the footer will do a little animation or something whenever someone favorites a recipe

# CSS Deliverable
### styling of the five html pages - mix of bootstrap and css (globalStyles.css)
* Header, footer, and main content body - styled
* Navigation elements - most a tags will show an underline on hover, show as clickable
* Responsive to window resizing - used bootstrap grid and flex so resize works on all screen sizes
* Application elements - lots of whitespace so it looks minimalistic, things easy to find
* Application text content - font is the same across the website
* Application images - placeholders for now, not styled properly
note - the iframe will be different as a website has different iframe than youtube ... still need to figure out media sizing for it and if that's the best way to include a url to a different website.

# Javascript Deliverable
### adding javascript for functionality / beginning functionality of website
* login - when you first go to the website, the login page shows. Login information is stored in localStorage, and after login the user has access to the rest of the site.
* database - all the recipes are stored in the database - for right now recipe is stored in localStorage with the fields that it will have in the database. Recipes will be dynamically shown both on the recipe page and on the catalog/home/account pages. The user is also stored in the database with its own fields including favorited recipes. Search terms are saved to localStorage and once the database and apis are done, they will filter through the recipes. After a recipe is uploaded the recipeCards will be updated with the uploaded data. 
* webSocket - using setInterval, webSocket data is shown as it will when it is implemented. When webSocket is actually implemented, it will display a new entry whenever a recipe is favorited by a user. This is shown underneath the heart icon in the footer.
* application logic - rendering of the recipeCards and the recipePage (recipe and comments) are done dynamically with data from localStorage. Functionality to add a comment and see it immediately posted and functionality to post a recipe are included.

# Service Deliverable
### backend, endpoints
* Node.js/Express HTTP service - done
* Static middleware for frontend - done
* Calls to third party endpoints - in the home/main page under the picture on the right, a random joke will appear when you refresh the page. This has nothing to do with my website but it looks cool
* Backend service endpoints - finished endpoints to get and add a comment - should work as usual if you click on a recipe and add a comment. I didn't add the recipes endpoints because I figured it would be much easier to do that when the database is implemented because of the weird way I was using localStorage. 
* Frontend calls service endpoints - done in displayRecipePage.js, getComments() and saveComments()

# Database Deliverable
### data stored and retrieved from mongoDB
* MongoDB database created - done
* Endpoints for mongo - all endpoints used (5 total) retrieve or post data to mongoDB
* Stores data in mongo - when a recipe is uploaded or comment posted, it is posted to mongoDB. Recipes and comments are retrieved from the database and shown dynamically on the website with a recipe id stored in localStorage
* note - images for now are static and not stored in the database- I'll figure that out later
* note 2 - recipes shown in my account page are not dynamic - when login is implemented, recipes will be stored under the user so will have different functionality

# Login Deliverable
### users and user data stored in database
* User registration - creates a new user in the database
* Existing user - can login with existing credentials
* Use MongoDB to store users - stores user, favorited recipes, and contributed recipes
* Restricted Functionality - the whole website cannot be accessed unless you are logged in
* Lots of work was done on the 'my account' page - it shows favorited/contributed recipes dynamically and has a logout function

# Websocket Deliverable
### Websocket functionality on recipe page
* Backend listens for WebSocket connection - done
* Frontend makes WebSocket connection - done
* Data sent over WebSocket connection - when a recipe is favorited, the recipe title and user name are sent over the connection
* WebSocket data displayed - info displayed on a recipe page (footer) whenever a recipe is favorited by a user

# React Deliverable
### converted website to React
* Bundled & Transpiled - done
* Components - each page is its own components with the header, footer, and cards as separate components as well
* Router - route used for each page
* Hooks - almost every page uses useState and useEffect to handle changes from the user