'use strict'

const { Tender } = App.Models
const { Validator } = App.Helper
const nodejieba = require('nodejieba')

exports.list = async ctx => {
  let { error, data } = Validator(
    ctx.query,
    {
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 10
      },
      sort: {
        type: String,
        default: 'releaseTime', // 默认为招标公示时间
        method(sort) {
          if (sort === 'control') {
            sort = 'controlPrice.publicTime' // 控制价公示时间
          } else if (sort === 'winner') {
            sort = 'winningBid.publicTime' // 中标公示时间
          } else if (sort === 'picketage') {
            sort = 'picketage.picketageTime' // 定标公示时间
          }

          return { [sort]: -1 }
        }
      },
      search: {
        type: String,
        method(search) {
          // 项目编号
          if (search.match(/^\d+$/)) {
            return [
              { tenderNum: new RegExp(search) },
              { projectNum: new RegExp(search) },
              { tenderProjectNum: new RegExp(search) }
            ]
          }
          // 项目名称
          else {
            let temp = search
            temp = temp.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&')
            return [
              { tenderName: new RegExp(temp) },
              { projectName: new RegExp(temp) },
              { tenderProjectName: new RegExp(temp) }
            ]
          }
        }
      },
      qualification: {
        type: String,
        method(keyword) {
          // 中文分词
          let keywordArray = nodejieba.cutSmall(keyword, 3)

          let and = []
          for (let item of keywordArray) {
            and.push({ name: RegExp(item) })
          }

          return {
            $elemMatch: { $and: and }
          }
        }
      },
      tendereeCompany: {
        type: String,
        method(value) {
          return new RegExp(value)
        }
      },
      projectType: Number,
      evaluationMethod: String,
      targetMethod: String
    },
    {
      filter() {
        if (this.search) {
          return {
            $or: this.search
          }
        } else {
          return {
            'tenderee.tendereeCompany': this.tendereeCompany,
            qualifications: this.qualification,
            projectType: this.projectType,
            evaluationMethod: this.evaluationMethod,
            targetMethod: this.targetMethod
          }
        }
      }
    }
  )

  if (error) {
    ctx.body = {
      errorCode: 1000,
      msg: error
    }
    return
  }

  let { page, limit, sort, filter } = data

  await Tender.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .then(async data => {
      ctx.body = {
        errorCode: 0,
        data: data,
        totalCount: await Tender.find(filter).count()
      }
    })
    .catch(err => {
      ctx.body = {
        errorCode: 1000,
        msg: '获取失败'
      }
    })
}

exports.list_newestBulletin = async ctx => {
  let { page = 1, limit = 20, type = 0, search } = ctx.query

  page = page ? Number(page) : 1
  limit = limit ? Number(limit) : 20
  type = type ? Number(type) - 1 : -1

  let finalData = {},
    sort = null,
    show = {
      projectName: 1,
      projectNum: 1,
      tenderProjectName: 1,
      projectType: 1
    }

  // 定义通用放出字段
  // const filter = {

  // }

  // 数组维护type=1到type=9时的聚合表达式
  const prin = [
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $let: {
                vars: {
                  firstEle: {
                    $arrayElemAt: ['$change', -1]
                  }
                },
                in: {
                  $ifNull: ['$$firstEle.releaseTime', '']
                }
              }
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'change'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$controlPrice.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'controlPrice'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$tenderMore.submitEndTender', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'submitEndTender'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $let: {
                vars: {
                  lastEle: {
                    $arrayElemAt: ['$meeting', -1]
                  }
                },
                in: {
                  $ifNull: ['$$lastEle.meetingTime', '']
                }
              }
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'meeting'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$opened.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'opened'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$evaluation.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'evaluation'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$picketage.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'picketage'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$winningBid.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'winningBid'
    },
    {
      filter: [
        {
          $project: {
            releaseTime: {
              $ifNull: ['$winningBid.releaseTime', '']
            },
            name: {
              $ifNull: ['$tenderProjectName', '$projectName']
            },
            projectType: 1
          }
        },
        {
          $sort: {
            releaseTime: -1
          }
        }
      ],
      name: 'qualificationAuditAndPerformance'
    }
  ]
  if (type >= 0 && type < 9) {
    let filter = []
    if (search) {
      filter = prin[type].filter
      filter.unshift({ $match: { projectName: { $regex: search } } })
    } else {
      filter = prin[type].filter
    }
    finalData[prin[type].name] = await Tender.aggregate(filter)
      .skip((page - 1) * limit)
      .limit(limit)
    ctx.body = {
      errorCode: 0,
      data: finalData,
      page,
      limit,
      totalCount: await Tender.count()
    }
  } else {
    let finalData = {}
    // 不传type时 获取九个type的前20条数据
    if (!search) {
      for (let i = 0; i < 9; i++) {
        const temp = await Tender.aggregate(prin[i].filter).limit(20)
        finalData[prin[i].name] = temp
      }
    } else {
      for (let i = 0; i < 9; i++) {
        const temp = await Tender.aggregate([
          { $match: { projectName: { $regex: search } } },
          ...prin[i].filter
        ]).limit(20)
        finalData[prin[i].name] = temp
      }
    }
    ctx.body = {
      errorCode: 0,
      data: finalData
    }
  }
}

exports.details = async ctx => {
  let id = ctx.params.id
  if (!id || id === '') {
    ctx.body = {
      errorCode: 1000,
      msg: 'id不能为空'
    }
    return
  }

  let tender = await Tender.findById(id).catch(err => {
    ctx.throw(err)
  })

  if (!tender) {
    ctx.body = {
      errorCode: 1000,
      msg: '标书不存在'
    }
  }

  let submitEndTender = tender.tenderMore.submitEndTender
  if (submitEndTender) {
    if (new Date(submitEndTender) < new Date()) {
      tender.allowBuy = false
    }
  }

  ctx.body = {
    errorCode: 0,
    data: tender
  }
}
