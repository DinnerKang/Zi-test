import React, { Component, Fragment } from 'react';
import './ProductDetail.css';
import { endPoint } from '../service/Product';


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
            },
            updateView: false
        }
        
    }
    
    componentWillMount(){
        if(!this.props.productId.length){
            alert('잘못된 접근입니다.');
            return this.props.history.push('/');
        }
        this.getProdcutDetail();
    }

    // 상품 상세 목록 호출
    getProdcutDetail = async() =>{
        const id = this.props.productId;
        const product_query = `
          query($id:ID!){
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

          try{
            const detailData = await endPoint.post('',{
              query : product_query,
              variables : { id }
            });
            this.setState({
                productDetail : detailData.data.data.product
            });
          }catch(e){
            console.log(e);
          }
    }

    // 날짜 포멧 변경
    changeDateFormat = (date) =>{
      if(date){
        const changeDate = new Date(date);
        const Year = changeDate.getFullYear();
        const Month = changeDate.getMonth() +1;
        const Day = changeDate.getDate();
        return `${Year}년 ${Month}월 ${Day}일`
      }
    }

    // 상품 삭제
    deleteProduct = async() =>{
      const id = this.state.productDetail.id;
      const deleteProduct_query =`
        mutation($id:ID!){
          deleteProduct(input:{id:$id}){
            id
            name_ko
          }
        }
      `;
      try{
        await endPoint.post('',{
          query : deleteProduct_query,
          variables : { id }
        });
        alert('삭제 완료');
        this.props.history.push('/');
      }catch(e){
        console.log(e);
        alert('삭제 실패');
      }
    }

    showUpdateView = () =>{
        this.setState({
          updateView : !this.state.updateView
        })
    }

    // 상품 업데이트
    updateProduct = async() =>{
        const id = this.state.productDetail.id;
        const name_ko = this.refs.name_ko.value;
        const name_en = this.refs.name_en.value;
        const description_ko = this.refs.description_ko.value;
        const description_en = this.refs.description_en.value;
        const price = Number(this.refs.price.value);

        const updateProduct_query =`
              mutation($id:ID!, $name_ko:String!, $name_en:String!, $description_ko:String!, $description_en:String!, $price:Int!){
                updateProduct(input:{id:$id, name_ko:$name_ko, name_en:$name_en, description_ko:$description_ko, description_en:$description_en, price:$price}){
                  id
                  name_ko
                  name_en
                }
              }`;

        try{
          await endPoint.post('',{
            query : updateProduct_query,
            variables : { id, name_ko, name_en, description_ko, description_en, price }
          });
          alert('수정 완료');
          this.setState({
            updateView : false
          });
          this.getProdcutDetail();
        }catch(e){ 
          console.log(e);
        }

    }
    
  render() {
    if(!this.state.updateView){
      return(
        <Fragment>
          <section>
            <article  className="detail_container">
              <div  className="detail_area">
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
                <div className="btn_area">
                  <input type="button"  className="btn detail_btn" value="수정" onClick={this.showUpdateView}/>
                  <input type="button" className="btn detail_btn" value="삭제" onClick={this.deleteProduct}/>
                </div>
              </div>
            </article>
          </section>
        </Fragment>
      );
    }else{
      return (
        <Fragment>
            <section>
              <article  className="detail_container">
                <div  className="detail_area">
                  <ul>
                    <li>
                      상품 ID : {this.state.productDetail.id}
                    </li>
                    <li>
                      상품 이름(한) : <input type="text" ref="name_ko" defaultValue={this.state.productDetail.name_ko}/>
                    </li>
                    <li>
                      상품 이름(영) : <input type="text" ref="name_en" 
                                            defaultValue={this.state.productDetail.name_en ? this.state.productDetail.name_en : '미입력'}/>
                    </li>
                    <li>
                      상품 설명(한) : <input type="text" ref="description_ko" 
                                            defaultValue={this.state.productDetail.description_ko ? this.state.productDetail.description_ko  : '미입력'}/>
                    </li>
                    <li>
                      상품 설명(영) : <input type="text" ref="description_en" 
                                            defaultValue={this.state.productDetail.description_en ? this.state.productDetail.description_en : '미입력'}/>
                    </li>
                    <li>
                      상품 가격 : <input type="number" ref="price" defaultValue={this.state.productDetail.price} />
                    </li>
                  </ul>
                  <div className="btn_area">
                    <input type="button"  className="btn detail_btn" value="완료" onClick={this.updateProduct}/>
                    <input type="button" className="btn detail_btn" value="취소" onClick={this.showUpdateView}/>
                  </div>
                </div>
              </article>
            </section>
        </Fragment>
      );
    }
  }
}

export default ProductDetail;
