import React, { Component, Fragment } from 'react';
import './ProductList.css';

import { endPoint } from '../service/Product';

class ProductList extends Component {

    constructor(props){
        super(props);
        this.state={
            productName : '',
            productPrice: '',
            supplierList : [],
            productList : [],
            selectSupplierId: null
        }
    }

    componentWillMount(){
        this.getSupplierList();
        this.getProductList();
    }
    
    // 상품 공급사 호출
    getSupplierList = async() =>{
        const supplier_list_query = `{
            supplier_list {
                item_list {
                    id
                    name
                }
            }
        }`;
        try{
            const supplierList = await endPoint.post('',{query : supplier_list_query});
            this.setState({
                supplierList : supplierList.data.data.supplier_list.item_list
            });
        }catch(e){
            console.log(e);
        }
    }
    // 상품 목록 호출
    getProductList = async() =>{
        const product_list_query = `{
            product_list{
                item_list{
                    id
                    name_ko
                    name_en
                    price
                    supplier{
                        name
                    }
                }
            }
        }`;
        try{
            const productList = await endPoint.post('',{query : product_list_query});
            this.setState({
                productList : productList.data.data.product_list.item_list
            });
        }catch(e){
            console.log(e);
        }
    }

    // 상품 추가
    addProduct = async() =>{
        // selectBox 선택 없을 경우 supplierList의 첫번째 id 값 부여
        const supplier = this.state.selectSupplierId ?this.state.selectSupplierId : this.state.supplierList[0].id;
        const name = this.state.productName;
        const price = Number(this.state.productPrice);
        const createProduct_query = `mutation($supplier:ID!, $name:String!, $price: Int!){
            createProduct(input:{supplier_id:$supplier,name_ko:$name,price:$price}){
                id
                name_ko
                price
            }
        }`;
        try{
            await endPoint.post('',{
                query : createProduct_query,
                variables : { supplier, name, price }
            });
            alert(`${name} 상품이 추가되었습니다.`);
            await this.getProductList();
        }catch(e){
            console.log(e);
            alert('상품 추가가 실패했습니다.');
        }
    }

    textChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    selectOption = (e) =>{
        this.setState({
            selectSupplierId : e.target.value
        })
    }
    productDetail = (id) =>{
        this.props.passId(id);
        this.props.history.push('/ProductDetail');
    }
    render() {
        return (
            <Fragment>
                <section>
                    <div className="main_container">
                        <article className="main_area">
                            <h2>상품 추가</h2>
                            <div className="option_area">
                                <select onChange={this.selectOption} className="supplier_select">
                                    {this.state.supplierList.map(
                                        (c) => <option value={c.id} key={c.id}>{c.name}</option>
                                    )}
                                </select>
                                <label className="input_label">이름 : 
                                <input type="text" className="text_input" name="productName" onChange={this.textChange}/></label>
                                <label className="input_label">가격 : 
                                <input type="number" className="text_input" name="productPrice" onChange={this.textChange}
                                       /></label>
                                <input type="button" className="btn" value="상품 추가" onClick={this.addProduct}/>
                            </div>
                        </article>
                        <article>
                            {this.state.productList.map(
                                (c) =>
                                    <div key={c.id} className="product_list_container" onClick={this.productDetail.bind(this, c.id)}>
                                        <ul >
                                            <li className="product_list">
                                                상품 ID : {c.id}
                                            </li>
                                            <li className="product_list">
                                                상품 이름(한) : {c.name_ko}
                                            </li>
                                            <li className="product_list">
                                                상품 이름(영) : {c.name_en ? c.name_en : '미입력'}
                                            </li>
                                            <li className="product_list">
                                                상품 가격 : {c.price}
                                            </li>
                                            <li className="product_list">
                                                상품 공급사 :{c.supplier.name}
                                            </li>
                                        </ul>
                                    </div>
                            )}
                        </article>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default ProductList;
