import React, { useEffect } from 'react';

import calculatePosition, { Coordinate, Meseasurement } from './calculatePosition';

const inputClassName = 'border-b py-2 px-4 mb-4 w-full'

function Calculator() {
  const [measurements, setMeasurements] = React.useState<Meseasurement[]>([
    { x: NaN, z: NaN, direction: NaN },
    { x: NaN, z: NaN, direction: NaN },
  ])

  const [result, setResult] = React.useState<Coordinate | null>(null)

  useEffect(() => {
    try {
      const { x, z } = calculatePosition(measurements)
      if (!Number.isNaN(x) && !Number.isNaN(z)) setResult({ x, z })
      else setResult(null)
    } catch (error) {
      console.error(error)
      setResult(null)
    }
  }, [measurements])

  const updateMeasurement = (
    index: number,
    key: keyof Meseasurement,
    value: number
  ) => {
    const newMeasurements = [...measurements]
    newMeasurements[index][key] = value
    setMeasurements(newMeasurements)
  }

  return (
    <form className="border p-5 pt-2">
      {/* Info-text */}
      <p>
        Gebe die <b>X- und Z-Koordinate</b> und die <b>Richtung</b> des
        Enderauges ein. Um alle Informationen zu erhalten, kannst du mit{' '}
        <code>f3</code> die Debug-Bildschrim in Minecraft anzeigen lassen.
      </p>
      {/* Berechnung */}
      {measurements.map((measurement, index) => (
        <div key={index} className="mb-4">
          <div className="flex gap-2">
            <input
              type="number"
              className={inputClassName}
              placeholder="x"
              value={measurement.x || ''}
              onChange={(e) =>
                updateMeasurement(index, 'x', parseFloat(e.target.value))
              }
            />
            <input
              type="number"
              className={inputClassName}
              placeholder="z"
              value={measurement.z || ''}
              onChange={(e) =>
                updateMeasurement(index, 'z', parseFloat(e.target.value))
              }
            />
            <input
              type="number"
              className={inputClassName}
              placeholder="Richtung"
              value={measurement.direction || ''}
              onChange={(e) =>
                updateMeasurement(
                  index,
                  'direction',
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        </div>
      ))}
      {/* Ergebnisse */}
      {result ? (
        <p>
          Die Festung befindet sich bei <b>X: {result.x} </b> und{' '}
          <b>Z: {result.z}</b>
        </p>
      ) : (
        <p>
          Vervollständige deine Messungen, damit die Position der Festung
          berechnet werden kann.
        </p>
      )}
    </form>
  )
}

export default Calculator
