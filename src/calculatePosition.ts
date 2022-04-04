export interface Coordinate {
  x: number
  z: number
}

export interface Meseasurement extends Coordinate {
  direction: number
}

function calculatePosition(measurements: Meseasurement[]): Coordinate {
  /**
   * Winkel der Z-Achse an X-Achse orientiern.
   * @param alphaZ Winkel an Z-Achse
   * @returns Winkel an X-Achse
   */
  const wandelWinkel = (alphaZ: number) => ((90 + alphaZ) * Math.PI) / 180 // Ka aber mc hat das weird gemacht

  /** Enderaugengerade als Funktionsschar mit Punkt P und Winkel alpha. Gerade läuft durch Festung
   * @param measurement Bezogene Messung
   * @param x x-Koordinate
   */
  const funktionsschar = (measurement: Meseasurement, x: number) =>
    Math.tan(wandelWinkel(measurement.direction)) * x -
    Math.tan(wandelWinkel(measurement.direction)) * measurement.x +
    measurement.z

  /**
   * Berechnet Schnittstelle der Messungsgeraden
   * @param measurement1 Messung 1
   * @param measurement2 Messung 2
   * @returns Schnittstelle der Messungsgeraden
   */
  const schnittstelle = (
    measurement1: Meseasurement,
    measurement2: Meseasurement
  ) => {
    if (measurement1.direction === measurement2.direction)
      throw new Error('Messungen sind parallel')
    if (measurement1.x === measurement2.x && measurement1.z === measurement2.z)
      throw new Error('Messungnspositionen sind identisch')
    return (
      (Math.tan(wandelWinkel(measurement1.direction)) * measurement1.x -
        measurement1.z -
        Math.tan(wandelWinkel(measurement2.direction)) * measurement2.x +
        measurement2.z) /
      (Math.tan(wandelWinkel(measurement1.direction)) -
        Math.tan(wandelWinkel(measurement2.direction)))
    )
  }

  const [m1, m2] = measurements
  const x = Math.round(schnittstelle(m1, m2))
  const z = Math.round(funktionsschar(m1, x))

  return { x, z }
}

export default calculatePosition
