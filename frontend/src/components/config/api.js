import axios from "axios";

export const IpAddress = async ({ setLoading, setIpData }) => {
    try {
        let res = await axios.get(`http://api.ipstack.com/check?access_key=e98574de00e44fd897dc8dec454d22dd`);
        if (res) {
            setLoading(false);
            setIpData(res.data.country_name);
        }
    } catch (error) {
        alert(`IP Address Error: ${error}`);
        setLoading(false);
    }
}

export const GetCountries = async ({ setLoading, setCountries }) => {
    try {
        let res = await axios.get(`https://api.apilayer.com/number_verification/countries`,
            {
                headers: {
                    apikey: 'YsziDyek62lC0X1r5nj9X60oWMAXYpWE',
                },
            });
        if(res){
            setLoading(false);
            setCountries(res.data);
        }
    } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
    }
}

export const SendEmail = async ({fullName, email, phone, message, setSend}) => {
    try {
        const datas = {fullName, email, phone, message};
        let res = await axios.post(`http://localhost:5000/send`, datas);
        if(res){
            setSend(res.data);
        }
    } catch (error) {
        alert(error.response.data.message);
    }
}