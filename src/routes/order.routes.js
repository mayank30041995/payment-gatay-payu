const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jsSHA = require('jssha')
require('dotenv').config()

router.post('/hashing', async (req, res) => {
  const {
    customerName,
    customerId,
    amount,
    transitionId,
    productInfo = 'Testing_Product',
  } = req.body

  let { merchant_Key, salt } = process.env

  const data = {
    key: merchant_Key,
    txnid: transitionId,
    customerName,
    amount: amount,
    productInfo,
    customerId,
    email: 'test@gmail.com',
    firstname: 'Ashish',
    lastname: 'Kumar',
    udf1: 'details1',
    udf2: 'details2',
    udf3: 'details3',
    udf4: 'details4',
    udf5: 'details5',
  }

  console.log(data)

  const string = `${data.key}|${data.txnid}|${data.amount}|${data.customerName}|${data.email}|${data.firstname}|${data.lastname}|${data.productInfo}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}||||||${salt}`
  const sha = new jsSHA('SHA-512', 'TEXT')

  sha.update(string)

  //Getting hashed value from sha module
  const hash = sha.getHash('HEX')

  // const cryptoResult = crypto.createHash('sha512')

  console.log(string)
  // cryptoResult.update(string)

  // const hash = cryptoResult.digest('hex')
  // console.log(hash)

  return res.status(201).send({
    hash,
    transitionId,
  })
})

router.post('/success', async (req, res) => {
  return res.redirect('http://localhost:3000/success')
})
router.post('/failure', async (req, res) => {
  return res.redirect('http://localhost:3000/failure')
})

module.exports = router
