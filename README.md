# Trip-Reviewer

[![Build Status](https://travis-ci.com/KovDimaY/Trip-Reviewer.svg?branch=master)](https://travis-ci.com/KovDimaY/Trip-Reviewer)
[![Coverage Status](https://coveralls.io/repos/github/KovDimaY/Trip-Reviewer/badge.svg?branch=master)](https://coveralls.io/github/KovDimaY/Trip-Reviewer?branch=master)
[![GitHub version](https://img.shields.io/badge/version-2.1.2-yellow.svg)](https://github.com/KovDimaY/Trip-Reviewer/releases)
[![GitHub demo](https://img.shields.io/badge/demo-available-green.svg)](https://trip-reviewer.herokuapp.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KovDimaY/Trip-Reviewer/blob/master/LICENSE)

This is a simple blog where each user can post his/her review of some trip so other people could know where it is nice to travel and where it is not so good. Also, it is just a good place to share you interesting stories about traveling.

This project was created to practice my full stack skills. It uses Mongo, React and Node with Express.
Also it is my first project where it is implemented a custom authentication system with cache and jwt.
This project has a very strict Git Flow, 100% test coverage and strict linting, CI with Travis, two environments and an Issue-Project-Release system to organise development process. I tried to make this project as organised as possible because I am a very methodological person and I like when everything is structured.

The last deployed production version is [**Trip-Reviewer v2.1.2**](https://github.com/KovDimaY/Trip-Reviewer/releases).
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

1. Not-authorized Menu:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47853258-6dd5b380-ddde-11e8-9fdf-45fb987ce6bf.png)

2. Authorized Menu:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47853576-7084d880-dddf-11e8-9797-43ddef0bbc44.png)

3. Registration Page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47854831-171ea880-dde3-11e8-8484-91258395541f.png)
   ![image](https://user-images.githubusercontent.com/26466644/47854866-374e6780-dde3-11e8-9a78-87c424a643db.png)

4. Login Page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47854722-c3ac5a80-dde2-11e8-864f-91d97a4b21ba.png)

5. User Profile Page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47853514-48957500-dddf-11e8-859c-28001aec4640.png)

6. User Reviews Page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47853844-58fa1f80-dde0-11e8-9e13-c2aeaf90dc58.png)

7. Add Review Page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47854613-7d56fb80-dde2-11e8-9edd-a6d1df6d1df3.png)
   ![image](https://user-images.githubusercontent.com/26466644/47854649-91026200-dde2-11e8-9502-40d3cacb5d74.png)

8. Trip Review page:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47854355-d4100580-dde1-11e8-8a1e-f52084168b82.png)
   ![image](https://user-images.githubusercontent.com/26466644/47854559-53053e00-dde2-11e8-8fd6-3e9915680312.png)

9. Reset Password Email:<br>
   ![image](https://user-images.githubusercontent.com/26466644/47858656-daf04580-ddec-11e8-99e9-54b90dc3ee1e.png)

10. Test Coverage:<br>
    ![image](https://user-images.githubusercontent.com/26466644/47857363-b5157180-dde9-11e8-884f-5ce5d3d0f49c.png)

<br>
<br>

### For contributors:

Even though it is a simple project that was created to practice some JS programming, everyone is welcomed to contribute. I really appreciate any commitment to the projects I created! :D

To understand better our basic approaches to contributions, please take a look at the following resources:

- [Code of Conduct](https://github.com/KovDimaY/Trip-Reviewer/blob/master/CODE_OF_CONDUCT.md)
- [How to contribute to TripReviewer](https://github.com/KovDimaY/Trip-Reviewer/blob/master/CONTRIBUTING.md)
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

##### To run linter (ESLint):

```
npm run lint
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
