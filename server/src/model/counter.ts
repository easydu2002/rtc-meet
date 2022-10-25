import { Model, model, Schema } from 'mongoose'

interface ICounter {
  _id: string
  count: number
}

interface ICounterModel extends Model<ICounter> {
  getNextSequenceValue: (sequenceName: string, defaultValue?: number) => Promise<number>
}

const counter = new Schema<ICounter, ICounterModel>({
  _id: String,
  count: { type: Number, required: true }
}, { _id: false })

counter.statics.getNextSequenceValue = async function (sequenceName: string, defaultValue = 10000): Promise<number> {
  return await this.findByIdAndUpdate(sequenceName, { $inc: { count: 1 } }, { new: true })
    .then(async result => {
      if (result == null) {
        const model = new CounterModel({
          _id: sequenceName,
          count: defaultValue
        })
        await model.save()
        return defaultValue
      }
      return result.count
    })
    .catch((err) => {
      throw Error(err)
    })
}

const CounterModel = model<ICounter, ICounterModel>('counter', counter)

export default CounterModel
