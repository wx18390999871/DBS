const areaDatas = function() {
    var self = this;
    const url = API_PATH + '/web/static-data.action';
    var areaData = {
        id: '311000' //默认杭州的区域
    };
    areaData = JSON.stringify(areaData);
    this.$axios.get(url, {
        params: {
            action: 'area',
            data: areaData
        }
    }).then(response => {
        response = response.data;
        if (response.errorCode === 0) {
            this.areaData = response.data;
            this.areaData.splice(0, 0, {
                'data-longitude': '120.13',
                'data-latitude': '30.32',
                id: '',
                name: '请选择'
            });
        } else if (response.errorCode === 1) {
            this.$router.push('/login');
        }
    });
}

const bikeTypeDatas = function() {
    var self = this;
    const url = API_PATH + '/web/static-data.action';
    var data = {};
    data = JSON.stringify(data);
    this.$axios.get(url, {
        params: {
            action: 'bicycletype',
            data: data
        }
    }).then(response => {
        response = response.data;
        if (response.errorCode === 0) {
            this.bikeTypeData = response.data;
            this.bikeTypeData.splice(0, 0, {
                name: '请选择',
                id: ''
            });
        } else if (response.errorCode === 1) {
            this.$router.push('/login');
        }
    });
}

export {areaDatas, bikeTypeDatas};