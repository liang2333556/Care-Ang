import axios from 'axios'

const API_URL = 'http://localhost:8899/api';

export class ChildService {
    constructor() {
    }

    getChild (familyId) {
        const url = '${API_URL}/families/{'+familyId+'}/children';
        return axios.get(url).then(response => response.data);
    }
}
