const AbstractDataset = require('rdf-dataset-abstract')

class CallbackDataset extends AbstractDataset {
  constructor (dataset, datasetFactory, callbacks) {
    super()

    this._dataset = dataset
    this._datasetFactory = datasetFactory
    this.callbacks = callbacks || {}
  }

  get length () {
    return this._dataset.length
  }

  _add (quad) {
    this._dataset.add(quad)

    if (this.callbacks.added) {
      this.callbacks.added(quad)
    }
  }

  _factory (quads) {
    return this._datasetFactory(quads)
  }

  _forEach (callback) {
    this._dataset.forEach(callback)
  }

  _remove (quad) {
    this._dataset.remove(quad)

    if (this.callbacks.removed) {
      this.callbacks.removed(quad)
    }
  }
}

module.exports = CallbackDataset
