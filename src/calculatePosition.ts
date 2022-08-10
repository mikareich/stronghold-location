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
   * Berechnet einfache Schnittstelle zweier Messungsgeraden.
   * @param measurement1 Messung 1
   * @param measurement2 Messung 2
   * @returns Schnittstelle zweier Messungsgeraden
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

  // vergleiche alle messungen und ermittle durchschnitt
  let x_avg = 0
  let z_avg = 0
  for (let m1Index = 0; m1Index < measurements.length; m1Index += 1) {
    const measurement1 = measurements[m1Index]
    for (
      let m2Index = m1Index + 1;
      m2Index < measurements.length;
      m2Index += 1
    ) {
      const measurement2 = measurements[m2Index]
      const x = schnittstelle(measurement1, measurement2)
      const z = funktionsschar(measurement1, x)
      x_avg += (2 * x) / (measurements.length * (measurements.length - 1))
      z_avg += (2 * z) / (measurements.length * (measurements.length - 1))
    }
  }

  return { x: Math.round(x_avg), z: Math.round(z_avg) }
}

export default calculatePosition
