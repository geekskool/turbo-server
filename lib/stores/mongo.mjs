import mongo from 'mongodb'

export default class mongoStore {
  constructor (options) {
    console.log('constructor')
    let url = options.url || 'mongodb://localhost:27017/'
    this.client = mongo.MongoClient
    this.client.connect(url, (error, db) => {
      if (error) {
        console.error('Error: MongoStore reported an error: ' + error)
      }
      this.store = db.db('session-data')
      console.log('this.store')
    })
  }

  set (hash, value) {
    console.log('set:', hash, value)
    let data = {}
    data['sess_id'] = hash
    data['data'] = value
    let obj = {}
    obj['sess_id'] = hash
    this.store.collection('sessions').replaceOne(obj, { $set: data }, { upsert: true }, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('doc updated')
      }
    })
  }

  async get (key) {
    console.log('finding:', {sess_id: key})
    let result = await this.store.collection('sessions').find({sess_id: key}).toArray()
    if (result.length >= 1) {
      console.log('result:',result)
      result = result[0]
      if (result) {
        return result['data']
      }
    }
    return null
  }

  delete (key) {
    this.store.collection('sessions').remove({ sess_id: key })
  }
}
