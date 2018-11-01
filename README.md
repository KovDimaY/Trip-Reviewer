# Trip-Reviewer
[![Build Status](https://travis-ci.com/KovDimaY/Trip-Reviewer.svg?branch=master)](https://travis-ci.com/KovDimaY/Trip-Reviewer)
[![Coverage Status](https://coveralls.io/repos/github/KovDimaY/Trip-Reviewer/badge.svg?branch=master)](https://coveralls.io/github/KovDimaY/Trip-Reviewer?branch=master)
[![GitHub version](https://img.shields.io/badge/version-2.0.0-yellow.svg)](https://github.com/KovDimaY/Trip-Reviewer/releases)
[![GitHub demo](https://img.shields.io/badge/demo-available-green.svg)](https://trip-reviewer.herokuapp.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KovDimaY/Trip-Reviewer/blob/master/LICENSE)

This is a simple blog where each user can post his/her review of some trip so other people could know where it is nice to travel and where it is not so good. Also, it is just a good place to share you interesting stories about traveling.


This project was created to practice my full stack skills. It uses Mongo, React and Node with Express. 
Also it is my first project where it is implemented a custom authentication system with cache and jwt.
This project has a very strict Git Flow, 100% test coverage and strict linting, CI with Travis, two environments and an Issue-Project-Release system to organise development process. I tried to make this project as organised as possible because I am a very methodological person and I like when everything is structured.

The last deployed production version is [**Trip-Reviewer v2.0.0**](https://github.com/KovDimaY/Trip-Reviewer/releases). 
<br>
<br>

### There are two environments with independent databases:

**Production** (MASTER branch): https://trip-reviewer.herokuapp.com

**Pre-production** (DEVEL branch): https://trip-reviewer-pre.herokuapp.com

I will appreciate a lot your feedback and your opinion about the project. Feel free to create an issue or to contact me via LinkedIn, mail or social networks.
Thank you in advance!
<br>
<br>

### Screenshots:
1) Not-authorized Menu:<br>
![screenshot at aug 21 18-36-27](https://user-images.githubusercontent.com/26466644/44415785-8c633700-a571-11e8-9963-a5d7a8344a57.png)

2) Authorized Menu:<br>
![screenshot at aug 21 18-36-12](https://user-images.githubusercontent.com/26466644/44415822-a6047e80-a571-11e8-90ec-fa9a7cd16405.png)

3) Login Page:<br>
![screenshot at aug 21 18-33-40](https://user-images.githubusercontent.com/26466644/44415666-4c03b900-a571-11e8-92a3-2afc976a8b82.png)

4) Registration Page:<br>
![screenshot at aug 21 18-34-08](https://user-images.githubusercontent.com/26466644/44415741-748bb300-a571-11e8-9979-19f3abc9883f.png)

5) User Profile Page:<br>
![screenshot at aug 21 18-35-08](https://user-images.githubusercontent.com/26466644/44415941-ef54ce00-a571-11e8-8d81-3164fb3ac2be.png)

6) Add Review Page:<br>
![screenshot at aug 21 18-35-35](https://user-images.githubusercontent.com/26466644/44415899-ccc2b500-a571-11e8-9f90-ece0cc8fc33d.png)

7) Trip Review page:<br>
![screenshot at aug 21 18-33-21](https://user-images.githubusercontent.com/26466644/44415607-31314480-a571-11e8-9f31-6dd5e1d12acb.png)

<br>
<br>



### For contributors:
Even though it is a simple project that was created to practice some JS programming, everyone is welcomed to contribute. I really appreciate any commitment to the projects I created! :D

To understand better our basic approaches to contributions, please take a look at the following resources: 
- [Code of Conduct](https://github.com/KovDimaY/Trip-Reviewer/blob/master/CODE_OF_CONDUCT.md)
- [How to contribute to SimpleChat](https://github.com/KovDimaY/Trip-Reviewer/blob/master/CONTRIBUTING.md)
- [License](https://github.com/KovDimaY/Trip-Reviewer/blob/master/LICENSE)

<br>
<br>



### To run the project in local:
##### Clone the project: 
```
git clone https://github.com/KovDimaY/Trip-Reviewer.git
```

##### Open it:
```
cd Trip-Reviewer
```

##### Install all required packages:
```
npm install
```

##### Run the mongoDB database:
```
npm run mongo
```

##### IN THE NEW TAB run the combined dev-server:
```
npm run dev
```

##### Open your browser at http://localhost:3000/

<br>
<br>



### To run test coverage:
##### In the root of the project run the commands:
```
npm run test
```

##### To generate coverage report:
```
npm run test:coverage
```

##### To open visual coverage report in browser:
```
npm run coverage:report
```

##### To update outdated snapshots:
```
npm run test:update
```

