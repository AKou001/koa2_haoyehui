'use strict'

const { Tender } = App.Models


exports.get_title = async ctx => {
    console.log(ctx)
    ctx.body = {
        errorCode: 1000,
        msg: 'test'
    }
}