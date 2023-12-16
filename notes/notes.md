# deploy 
### make sure you're in the directory with deployFiles.sh
./deployReact.sh -k /Users/abigailbarton/Documents/dev/'web programming'/[pemkey] -h makeitgood.click -s startup
### for node service
code in deployFiles.sh was changed to deploy with a service - prev code was commented out

# term 1 notes
### what does the link element do?
ex. <link rel="" type="" href="">
can be used to link stylesheets, favicons, external resources
### what does the div tag do?
ex. <div>example div</div>
used to group / structure html content
### HTML tags
paragraph = <p>
ordered list = <ol>
unordered list = <ul>
second level heading = <h2>
first level heading = <h1>
third level heading = <h3>
### img tag and hyperlinks
<a href="https://example.com">
  <img src="" alt="">
</a>

### what is the difference between # and . selectors?
ex. #title {} .title {}
a # selector is used for ids, and . selectors are used for classes
### what is the difference between padding and margin?
padding = spacing between content and its border
margin = spacing between border and adjacent elements
### features of flex
div {
    display: flex;
    flex-direction: row / column / row-reverse / column-reverse;
    flex-wrap: wrap / nowrap;
    align-items: stretch / flex-start / flex-end / center;
    justify-content: flex-start / flex-end / center / space-around / space-between / space-evenly;
}
### arrow functions
ex. const arrowFunction = (parameters) => {}
inherit 'this' from enclosing function / context - does not have implicit 'this' for itself (lexical scoping)
cannot be used as constructors or used with 'new'
cannot be used as methods within objects because they do not have their own 'this' context
used a lot in map, filter, and reduce for concise syntax
### map function
using the map() function to create a new array with squared numbers
squaredNumbers = [1,2,3,4,5]
const squaredNumbers = numbers.map(function (number) {
  return number * number;
});
### filter function
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((number) => number % 2 === 0);
Output: [2, 4, 6, 8, 10]
### reduce function
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // Output: 15
### javascript selectors
document.getElementById('myElementId');
document.querySelector('.myClass');
document.querySelectorAll('div.myClass');
### default span css
span {
    display: inline;
    margin: 0;
    padding: 0;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: transparent;
    text-decoration: none;
    line-height: normal;
}
### the DOM
represents an HTML document with a tree structure, with different nodes representing HTML tags
supports event handling, so you can respond to user interactions
allows for dynamic web pages
### CSS Box model
+---------------------------------------+
|              Margin                   |
|                                       |
|   +-------------------------------+   |
|   |           Border              |   |
|   |                               |   |
|   |   +-----------------------+   |   |
|   |   |       Padding         |   |   |
|   |   |                       |   |   |
|   |   |   +---------------+   |   |   |
|   |   |   |   Content     |   |   |   |
|   |   |   |               |   |   |   |
|   |   |   +---------------+   |   |   |
|   |   |                       |   |   |
|   |   +-----------------------+   |   |
|   |                               |   |
|   +-------------------------------+   |
|                                       |
+---------------------------------------+
### changing css with javascript
function highlightElement() {
            const element = document.getElementById('myElementId');
            element.style.backgroundColor = 'red';
        }
an example of how to change the css of a selected element using javascript
### for loops in javascript
for (initialization; condition; increment/decrement) {
  // Code to be executed on each iteration
}
### if/else loops 
if (condition) {
  // Code to execute when the condition is true
} else if (anotherCondition) {
  // Code to execute when another condition is true
} else {
  // Code to execute when all conditions are false
}
### while loop
while (condition) {
  // Code to execute while the condition is true
}
### do...while loop
do {
  // Code to execute at least once, then repeatedly while the condition is true
} while (condition);
### switch statement
switch (expression) {
  case value1:
    // Code to execute when expression matches value1
    break;
  case value2:
    // Code to execute when expression matches value2
    break;
  // ...
  default:
    // Code to execute when no case matches
}
### declaring document type HTML
<!DOCTYPE html>
<html>
<head>
    <title>My HTML Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML document.</p>
</body>
</html>

### creating a javascript object
const myObject = {
  property1: value1,
  property2: value2,
  // Add more properties and values as needed
};
you can add a new property to an object in multiple ways
ex. objectName.newProperty = newValue;
### changing text content of an element with javascript
const element = document.querySelector('.my-element');
element.textContent = 'New Text Content';
// also can use element.innerText = 'New Text Content';
### JSON
represents data as key-value pairs, consisting of objects and arrays
ex. {
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "isStudent": false,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipcode": "12345"
  },
  "hobbies": ["reading", "swimming", "coding"]
}
often returned as the data type from api get calls or in databases
### console commands
chmod - used to change permissions of files and directories
pwd - print working directory - shows current directory
cd - change directory 
ls - list - lists contents of a directory
vim / nano - text editors in the terminal. vim is more powerful but is harder to learn, and nano is more user-friendly
mkdir - make directory
mv - move - moves files from one directory to another, can be used to rename files or directories
rm - remove - used to delete files or directories
man - manual - used to access the manual of commands
ssh - secure shell - used to securely connect to remote servers or computers over a network as if you were inputting commands on that machine
ps - process status - provides information about running processes on the system, including their process IDs (PIDs), resource usage, and status.
wget - a command-line utility for downloading files from the web. You can use it to fetch files and resources from websites.
sudo - superuser do - used to execute a command with superuser (administrator) privileges. It allows you to perform tasks that require elevated permissions, such as system administration tasks.
### creating a remote shell session
ssh username@hostname
'username' is the username you use to log in to the remote machine.
'hostname' is the IP address or hostname of the remote machine.
### ls -la
when you run ls -la, you'll get a detailed listing of all files and directories in the specified directory, including hidden files and directories.
### domain name
banana.fruit.bozo.click
TLD (Top-Level Domain): "click"
Subdomain 1: "banana"
Subdomain 2: "fruit"
Root Domain (Main Domain): "bozo"
### HTTPS web certificates
a web certificate, specifically an SSL/TLS certificate, is necessary to use HTTPS (Hypertext Transfer Protocol Secure) on a website. for these reasons:
- encryption
- authentication
- seo and user trust
- modern browsers
To use HTTPS on your website, you need to obtain an SSL/TLS certificate and install it on your web server
### DNS
In DNS (Domain Name System), an A (Address) record is used to map a domain name to an IPv4 address. Specifically, an A record points to an IPv4 address. It cannot directly point to another A record.

DNS, which stands for Domain Name System, is a fundamental and distributed system used on the internet to translate human-friendly domain names into IP addresses and vice versa. It serves as a crucial component of how the internet functions, making it easier for users to access websites, services, and resources.
### reserved ports
Port 443 is reserved for HTTPS, providing secure web browsing.
Port 80 is reserved for HTTP, used for standard web browsing.
Port 22 is reserved for SSH, facilitating secure remote access and data transfer.
### javascript promises
Promises in JavaScript are a powerful way to work with asynchronous operations. They provide a more structured and elegant way to manage asynchronous code, making it easier to handle tasks such as fetching data from a server, reading files, or any operation that doesn't complete immediately. Promises were introduced to address the problem of "callback hell," where deeply nested callbacks can become difficult to manage.
ex. const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (/* operation is successful */) {
    resolve(result);
  } else {
    reject(error);
  }
});
### async and await
async and await can be used to simplify promises.
ex. const async myFunction = () => {
    const cow = await somethingThatReturnsAPromise()
    return cow;
}
this will return the actual data that somethingThatReturnsAPromise() returns, instead of returning a promise


# Notes for the final
### What ports are used for HTTP, HTTPS, SSH?
HTTP - 80, HTTPS - 443, SSH - 22
### What do HTTP status codes in the 300, 400, 500 range indicate?
300 -redirection of some sort
400 - client error response
500 - server error response
### What does the HTTP header content-type allows you to do?
tells us what type of content we're dealing with - examples: json, html, plaintext, etc
allows you to specify the content type you're sending over HTTP
### What do the following attributes of a cookie do?
Domain - maps to what domain the cookie is coming from
Path - specifies path cookie was generated - startup.cs260.click/foo - in this example, '/foo' is the path
SameSite - will only return the cookie to the domain it is generated with (ex google generated cookie - only google will have access to that cookie)
HTTPOnly - tells the browser to not allow javascript to run on the browser so it can read the cookie
### Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
determine which functions are called and in what order
### Express middleware example
// Middleware example
const requestLoggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Call next to pass control to the next middleware in the stack
};
// Use the middleware for all routes
app.use(requestLoggerMiddleware);
### Given the following Express service code: What does the following JavaScript fetch return?
in general, fetch requests on the frontend return results of the communication to the server (status code, data)
express service codes 
### Given the following MongoDB query { cost: { $gt: 10 }, name: /fran.*/} select all of the matching documents.
grabs documents where cost is greater than 10 and the name is a string beginning with fran, returns an array of all matching documents
### How should you store user passwords in a database?
hash - Hashing is the process of converting a plaintext password into a fixed-length string of characters, which is typically a hash value. Hashing functions are called on passwords (ex bcrypt) and stored in the database instead of the password.
salt - Salting involves adding a unique and random piece of data (salt) to each password before hashing.  This makes it so that even identical passwords will not produce the same hash.
### Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
be familiar with websockets - what backend does on connect, disconnect, and message
### example websocket setup (from startup)
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        c.ws.send(data)
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
### What is the WebSocket protocol used for?
either the server or the client can initiate contact to each other - server to client or client to server (realtime data)
instantaneous client-server connection where either client or server can initiate contact
### What is JSX and how are the curly braces rendered?
javascript and html smushed together - anything after the return is rendered to the screen. curly brances in the return are rendered with javascript. if calling a function within the return, just put the function name in curly braces and it will call the javascript
### What are React Hooks used for?
modifies state of the component - handles the lifecycle events of a component (onCreate, onDestroy etc)
### What is the useEffect hook used for?
conditional rendering - watches lifecycle events based off the component and renders depending on that
### What role does npm play in web development?
manages your node packages and allows you to download third party packages for use in your code 
### What does package.json do in a npm project?
lists all packages you have, and during deployment you can specify certain scripts for deployment. 
### What does node.js do?
runs the server - you can run javascript on your local machine
### What does vite do?
allows you to bundle all your code together for production so you can display react components