'use strict'

const tape = require('tape')
const lines = require('.')
const isString = require('lodash.isstring')
const isNumber = require('lodash.isnumber')

tape('mdv-lines', (t) => {
	t.ok(lines.length >= 10, 'length')
	for(let line of lines){
		t.ok(isString(line.name) && line.name.length > 0, `line ${line.name} name`)
		t.ok(isNumber(line.easygoId) && line.easygoId >= 0, `line ${line.name} easygoId`)
		t.ok(isString(line.operator) && line.operator.length > 0, `line ${line.name} operator`)
		t.ok(!line.color || (isString(line.color) && line.color.length === 7), `line ${line.name} color`)
		t.ok(['train', 'bus'].includes(line.mode), `line ${line.name} mode`)
		t.ok(isString(line.subMode) && line.subMode.length > 0, `line ${line.name} subMode`)
	}
	t.end()
})
