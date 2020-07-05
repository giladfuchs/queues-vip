const {
  error422,
  error404,
  error403Admin
} = require("../../utils/error/dbErrorHandler");
const Service = require("../../models/service.model");
const Employee = require("../../models/employee.model");
const { matrix, parseJsonMongo } = require('./queue.helper.controller')

exports.setServiceToQueue = async (req, res, next) => {
  try {

    const servicesListOfNewQueue = req.body;
    const isValid = Object.keys(servicesListOfNewQueue).reduce((acc, index) => acc + servicesListOfNewQueue[index], 0)
    error404(isValid)

    const services = await Service(req.mongo).find({ available: true });
    const employee = await Employee(req.mongo).findOne();

    const timeDistance = employee.otherData.timeDistance

    const ans = await matrix(next, parseJsonMongo(employee.schedule), req.mongo, services, timeDistance, servicesListOfNewQueue);
    const mat = ans.mat;
    const days = ans.days
    const startMinTime = ans.startMinTime;
    const durationOfNewQueue = ans.durationOfNewQueue;
    const price = ans.price;

    error404(ans);
    res.status(201).json({
      msg: "all the queues",
      mat,
      days,
      startMinTime,
      timeDistance,
      durationOfNewQueue,
      price
    });
  } catch (error) {
    return next(error);
  }
};
















exports.postQueue = async (req, res, next) => {
  try {
    // error422(req);

    const Queue = require("../../models/queue.model")(req.mongo);

    // error403Admin(req);
    console.log(req.body);


    const queue = new Queue({ ...req.body });
    await queue.save();

    res.status(201).json({
      msg: "create new queue",
      queue,
    });
  } catch (err) {
    console.log(err);

    return next(err);
  }
};


















exports.getQueues = async (req, res, next) => {
  try {
    error422(req);
    const Queue = require("../../models/queue.model")(req.mongo);



    const ff = await Queue.find()
      .populate("clientId").populate("serviceId").exec();

    // const f = await Service.findOne(ff.serviceId);
    const f = await queue.populate("clientId")
      .execPopulate()
    console.log(ff.serviceId, ff);


    error404(queue)
    res.status(205).send({
      message: "queue update",
      queue: queue,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteQueue = async (req, res, next) => {
  try {
    const queueId = req.get("_id");


    const Queue = require("../../models/queue.model")(req.mongo);

    await error403Admin(req);

    await Queue.findByIdAndDelete(queueId);
    res.status(200).json({ message: "queue deleted" });
  } catch (err) {
    return next(err);
  }
};
