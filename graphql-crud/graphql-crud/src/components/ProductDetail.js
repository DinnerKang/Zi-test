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
            productDetail : {
              id:'',
              name_ko: '',
              name_en: '',
              description_ko: '',
              description_en: '',
              price: '',
              supplier: {
                name: ''
              },
              date_created: '',
              date_updated: '',
            }
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
        this.setState({
            productDetail : detailData.data.data.product
        });
    }
    changeDateFormat = (date) =>{
      if(date){
        const Year = new Date(date).getFullYear();
        const Month = new Date(date).getMonth() +1;
        const Day = new Date(date).getDate();
        const Hour = new Date(date).getHours();
        return `${Year}년 ${Month}월 ${Day}일 ${Hour}시`
      }
    }
  render() {
    return (
      <Fragment>
          <section>
            <article>
              <div>
                <ul>
                  <li>
                    상품 ID : {this.state.productDetail.id}
                  </li>
                  <li>
                    상품 이름(한) : {this.state.productDetail.name_ko}
                  </li>
                  <li>
                    상품 이름(영) : {this.state.productDetail.name_en ? this.state.productDetail.name_en : '미입력'}
                  </li>
                  <li>
                    상품 설명(한) : {this.state.productDetail.description_ko ? this.state.productDetail.description_ko  : '미입력'}
                  </li>
                  <li>
                    상품 설명(영) : {this.state.productDetail.description_en ? this.state.productDetail.description_en : '미입력'}
                  </li>
                  <li>
                    상품 가격 : {this.state.productDetail.price}
                  </li>
                  <li>
                    상품 공급사 : {this.state.productDetail.supplier.name}
                  </li>
                  <li>
                    상품 최초 생성일 : {this.changeDateFormat(this.state.productDetail.date_created)}
                  </li>
                  <li>
                    상품 최종 수정일 : {this.changeDateFormat(this.state.productDetail.date_updated)}
                  </li>
                </ul>
              </div>
            </article>
          </section>
      </Fragment>
    );
  }
}

export default ProductDetail;
