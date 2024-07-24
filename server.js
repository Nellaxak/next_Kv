var express = require('express');
//var serveStatic = require('serve-static');
var cors = require('cors');
var { Server } = require('socket.io');
var { createRxDatabase, addRxPlugin } = require('rxdb');
var { getRxStorageMemory } = require('rxdb/plugins/storage-memory')
var { RxDBUpdatePlugin } = require('rxdb/plugins/update');

addRxPlugin(RxDBUpdatePlugin);

const app = express();
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Content-Type'
  );
  //console.log('zaxq', req.path)
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
var port = 3456;
var hostname = '127.0.0.1';
//let controller = new AbortController();
let recordShema
let db

const expressServer = app.listen(port, hostname, async () => {
  db = await createRxDatabase({
    name: 'exampledb',
    storage: getRxStorageMemory(),
    ignoreDuplicate: true,
    eventReduce: true,
  });
  recordShema = {
    title: 'records',
    type: 'array',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', maxLength: 100 },
      name: { type: 'string', maxLength: 100 },
      calc: { type: 'string', maxLength: 100 },
      links: { type: 'object' },
      absolute_magnitude_h: { type: 'number' },
      estimated_diameter: { type: 'object' },
      is_potentially_hazardous_asteroid: { type: 'boolean' },
      close_approach_data: { type: 'array' },
      is_sentry_object: { type: 'boolean' },
      sentry_data: { type: 'string', maxLength: 100 },
      dateReq: { type: 'string', maxLength: 100 },
      result_distance: { type: 'number' },
      danger: { type: 'number' },
      km_moon: { type: 'number' },
      idView: { type: 'string', maxLength: 100 },
      dateView: { type: 'string', maxLength: 100 },
      diameterView: { type: 'string', maxLength: 100 },
      dangerView: { type: 'string' },
      dateSort: { type: 'number' },
    },
  }
  await db.addCollections({
    records: {
      schema: recordShema,
    },
  });
  console.log('listen', port);
});
const io = new Server(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
})
const newList = []

async function elem(e) {
  //const sent = new Date(2024, 9, 1);
  const date = new Date(e.close_approach_data[0].epoch_date_close_approach)
  const dateSort =
    e.close_approach_data[0].close_approach_date
  const miss = e.close_approach_data[0].miss_distance
  const km = Math.round(Number(miss.kilometers))
  const moon = Math.round(Number(miss.lunar))
  let diameterMeter
  try {
    diameterMeter = e.estimated_diameter.meters.estimated_diameter_max;
  }
  catch {
    diameterMeter = 0
  }
  const roundDiameter = Math.round(diameterMeter)
  const options = {
    /*era: 'long',*/
    year: 'numeric',
    month: 'short',//long
    day: 'numeric',
    // weekday: 'long',
    timeZone: "UTC",
    //hour12: false,
    /*hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'*/
  };
  const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
  //console.log('sent', new Intl.DateTimeFormat("ru-RU", options).format(sent))
  const datSlice = prevDate.slice(0, -2)
  const dat = datSlice.replace('.', '');
  const ru = new Intl.NumberFormat("ru", { style: "unit", unit: "kilometer", unitDisplay: "short" }).format(km);
  const ruNumber = new Intl.NumberFormat("ru", { style: "decimal" }).format(moon);
  let map = new Map();
  map.set(/0|[5-9]$/, ["ых", ""]);
  map.set(/[2-4]$/, ["ые", "ы"]);
  map.set(/\d?[1][0-9]$/, ["ых", ""]);//10,11-19
  map.set(/\d?[1-9][0]{1,9}$/, ["ых", ""]);//20-90,100-900
  map.set(/[1]$/, ["ая", "а"]);

  const rootMoon = "лунн"
  const rootOrbit = "орбит"
  let fullResult = ''
  map.forEach((value, key) => {
    const result = ruNumber.match(key)
    if (result !== null) {
      fullResult = rootMoon + value[0] + " " + rootOrbit + value[1]
    }
  })
  const ruMoon = ruNumber + " " + fullResult
  const ruDiameter = new Intl.NumberFormat("ru", { style: "unit", unit: "meter", unitDisplay: "short" }).format(roundDiameter);
  let danger = ''
  if (e.is_potentially_hazardous_asteroid) {
    danger = 'Опасен'
  }
  const objMain = {
    ...e,
    danger: 0,
    dateReq: dat,
    result_distance: ru,
    km_moon: 1,
    idView: e.id,
    diameterView: 'Ø ' + ruDiameter,
    dangerView: danger,
    dateSort: dateSort,
  }
  const objMoon = {
    ...e,
    id: String(e.id) + '_',
    danger: 0,
    dateReq: dat,
    result_distance: ruMoon,
    km_moon: 0,
    idView: e.id,
    diameterView: 'Ø ' + ruDiameter,
    dangerView: danger,
    dateSort: dateSort,
  }
  newList.push(objMain)
  newList.push(objMoon)
  /*return new Promise((resolve) => {
    resolve(objMain, objMoon)
  })*/
}
class Counter {
  constructor(socket) {
    this.count = 0;
    this.socket = socket;
  }
  Success(result) {
    // console.log('result', result.success.length)
    //console.log('err res', result.error)
    if (result.success.length > 0) {
      this.socket.emit('page', this.count)
      this.count++
    }
  }
  async CalcData() {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + this.count);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + this.count);
    //console.log('myDate', currentDate, endNext)
    let startDate = currentDate.getFullYear() + '-' +
      (currentDate.getMonth() + 1) + '-' +
      currentDate.getDate();
    let endDate = tomorrow.getFullYear() + '-' +
      (tomorrow.getMonth() + 1) + '-' +
      tomorrow.getDate();
    //console.log('return data', startDate, endDate)
    return new Promise((resolve) => {
      resolve([startDate, endDate])
    })
    //return { startDate, endDate }
  }
}

io.on('connection', (socket) => {
  socket.on('stop', () => {
    console.log('ws server stop')
    //controller.abort()
  })
  let count = new Counter(socket)
  socket.on('addPage', async () => {
    //console.log('ws server add page')
    let startDate
    let endDate
    [startDate, endDate] = await count.CalcData()
    //console.log('dates fetch', startDate, endDate)
    try {
      const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
      //console.log('status34', resp.status)
      const data = await resp.json()
      //console.log('data', data.element_count)
      const list = data.near_earth_objects
      const dates = Object.keys(list)
      const arrObjects = Object.values(list)
      await Promise.all(arrObjects[0].map(
        async (e) => elem(e, dates[0])
      ));
      const result = await db.records.bulkInsert(newList)
      count.Success(result)
    } catch (err) {
      console.log('err fetch', err)
    }
  })
  socket.on('patch', async (data) => {
    //console.log('patch id', data)
    let ids
    if (data.includes('_')) {
      const newData = data.slice(0, data.length - 1)
      ids = [newData, data]
    }
    else {
      ids = [data, data + '_']
    }
    //console.log('patch ids', ids)
    const query = await db.records.findByIds(ids)
    const changeRecord = await query.exec()
    for (let elem of changeRecord.entries()) {
      //console.log('ids', elem);
      const oldStatus = elem[1].danger
      await elem[1].incrementalPatch(
        {
          danger: Number(!oldStatus)
        }
      );
      //console.log('new status', elem[1].danger)
    }
  })
  socket.on('clear', async () => {
    console.log('clear')
    const query = db.records.find({
      selector: {
        danger: 1
      }
    })
    await query.remove();
    socket.emit('cleared')
  })
})
var corsOptions = {
  origin: '*',
};
app.use(
  express.json({ type: ['application/json', 'text/plain'] }),
  cors(corsOptions)
);

app.get('/', cors(corsOptions), async (req, res, next) => {
  const queryRes = await db.records.find({
    selector: {
      km_moon: 1
    },
    sort: [
      { dateSort: 'asc' }
    ],
  })
  //try {//build
  const tasks = await queryRes.exec()
  res.send(tasks);
  /*}
  catch (e) { }*/
});
app.get('/main', cors(corsOptions), async (req, res, next) => {
  const queryRes = await db.records.find({
    selector: {
      km_moon: 1
    },
    sort: [
      { dateSort: 'asc' }
    ],
  })
  //try {//build
  const tasks = await queryRes.exec()
  res.send(tasks);
  /*}
  catch (e) { }*/
});
app.get('/basket', cors(corsOptions), async (req, res, next) => {
  const query = db.records.find({
    selector: {
      danger: 1,
      km_moon: 1
    },
    sort: [
      { id: 'asc' }
    ]
  }
  )
  const tasks = await query.exec()
  //console.log('basket', tasks)
  res.send(tasks);
});
app.get('/detail', cors(corsOptions), async (req, res, next) => {
  //console.log('get detail', req.query.id)
  const id = req.query.id
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  console.log('status34', resp.status)
  const data = await resp.json()
  //console.log('detail length', data.close_approach_data)
  const ids = [req.query.id]
  const query = await db.records.findByIds(ids)
  const changeRecord = await query.exec()
  const item = changeRecord.get(req.query.id)
  //console.log('item', item._data)
  let { name,
    estimated_diameter,
    is_potentially_hazardous_asteroid }
    = item._data
  const header =
  {
    'name': name,
    'estimated_diameter': estimated_diameter.meters.estimated_diameter_max,
    'is_potentially_hazardous_asteroid': is_potentially_hazardous_asteroid
  };
  res.send([header, data.close_approach_data]);
})
app.get('/moon', cors(corsOptions), async (req, res, next) => {
  //console.log('server get /moon', req.path)
  const queryRes = db.records.find({
    selector: {
      km_moon: 0
    },
    sort: [
      { dateSort: 'asc' }
    ]
  })
  const tasks = await queryRes.exec()
  res.send(tasks);
});
app.get('/count', cors(corsOptions), async (req, res, next) => {
  const queryCount = db.records.count({
    selector: {
      danger: 1
    }
  });
  const countPrev = await queryCount.exec()
  const count = countPrev / 2
  //res.set('category-h', 'count')
  //res.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  res.send({ count });
});