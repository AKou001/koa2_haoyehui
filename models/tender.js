let Mongoose = App.Mongoose
let Schema = Mongoose.Schema

let tender = new Schema({
   //招标概况
   projectName: { type: String }, //项目名称
   projectNum: { type: String }, //项目编号
   isMajorProject: { type: Boolean }, //是否重大项目
   tenderProjectName: { type: String }, //招标项目名称
   tenderProjectNum: { type: String }, //工程项目编号
   projectType: { type: Number }, //工程类型**********
   biddingMethod: { type: String }, //招标方式
   qualificationReviewType: { type: String }, //资格审查方式
   isPreElection: { type: Boolean }, //是否预选招标
   announceProperty: { type: Number }, //公告性质**********
   releaseTime: { type: Date }, //公告发布开始时间
   endTime: { type: Date }, //公告发布截止时间
   questionEndTime: { type: Date }, //公告质疑截止时间
   answerEndTime: { type: Date }, //公告答疑截止时间
   methodOfObtaining: { type: String }, //招标文件/资格预审文件获取方式
   remarks: { type: String }, //备注
   //招标人及招标代理
   tenderee: {
      tendereeCompany: { type: String }, //建设单位
      tendereeManager: { type: String }, //经办人
      tendereePhone: { type: String }, //办公电话
      agentAgency: { type: String }, //招标代理机构
      agent: { type: String }, //招标代理机构-代理人
      agentPhone: { type: String }, //招标代理机构 办公电话
   },
   //标段固定字段
   tenderName: String, //标段名称
   tenderNum: String, //标段编号
   tenderContent: String, //本次招标内容
   projectAddress: String, //工程地址
   isAcceptUnions: Boolean, //是否接受联合体投标
   unionsClaim: String, //联合体要求
   tenderValuation: Number, //标段金额/招标部分估价/本次发包监理费/本次发包工程估价***
   evaluationMethod: String, //评标方式/拟采用评标方式***
   targetMethod: String, //定标方式/拟采用定标方式***
   submitTenderAddress: String, //投标报名地点/投标文件递交地点***
   qualifications: [{
      id: Schema.Types.ObjectId,
      name: String
   }],//企业资质***
   otherQualifications: String, //其它资质
   //标段弹性字段
   tenderMore: {
      qualifiedCondition: String, //资格审查合格条件
      handleStartTime: Date, //受理报名开始时间
      handleEndTime: Date, //受理报名结束时间
      submitEndTender: Date, //递交投标文件截止时间（截标时间）
      totalInvestment: String, //计划总投资
      planStartDate: Date, //计划开工日期
      planEndDate: Date, //计划竣工日期
      picQualifications: String, //项目负责人资格
      performanceClaim: String,//业绩要求
      isTwoBids: Boolean,//是否二次竞价
      otherClaim: String,//其它/其他要求
      tenderScope: String, //招标范围
      mainResult: String, //主要投标成果
      mainTenderResults: String, //主要招标成果
      tenderRecognizance: Number, //投标保证金
      tenderCycle: String, //投标周期
      tenderCompensate: String, //投标补偿
      projectSurvey: String,//项目概况
      projectEnvironment: String,//项目现场的具体位置和周边环境
      performanceProve: String,//业绩要求所需提供的证明材料
      applicantProjectClaim: String,//投标人应具备资质条件
      applicantSimilarProjectClaim: String,//投标申请人应当具有的同类工程经验要求
      bidderApplicationMaterial: String,//投标申请人需提供的报名材料
      applicantLowestQualifications: String,//投标申请人项目总监必须具备最低资质等级 / 投标申请人必须具备资质条件 / 企业资质要求
      tendererQualif: String,//投标申请人必须具备企业最低资质要求
      directorMajorClaim: String,//项目总监专业要求 / 拟派项目经理（或建造师）专业 >>>>>>2017-7-10 更新字段名称
      isDirectorClaimQualifications: Boolean,//拟派项目总监是否必须具备国家注册监理工程师执业资质
      projectManagerLowestQualifications: String,//拟派项目经理（或建造师）最低资质要求
      otherTenderCondition: String,//其他投标条件
      tenderArea: String, //本次招标面积
   },
   //招标控制价公示
   controlPrice: {
      type: { type: String }, //类型
      bidAuditUnit: { type: String }, //标底审核单位
      examinationPrice: { type: String },//招标控制价/审定造价
      bidPrice: { type: String }, //标底
      floatPoint: { type: String }, //下浮点数
      winningBidPrice: { type: String }, //中标价
      preControlprice: { type: String }, //下浮前招标控制价
      totalNonCompetitiveFee: { type: String }, //不可竞争费合计 
      unexaminedReason: { type: String }, //招标控制价未审定原因
      maxPrice: { type: Number }, //投标报价上限
      safetyPrice: { type: Number },//安全文明施工费
      changePrice: { type: Number },//修正价格
      remarks: { type: String }, //备注
      files: [{
         title: { type: String }, //标题
         fileName: { type: String }, //文件名
         path: { type: String } //文件链接
      }],
      releaseTime: { type: Date }
   },
   //开标公示
   opened: {
      releaseTime: { type: Date }, //发布时间
      files: [{
         title: { type: String },
         fileName: { type: String },
         path: { type: String }
      }]
   },
   // 评标公示
   evaluation: {
      releaseTime: { type: Date },
      // 评标报告文件
      files: [{
         releaseTime: { type: String }, //发布时间
         serialNumber: { type: Number },// 序号
         fileName: { type: String },
         path: { type: String }
      }],
      // 随机抽取评委名单
      randomList: [{
         name: { type: String },// 评委名称
         type: { type: String },// 评标类型
         profession: { type: String },// 专业
         company: { type: String },// 工作单位
      }],
      // 特邀评委、甲方代表、其他
      invitedList: [{
         name: { type: String },// 评委名称
         type: { type: String },// 评标类型
         profession: { type: String },// 专业
         company: { type: String },// 工作单位
         judgesType: { type: String },// 评委类型
      }]
   },
   //定标结果公示
   picketage: {
      releaseTime: { type: Date }, //发布时间
      picketageName: { type: String }, //公告名称
      picketageTime: { type: Date }, //定标时间
      tenderCandidate: { type: String }, //中标候选人
      finalistsMethod: { type: String }, //入围方式
      calibrationMethod: { type: String }, //定标方式
      contactPerson: { type: String }, //联系人
      contactPhone: { type: String }, //联系电话
      // 票决
      voteTitle: String,// 标题
      votePicketage: [{
         number: String, // 编号
         company: String, // 公司
         score: String, // 得票数
         ranking: String // 排名
      }],
      // 抽签
      ballotTitle: String,// 标题
      ballotPicketage: [{
         number: String, // 序号
         company: String, // 公司
         score: String, // 投标时间
         ranking: Boolean // 中标候选人
      }],
      // 排名
      rankTitle: String,// 标题
      rankPicketage: [{
         number: String, // 序号
         company: String, // 公司
         winNumber: String, // 取胜次数
         rank: String // 排名
      }],
      // 附件
      files: [{
         title: { type: String },
         fileName: { type: String },
         path: { type: String }
      }]
   },
   //中标结果公示
   winningBid: {
      releaseTime: { type: Date }, //发布时间
      startTime: { type: Date }, //公示开始时间
      endTime: { type: Date }, //公示结束时间
      winningBidder: { type: String }, //中标人
      winningBidPrice: { type: String }, //中标价
      constructionPeriod: { type: String }, //中标工期
      manager: { type: String }, //项目经理
      quaLevel: { type: String }, //资格等级
      quaCertificate: { type: String }, //资格证书
      isProvisionalPrice: { type: String }, //是否暂定金额
      files: [{
         title: { type: String },
         fileName: { type: String },
         path: { type: String }
      }],
      remarks: { type: String }, //备注
   },
   //会议信息
   meeting: [{
      meetingType: { type: String },
      meetingTime: { type: Date },
      meetingAddress: { type: String }
   }],
   //延期变更公示
   change: [{
      releaseTime: Date, //变更时间
      changeType: String, //变更类型
      title: String, //变更标题
      content: String, //变更内容
      //变更文件
      files: [{
         title: { type: String },
         fileName: { type: String },
         path: { type: String }
      }]
   }],
   //资审及业绩公示
   qualificationAuditAndPerformance: {
      startTime: { type: Date }, //公示开始时间
      endTime: { type: Date }, //公示结束时间
      publicityContent: { type: String },//公示环节
      //报名结果及业绩文件
      publicityFiles: [{
         companyName: String,// 单位名称
         qualificationFile: { fileName: { type: String }, path: { type: String } },// 资格文件
         qualificationUrl:String,
         rerformanceUrl:String,
         rerformanceFile: { fileName: { type: String }, path: { type: String } },// 业绩文件
         reviewResults: String,// 审查结果
         reasonsFailure: String,// 不合格原因
      }],
      //附件
      files: [{
         title: { type: String },
         fileName: { type: String },
         path: { type: String }
      }]
   },
   //投标文件格式
   tenderFilesFormat: [{
      fileName: { type: String },
      path: { type: String }
   }],
   //附加
   review: { type: Boolean }, //审核
   source: { type: String }, //信息来源
   allowBuy: { type: Boolean, default: true }, //是否允许购买
   cannotBuyTips: { type: String }, //不能购买原因
   allowBuybasicAccount: { type: Boolean, default: false }, //是否允许购买基本户保函
   guaranteeAmount: { type: Number }, //保函金额
   operator: { type: String }, // 后台操作员
   version: { type: String }, // 版本号（区分旧版和新版用户）
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
})

module.exports = Mongoose.model('Tender', tender, 'tender')