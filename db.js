const { Pool } = require('pg')
const port = 5432;
var moment = require('moment');


const pg = new Pool(
    {
        user: 'postgres',
        host: '127.0.0.1',
        password: '1234',
        database: 'postgres',
        port: port,
    }
)


const get_tweets = (req, res) => {
    pg.query('SELECT * FROM tweets ORDER by posting_date DESC, posting_time DESC', (error, tweets) => {
        if(error){
            console.log(error.message)
        }
        console.log(tweets.rows[0].content)
        //res.status(200).json(tweets.rows)
        res.render('index', {arr: tweets.rows, moment: moment})

    })
}

const post_tweets = (req, res) => {
    const text = req.body;
    var now = moment().format();
    var date = now.substring(0,10)
    var time = now.substring(11,19)
    console.log(text+"\n"+date+"\n"+time)

    pg.query('INSERT INTO tweets (content,posting_date, posting_time) VALUES ($1, $2, $3)'
    , [text.message, date, time], (error, tweets) => {
        if(error){
            console.log(error.message)
        }
        console.log(text.message)
        //res.status(200).json(tweets.rows)

    })
}

module.exports = {
    get_tweets,
    post_tweets,
}
