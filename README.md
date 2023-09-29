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
* five page templates (html only) - most will show certain things conditionally
* links - each page has a navbar common to all pages with links to each different page. Clicking on a recipe will also take you to the recipe template page.
* text - most text will also be provided by users. Most text in the html is placeholder text, but in other places (ex forms) that's how the text will be. 
* images - all images are placeholders. Images for recipes will be held in the database so when recipes are loaded, they will be loaded with a unique picture
* login - pressing on the account link in the navbar will open a login prompt
* database - recipes and users will be held in the database
* websocket - the heart icon in the footer will do a little animation or something whenever someone favorites a recipe
