import '@testing-library/jest-dom'
import { h } from 'preact'

process.env.API_KEY = 'tatum_key'
global.h = h
