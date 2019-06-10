import 'reset.css/reset.css'
import 'leaflet/dist/leaflet.css'

import React from 'react'
import ReactDOM from 'react-dom'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import { container, context as DiContext } from './di'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import { EventDispatcher, AppEventListener } from './domain/events/Dispatcher'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

// Register events handlers
const eventDispatcher = container.resolve<EventDispatcher>('eventDispatcher')
const onCommentAdded = container.resolve<AppEventListener>('onCommentAdded')

eventDispatcher.listen(onCommentAdded)

ReactDOM.render(
  <DiContext.Provider value={() => container}>
    <App />
  </DiContext.Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
