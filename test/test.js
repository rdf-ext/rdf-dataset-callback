/* global describe, it */

const assert = require('assert')
const rdf = require('rdf-ext')
const spec = require('rdf-dataset-abstract/test')
const CallbackDataset = require('..')

describe('CallbackDataset', () => {
  const quadA = rdf.quad(
    rdf.namedNode('http://example.org/subject'),
    rdf.namedNode('http://example.org/predicate'),
    rdf.literal('a'))

  const quadB = rdf.quad(
    rdf.namedNode('http://example.org/subject'),
    rdf.namedNode('http://example.org/predicate'),
    rdf.literal('b'))

  describe('spec', () => {
    const datasetFactory = quads => {
      return new CallbackDataset(rdf.dataset(quads), rdf.dataset)
    }

    spec(datasetFactory)
  })

  describe('added callback', () => {
    it('should be assign from constructor', () => {
      const callback = () => {}

      const dataset = new CallbackDataset(rdf.dataset(), rdf.dataset, {
        added: callback
      })

      assert.equal(dataset.callbacks.added, callback)
    })

    it('should be called when a new quad was added', () => {
      const added = []

      const dataset = new CallbackDataset(rdf.dataset(), rdf.dataset, {
        added: quad => {
          added.push(quad)
        }
      })

      dataset.add(quadA)

      assert.equal(added.length, 1)
      assert(quadA.equals(added[0]))
    })
  })

  describe('removed callback', () => {
    it('should be assign from constructor', () => {
      const callback = () => {}

      const dataset = new CallbackDataset(rdf.dataset(), rdf.dataset, {
        removed: callback
      })

      assert.equal(dataset.callbacks.removed, callback)
    })

    it('should be called when an existing quad was removed', () => {
      const removed = []

      const dataset = new CallbackDataset(rdf.dataset(), rdf.dataset, {
        removed: quad => {
          removed.push(quad)
        }
      })

      dataset.add(quadA)
      dataset.add(quadB)
      dataset.remove(quadA)

      assert.equal(removed.length, 1)
      assert(quadA.equals(removed[0]))
    })
  })
})
