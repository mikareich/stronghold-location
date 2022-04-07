import React, { useEffect } from 'react';

import calculatePosition, { Coordinate, Meseasurement } from './calculatePosition';

const inputClassName = 'border-b py-2 px-4 mb-4 w-full'

function Calculator() {
  const [measurements, setMeasurements] = React.useState<Meseasurement[]>([
    { x: NaN, z: NaN, direction: NaN },
    { x: NaN, z: NaN, direction: NaN },
  ])
  const [result, setResult] = React.useState<Coordinate | null>(null)

  const copyResult = () =>
    navigator.clipboard.writeText(`${result!.x} ~ ${result!.z}`)

  const updateMeasurement = (
    index: number,
    key: keyof Meseasurement,
    value: string
  ) => {
    const newMeasurements = [...measurements]
    newMeasurements[index][key] = parseFloat(value)
    setMeasurements(newMeasurements)
  }

  const addMeasurement = () =>
    setMeasurements([
      ...measurements,
      {
        x: NaN,
        z: NaN,
        direction: NaN,
      },
    ])

  useEffect(() => {
    try {
      const { x, z } = calculatePosition(measurements)
      if (!Number.isNaN(x) && !Number.isNaN(z)) setResult({ x, z })
      else setResult(null)
    } catch (error) {
      setResult(null)
    }
  }, [measurements])

  return (
    <form className="border p-5 pt-2">
      {/* Info-text */}
      <p>
        Gebe die <b>X- und Z-Koordinate</b> und die <b>Richtung</b> des
        Enderauges ein. Um alle Informationen zu erhalten, kannst du in
        Minecraft mit <code>f3</code> den Debug-Bildschirm anzeigen lassen.
      </p>
      {/* Berechnung */}
      {measurements.map((measurement, index) => (
        <div key={index} className="mb-4">
          <div className="flex gap-2">
            <input
              type="number"
              className={inputClassName}
              placeholder="x"
              value={!Number.isNaN(measurement.x) ? measurement.x : ''}
              onChange={(e) => updateMeasurement(index, 'x', e.target.value)}
            />
            <input
              type="number"
              className={inputClassName}
              placeholder="z"
              value={!Number.isNaN(measurement.z) ? measurement.z : ''}
              onChange={(e) => updateMeasurement(index, 'z', e.target.value)}
            />
            <input
              type="number"
              className={inputClassName}
              placeholder="Richtung"
              value={
                !Number.isNaN(measurement.direction)
                  ? measurement.direction
                  : ''
              }
              onChange={(e) =>
                updateMeasurement(index, 'direction', e.target.value)
              }
            />
          </div>
        </div>
      ))}
      {/* Ergebnisse */}
      {result && (
        <div>
          <p>
            Die Festung befindet sich bei <b>X: {result.x} </b> und{' '}
            <b>Z: {result.z}</b>
          </p>
          <button
            type="button"
            className="text-black underline"
            onClick={copyResult}
          >
            📋 Kopiere Position
          </button>
        </div>
      )}
      <button
        type="button"
        className="text-black underline"
        onClick={addMeasurement}
      >
        Neue Messung hinzufügen
      </button>
    </form>
  )
}

export default Calculator
