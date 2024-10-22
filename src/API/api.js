import API from "./apiConfig";
import uploadAPI from "./uploadApiConfig";

export default {

    apiTesting() {
        return API.get('/api');
    },
    saveForm(formData){
        return API.post('/saveForm', {formData});
    },
    uploadDocument(formData) {
        return uploadAPI.post('/upload', formData);
    },
    getFormByMobileNumber(data){
        return API.post('/getFormByMobileNumber', {data});
    },
    addOrUpdateAdmin(formData){
        return API.post('/addOrUpdateAdmin', {formData})
    },
    getAdmins(){
        return API.get('/getAdmins')
    },
    getFrom(data){
        return API.post(`/getFrom`, {data})
    },
    updateFormStatus(data){
        return API.post('/updateFormStatus', {data})
    },
    countStatus(user){
        return API.post('countStatus', {user});
    },
    saveToMaster(data, user){
        return API.post('saveToMaster', {data, user});
    },
    getMaster(data){
        return API.post('getMaster', {data});
    },
    postMonthlyReport(data, month, amountPerLitter, approveBy){
        return API.post('postMonthlyReport', {data, month, amountPerLitter, approveBy});
    },
    updateMonthlyReport(data, month, amountPerLitter, approveBy){
        return API.post('updateMonthlyReport', {data, month, amountPerLitter, approveBy});
    },
    getMasterWithReport(month, district, user){
        return API.post('getMasterWithReport', {month, district, user});
    },
    getMonthlyReport(month){
        return API.post('getMonthlyReport', {month});
    },
    getRangeSubsidy(from, to, id, role){
        return API.post('getRangeSubsidy', {from, to, id, role});
    },
    individualMonthlyReport(formData){
        return API.post('individualMonthlyReport', {formData})
    },
    getIndividualMonthlyReport(id){
        return API.post('getIndividualMonthlyReport', {id})
    },
    saveGrievance(data){
        return API.post('saveGrievance', {data})
    },
    getGrievance(data){
        return API.post('getGrievance', {data})
    },
    // createDCS
    createDCS(formData, user){
        return API.post('/createDCS', {formData, user})
    },
    getAllDCS(user){
        return API.post('/getAllDCS', {user})
    },
    getApplicationStatisticsData_DistrictWise(selectedDistrict){
        let param = {
            disctrict: selectedDistrict
        }
        return API.post('/getApplicationStatisticsData_DistrictWise', {param})
    },
    getApplicationStatisticsData_DCSWise(selectedDCS){
        let param = {
            dcs: selectedDCS
        }
        return API.post('/getApplicationStatisticsData_DCSWise', {param})
    },
    getAllDCS_DistrictWise(selectedDistrict){
        let param = {
            disctrict: selectedDistrict
        }
        return API.post('/getAllDCS_DistrictWise', {param})
    },
    createFarmer(formData){
        return API.post('/createFarmer', {formData})
    },
    getAllFarmers(dsc, user, limit, offset){
        return API.post('/getAllFarmers', {dsc, user, limit, offset})
    },
    searchFarmer(search){
        return API.post('/searchFarmer', {search})
    },
    dcsData(){
        return API.post('/dcsData')
    },
    getDocuments(data){
        return API.post('/getDocuments', {data})
    },
    uploadDaybook(formData) {
        return uploadAPI.post('/uploadDaybook', formData);
    },
    createFolder(data){
        return API.post('/createFolder', {data})
    },
    uploadDocuments(formData) {
        return uploadAPI.post('/uploadDocuments', formData);
    },
    getFillDocuments(ref_id){
        return API.post('/getFillDocuments', {ref_id})
    },
    updateDocuments(data){
        return API.post('/updateDocuments', {data})
    },
    

    




    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    },


    // Payment 

    createBeneficiary(data) {
        return API.post('/createBeneficiary', { data });
    },

    viewBeneficiary(data) {
        return API.post('/viewBeneficiary', { data });
    }


}