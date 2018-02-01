const app = require('express')()
const session = require('express-session')
const bodyParser = require('body-parser')

require('dotenv').config()
app.use(bodyParser.json())
app.use(session({
    secret: '1234124t13fd12edqa8d0hj;lw',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 12 } // 12 hours
}))

const checkLoggedIn = (req,res,next)=>{
    if(req.session.user || req.originalUrl === '/api/login') {
        next()
    } else {
        res.status(403).end()
    }
}

const port = 3001

let question = ''
let id = 0
const users = []

app.post('/api/login', (req,res)=>{
    var user = {
        name: req.body.name,
        done: false,
        trouble: false,
        id: id++
    }
    users.push(user)
    req.session.user = user
    res.send(user)
})
app.post('/api/question', (req,res)=>{
    question = req.body.question
    users.forEach((e,i,a)=>{
        a[i].done = false
        a[i].trouble = false
    })
    res.send({question, users})
})
console.log(process.env.PASSWORD);
app.post('/api/admin', (req,res)=>{
    if(req.body.password === process.env.PASSWORD) {
        req.session.isAuthed = true
        res.status(200).send(true)
    } else {
        res.status(403).send(false)
    }
})

app.get('/api/admin', (req,res)=>{

    res.status(200).send(req.session.isAuthed)
})

app.get('/api/question', (req,res)=>{
    if(req.session.user) {
        user = users.find(elem => elem.id === req.session.user.id)
        req.session.user = user
    }
    res.send({question, users, user: req.session.user})
})
app.get('/api/user', checkLoggedIn, (req,res)=>{
    res.send(req.session.user)
})
app.get('/api/status/:status', checkLoggedIn, (req,res)=>{

    var user = users.find(user=>user.id === req.session.user.id)

    switch (req.params.status) {
        case 'done':
            user.done = true
            user.trouble = false
            break;
        case 'trouble':
            user.done = false
            user.trouble = true
            break;
        case 'progress':
            user.done = false
            user.trouble = false
            break;
    
        default:
            break;
    }
    req.session.user = user
    res.send(user)
})


app.listen(port, ()=>console.log(`running on ${port}`))