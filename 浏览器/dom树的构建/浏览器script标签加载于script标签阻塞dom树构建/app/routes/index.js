/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-06-20 17:22:50
 * @LastEdiTime: 
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/script', function (req, res, next) {
  console.log(req.query)
  let time = req.query.time
  setTimeout(() => {
    res.send({
      msg: 'success',
      time
    })
  }, time)
})
module.exports = router;