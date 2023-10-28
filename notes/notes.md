# deploy 
### make sure you're in the directory with deployFiles.sh
./deployFiles.sh -k /Users/abigailbarton/Documents/dev/'web programming'/[pemkey] -h makeitgood.click -s startup

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

