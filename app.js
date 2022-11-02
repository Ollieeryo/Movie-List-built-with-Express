// require packages in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebar here
// 載入 handlebars
const exphbs = require('express-handlebars')

// 當 require() 內寫的是路徑時，則 Node.js 會根據你所提供的路徑去找到並載入該檔案
// 拿電影資料
// 檔案的路徑 ./ ---> 指的是同一層資料夾
// 另外 node.js 會自動判斷檔名為 .js .json .node，所以其實可以不必寫檔名
const movieList = require('./movies.json')

// 載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars
// setting template engine
// main 為我們自己設定的檔案
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 handlebars
app.set('view engine', 'handlebars')

// setting static files
// 得到 request 之後都先用 use 去找資料夾的檔案，告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

// route setting 
app.get('/', (reu, res) => {
  // create a variable to store movies
  // const movieList = [
  //   {
  //     id: 1,
  //     title: 'Jurassic World: Fallen Kingdom',
  //     image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
  //   },
  //   {
  //     id: 2,
  //     title: 'THIS IS MOVIE TITLE',
  //     image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg'
  //   }, {
  //     id: 3,
  //     title: "Thor: Ragnarok",
  //     image: "https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "Avengers: Infinity War",
  //     image: "https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
  //   },
  //   {
  //     id: 5,
  //     title: "Mission: Impossible - Fallout",
  //     image: "https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
  //   },
  //   {
  //     id: 6,
  //     title: "Incredibles 2",
  //     image: "https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg"
  //   },
  //   {
  //     id: 7,
  //     title: "Fifty Shades Freed",
  //     image: "https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg"
  //   },
  //   {
  //     id: 8,
  //     title: "The First Purge",
  //     image: "https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg"
  //   },
  // ]

  // past the movie data into 'index' partial template
  // 如果物件變數跟 實際物件名稱相同的話 可以寫一次就好 ex: movies.results
  res.render('index', { movies: movieList.results })
})

// show page render
// req.params.movie_id 實際為字串（String)，而 movie.json 取得的 movie.id 為數字(Number)
app.get('/movies/:movie_id', (req, res) => {
  // console.log('req.params.movie_id', req.params.movie_id)
  // filter 的寫法 :
  // const movie = movieList.results.filter(movie => movie.id == req.params.movie_id)
  // res.render('show', { movie: movie[0] })

  // 拿客戶端點擊電影 id 相同的電影資料，之後再 render 出來
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  // req.params.keyword includes in movieList.results
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  // filter + includes 找出關鍵字電影，並且 toLowerCase 解決大小寫問題
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  // 設定第二個參數取得使用者輸入的關鍵字
  res.render('index', { movies: movies, keyword: keyword })
})




// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})