// hw1
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT|| 3000;

var app = express();



hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

// use: 會對 /__dirname + '/public' 路徑上任何類型的 HTTP 要求，執行此函數
// app.use(express.static(__dirname + '/public')); //資料夾當作根目錄

app.use((req, res, next) => {
    var now = new Date().toString();    
    // console.log(`${now}: ${req.method} ${req.url}`);
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('sever.log', log + '\n', (err) => { //製作使用log
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});


// //middleware use to check api work
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //資料夾當作根目錄

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() //使home & about page 都不用打重複的currentYear: new Date().getFullYear()
});

hbs.registerHelper('capitalletter', (text) => {
    return text.toUpperCase(); //toUpperCase轉大寫
});
// get: 此函數會處理指向 / 路徑的 GET 要求
app.get('/', function(req, res) {
    //   // res.send('<h1>hello world!</h1>');
    // //json
    //     res.send({
    //         name: 'sam',
    //         hobby: [
    //             'coding',
    //             'masturbate'
    //         ]
    //     });
    //     //res.send同時存在，只會print第一個
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMessage: 'welcome to my web!',
        // currentYear: new Date().getFullYear()
    })
});

// app.get('/', (req,res) => {
//  res.send('hello world');
// });

app.get('/about', function(req, res) {
    // res.send('advance coding');
    res.render('about.hbs', {
        pageTitle: 'about page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/error', (req, res) => {
    res.send({
        errorMessage: 'you fail!!'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);

}); //設定port
// console.log('server is up on port 3000')

// 網址輸入：http://localhost:3000/ 
// mysql 3306
// app.listen(8080,'127.0.0.1',function(){
//     console.log('HTTP server work on http://127.0.0.1:8080/ ');
// });


