"use strict"

const { Router, Middleware: {  auth  } } = App

// 客户端
const tender = require('./tender')

Router.get('tenders', tender.list)

Router.get('tenders/newestBulletin', tender.list_newestBulletin)

Router.get('tenders/:id', tender.details)