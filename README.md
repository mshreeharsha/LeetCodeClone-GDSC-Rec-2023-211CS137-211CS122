# LeetCodeClone-GDSC-Rec-2023-211CS137-211CS122


Website deployed link: https://leetcodeclone-gdsc.cyclic.app/


Setup Explanation
1) git clone the repo using the url.
2) Type the command npm install in the main directory of the repo and this will install all the dependencies for the backend code.
3) Next change directory to frontend and then type the command npm install in the terminal to install frontend dependencies
4) Don't use NITK NET inorder to test the application since MONGO DB atlas does not work on NITK WIFI. Use Mobile Hotspot
5) Create a .env file in the main directory containing variables like mongo DB atlas URL, DEV-MODE as development, PORT number, JWT TOKEN, FRONTEND_URL for dealing with cors errors
6) Create a mongo DB atlas project and copy the URL for vscode and paste it in .env file (url variable) to connect the server to the database
7) Declare DEV_MODE as development
8) PORT number could be anything above 1024 preferrably 8000
9) JWT_TOKEN is any random string that serves the purpose of a key while encoding and decoding the JWT TOKEN for logging users.
10) FRONTEND_URL to avoid cors error to list the browser that can request the server.
11) Based on the database models and code execution add problems to database using postman.
12) The command for running both server and frontend code is npm run dev that should be typed in the main directory of the repo in the terminal
13) If you want to run the server separately type the command npm run server in the main directory of the r0epo in the terminal

Usage Explanation 
1) On clicking the above deployed link, the homepage of the website opens.
2) The first page contains signup and signin in the navbar where the user can register and then login to the website.
3) User can filter the problems based on difficulty, type of data structure with problem can be solved like (arrays, linked list, stacks, dp etc), attempted or solved problems, search the problem based on problem title.
4) Solved problems are indicated with green ticks while attempted problems are indicated with orange circle.
5) On Clicking the problem user will be directed to the problem page.
6) The problem page is made up of 4 sections. Problem description and submission on the left section. Code on the top right and test cases output on the bottom right.
7) User can toggle the console to get a full screen right view of the code.
8) The left side section contains problem title, problem description, example test cases and outputs, constraints.
9) The code can be written in three languages basically C, C++ and Python.
10) The user is expected to right the logic in the given function and main function and he need not right the main function.
11) Once the problem is done he can click on run to check whether all example test cases are passed or not.
12) On clicking submit the user can check his submission in the submissions page that will be automatically redirected on submit.
13) We are handling compilation errors, wrong answers and all test cases passed conditions in both run and submit button events.
14) A set of example test cases are run when run button is clicked and set of hidden test cases are run when submit button is clicked.
15) User can also enter custom test cases and then click on run button and the user output along with the test case is printed in the test case section in th bottom right corner.
16) Follow the instructions as given in the problem description to see how to input the custom test cases in the raw format in the bottom right corner under custom test cases section.
17) User can finally view the code with which he submitted in the submission section along with its status as to it is accepted, wrong answer or compile error.




We didn't use any repositories or public clones or youtube videos as references. We have kept the original leetcode website as the template and tried to replicate most of the functionality of that website through proper database design and applying the logic in the frontedn to show the content in an elegant way.

