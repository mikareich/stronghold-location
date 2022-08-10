import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import Calculator from './Calculator'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <div className="">
      <div className="prose dark:prose-invert container mx-auto p-10">
        <h1>Strongholds in Minecraft</h1>
        <p>
          Hast du schon mal Minecraft durchgespielt? Dann hast du wahrscheinlich
          auch schon mal einen Stronghold gesucht und weißt, wieviel arbeit das
          ist. Aber wusstest du, dass du Strongholds in Minecraft auch mit ein
          bisschen Mathematik und deutlich weniger Arbeit finden kannst?
        </p>
        <hr />
        <h2>Was musst du machen?</h2>
        <p>
          Alles was du dafür brauchst, sind mindestens <b>zwei Enderaugen</b>.
          Diese wirfst du aus zwei <b>unterschiedlichen Positionen</b>, um
          anschließend sowohl die Positionen, als auch <b>die Richtungen</b> der
          Enderaugen hier einzutragen. Anschließend berechen wir mit den
          angegebenen Daten die Position des Strongholds, in das die Enderaugen
          dich führen wollen.
        </p>
        <br />
        <Calculator />
        <h2>Wie funktioniert das?</h2>
        <p>Mathe.</p>
        <hr />
        <a href="https://github.com/mikareich">Mika Reich</a>
      </div>
    </div>
  </React.StrictMode>
)
