import axios from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;
