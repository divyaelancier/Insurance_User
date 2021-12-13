import {GET_SLIDER,GET_PRODUCTS,GET_TESTIMONIAL,GET_NEWSLETTER,GET_PRODUCTS_LIST,
  GET_BRANCH_LOCATOR,GET_FAQ,GET_SETTINGS_CONTACT,GET_OFFLINE_POLICY,GET_OFFLINE_PRODUCTS,
  COMMON_UPLOAD,GET_PRODUCT_SLIDER} from '../constants/constants';
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
// import {notification} from 'antd'
  // GET apis
  export const get_Slider= () => async (dispatch) => {
    const response = await axios.get(baseUrl+"slider/allSlider");
    return dispatch({ type: GET_SLIDER, payload: response.data.response});
};

 export const get_Products= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"category/allCategory");
  return dispatch({ type: GET_PRODUCTS, payload: response.data.response});
};


  export const Get_Testimonials= () => async (dispatch) => {
    const response = await axios.get(baseUrl+"testimonial/allTestimonial");
    return dispatch({ type: GET_TESTIMONIAL, payload: response.data.response});
};


// export const get_Newsletter= () => async (dispatch) => {
//   const response = await axios.get(baseUrl+"newsLetter/allnewsLetter");
//   return dispatch({ type: GET_NEWSLETTER, payload: response.data.response});
// };

export const Get_Products=(data,buttonchange)=>async (dispatch)=>{
  try{
      const response=await axios({
          method:"POST",
          url:baseUrl+"category/getCategory",
          data:{
              "id":"",
              "category_type":buttonchange===1?"Life Policies":buttonchange===2?"Non Life Policies":data
          }
      });
      return dispatch({type:GET_PRODUCTS_LIST,payload:response.data.response})
  }
  catch (err) {

  }
}
export const get_Faq = () => async (dispatch) => {
  const response = await axios.get(baseUrl+"faq/allFaq");
  return dispatch({ type: GET_FAQ, payload: response.data.response});
};

export const Get_Branch_Locator= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"branchLocator/allBranch");
  return dispatch({ type: GET_BRANCH_LOCATOR, payload: response.data.response});
};

export const Get_Settings_News= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"newscms/allnewscms");
  return dispatch({ type: GET_NEWSLETTER, payload: response.data.response});
};

export const Get_Settings_Contact= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"contactUscms/allcontactUscms");
  return dispatch({ type: GET_SETTINGS_CONTACT, payload: response.data.response});
};

export const Get_policy= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"offline/allOffline");
  return dispatch({ type: GET_OFFLINE_POLICY, payload: response.data.response});
};


export const Get_Offline_policies=(data,buttonchange)=>async (dispatch)=>{
  try{
      const response=await axios({
          method:"POST",
          url:baseUrl+"offline/getOffline",
          data:{
              "id":"",
              "category_type":buttonchange===1?"Life Policies":buttonchange===2?"Non Life Policies":data?data:"Non Life Policies"
          }
      });
      return dispatch({type:GET_OFFLINE_PRODUCTS,payload:response.data.response})
  }
  catch (err) {

  }
}


export const CommonUpload = (data) => async (dispatch) => {
  var formData = new FormData();
  formData.append("files",data)
  const response = await axios({
    method: "post",
    url: baseUrl + "common/imagesUploads",
    data: formData,
  })
 
  return dispatch({ type: COMMON_UPLOAD, payload: response.data});
};


export const Get_Product_slider= () => async (dispatch) => {
  const response = await axios.get(baseUrl+"productslider/allSlider");
  return dispatch({ type: GET_PRODUCT_SLIDER, payload: response.data.response});
};
