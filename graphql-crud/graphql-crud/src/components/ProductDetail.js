import React, { Component, Fragment } from 'react';
import axios from 'axios';

const endPoint = axios.create({
    baseURL : 'http://test.recruit.croquis.com:28500/',
    headers : {
        'Content-Type' : 'application/json',
        'Croquis-UUID' : '00000000-0000-0000-0000-000000000000'
    }
});


class ProductDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            productDetail : {}
        }
        
    }
    
    componentWillMount(){
        if(!this.props.productId){
            alert('잘못된 접근입니다.');
            return this.props.history.push('/');
        }
        this.getProdcutDetail();
    }
    getProdcutDetail = async() =>{
        const id = 26;

        const product_query = `query($id:ID!){
            product(id: $id){
              id
              name_ko
              name_en
              description_ko
              description_en
              price
              supplier{
                name
              }
              date_created
              date_updated
            }
          }`;
        const detailData = await endPoint.post('',{
            query : product_query,
            variables : { id }
        });
        console.log('detailData', detailData);
        this.setState({
            productDetail : detailData.data.data.product
        });
    }
  render() {
    return (
      <Fragment>
          hi
      </Fragment>
    );
  }
}

export default ProductDetail;
