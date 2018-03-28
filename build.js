'use strict'

const queue = require('queue')
const retry = require('p-retry')
const timeout = require('p-timeout')
const got = require('got')
const range = require('lodash.range')

const lines = []

const fromID = 0
const toID = 10000

const transformLine = (l) => {
    const line = {
        name: l.lineID,
        operator: l.company,
        easygoId: l.elementID,
        color: l.hexcolor ? '#'+l.hexcolor : null
    }
    if(l.lineType === 'BUS'){
        line.mode = 'bus'
        line.subMode = 'bus'
    }
    else if(l.lineType === 'STRB'){
        line.mode = 'train'
        line.subMode = 'tram'
    }
    else if(l.lineType === 'U'){
        line.mode = 'train'
        line.subMode = 'metro'
    }
    else if(l.lineType === 'RE'){
        line.mode = 'train'
        line.subMode = 'regionalExpress'
    }
    else if(l.lineType === 'RB' || l.lineType === 'OE'){ // todo
        line.mode = 'train'
        line.subMode = 'regional'
    }
    else if(l.lineType === 'S'){
        line.mode = 'train'
        line.subMode = 'suburban'
    }
    else{
        throw new Error(`unknown line type "${l.lineType}" on line ${l.lineID}, please report this error to the package maintainer!`)
    }
    return line
}

const fetch = (id) => {
    console.error(Math.round(100*(id-fromID)/(toID-fromID))+'%')
    return got.get(`https://hn1.the-agent-factory.de/easygo2/rest/regions/MDV/lines/${id}`, {json: true})
    .catch((err) => {
        if(err.statusCode === 404) return {body: null}
        else throw new Error(err)
    })
    .then(res => res.body)
}

const fetchAndSave = (id) =>
    retry(() => timeout(fetch(id), 2000), {retries: 3})
    .then((res) => lines.push(res))

const buildList = () => new Promise((resolve, reject) => {
    const ids = range(fromID, toID)
    const q = queue({autostart: true, concurrency: 16})
    for(let id of ids){
        q.push((cb) =>
            fetchAndSave(id)
            .then(() => cb())
        )
    }
    q.on('end', () => resolve(lines))
    q.on('error', reject)
})

const build = () => buildList()
.then((list) => list.filter((x) => !!x).map(transformLine))


build()
.then((list) => {process.stdout.write(JSON.stringify(list))})
.catch(console.error)
