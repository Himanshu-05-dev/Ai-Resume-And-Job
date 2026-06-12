const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

/**
 * - job description Schema :String
 * - resume text :String
 * - self description :String
 * 
 * -matchScore : number
 * 
 * -Technical questions :[]
 * -Behavioral questions :[]
 * -Skills gap :[]
 * -Preparation gap :[{}]
 */

const technicalQuestionsSchema = new moongose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        require:[true,"Answer is required"]
    }
},{
    _id:false
})

const behaviouralQuestionsSchema = new moongose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        require:[true,"Answer is required"]
    }
},{
    _id:false
})

const skillGapSchema = new moongose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        require:[true,"Severity is required"]
    }
},{
    _id:false
})

const PreparationPlanSchema = new moongose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:{
        type:String,
        required:[true,"task is required"]
    }
})

const interviewReportSchema =new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behaviouralQuestions:[behaviouralQuestionsSchema],
    skillsGap:[skillGapSchema],
    preparationPlan:[PreparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:[true,"title is required"]
    }
},{
    timestamps:true
})


const interviewReportModel = mongoose.model("interviewreport", interviewReportSchema);

module.exports = interviewReportModel;