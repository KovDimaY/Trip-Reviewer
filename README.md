# Trip-Reviewer
This is a simple blog where each user can post his/her review of some trip so other people could know where it is nice to travel and where it is not so good.
This project was created to practice my full stack skills. It uses Mongo, React and Node with Express. 
Also it is my first project where it is implemented my own authentication system with cache and jwt.

The last deployed version is **Trip-Reviewer v1.1.0**. 
You can check it live at: https://trip-reviewer.herokuapp.com

I will appreciate a lot your feedback and your opinion about the project. Feel free to create an issue or to contact me via LinkedIn, mail or social networks.
Thank you in advance!



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

##### After running this command you can find the HTML version of the generated report in the next directory of the project:
```
.../Trip-Reviewer/client/coverage/jest/lcov-report/index.html
```

##### To update outdated snapshots:
```
npm run test:update
```

